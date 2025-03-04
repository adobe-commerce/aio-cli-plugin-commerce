import { promises as fsPromise } from 'fs'
import path from 'path'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'

import { runCommand } from './runCommand.js'
import { promptConfirm } from './prompt.js'
import CONSTANTS from './constants.js'

const aioLogger = Logger('commerce:mesh.js')
const meshConfigFilePath = path.join('./', 'mesh_config.json')
const { REMOTE_ACCS_MESH_CONFIG } = CONSTANTS

/**
 *
 * @param core
 */
async function getCSaaSMeshConfig (core) {
  try {
    aioLogger.debug('Fetching remote mesh config file...')
    const now = new Date().toISOString()
    const res = await fetch(`${REMOTE_ACCS_MESH_CONFIG}?cache-bust=${now}`) // using cache-bust query param with timestamp to avoid getting cached response from gist
    const remoteMeshConfig = await res.json()
    remoteMeshConfig.meshConfig.sources[0].handler.graphql.endpoint = core

    return JSON.stringify(remoteMeshConfig, null, 2)
  } catch (err) {
    aioLogger.debug(err)
    aioLogger.error('Failed to fetch remote mesh config file, using local file instead.')

    return `
    {
        "meshConfig": {
            "responseConfig": {
                "CORS": {
                    "credentials": true,
                    "exposedHeaders": ["Content-Range", "X-Content-Range"],
                    "maxAge": 60480,
                    "methods": ["GET", "POST"],
                    "origin": "*"
                },
                "headers": {
                    "mode": "no-cors",
                    "x-include-metadata": "true"
                },
                "includeHTTPDetails": false,
                "cache": true
            },
            "sources": [
                {
                    "name": "CommerceSaaSGraphQl",
                    "handler": {
                        "graphql": {
                            "endpoint": "${core}",
                            "useGETForQueries": true,
                            "operationHeaders": {
                                "Content-Type": "application/json",
                                "Magento-Environment-Id": "{context.headers['magento-environment-id']}",
                                "Magento-Website-Code": "{context.headers['magento-website-code']}",
                                "Magento-Store-View-Code": "{context.headers['magento-store-view-code']}",
                                "Magento-Store-Code": "{context.headers['magento-store-code']}",
                                "Magento-Customer-Group": "{context.headers['magento-customer-group']}",
                                "x-api-key": "{context.headers['x-api-key']}",
                                "Authorization": "{context.headers['Authorization']}"
                            }
                        }
                    },
                    "responseConfig": {
                        "headers": ["X-Magento-Cache-Id"]
                    }
                }
            ]
        }
    }
    `
  }
}

/**
 *
 * @param core
 * @param catalog
 * @param apiKey
 */
function getPaaSMeshConfig (core, catalog, apiKey) {
  return `
    {
        "meshConfig": {
            "responseConfig": {
                "CORS": {
                    "credentials": true,
                    "exposedHeaders": ["Content-Range", "X-Content-Range"],
                    "maxAge": 60480,
                    "methods": ["GET", "POST"],
                    "origin": "*"
                },
                "headers": {
                    "mode": "no-cors",
                    "x-include-metadata": "true"
                },
                "includeHTTPDetails": false,
                "cache": true
            },
            "sources": [{
                "name": "CommerceGraphQl",
                "handler": {
                    "graphql": {
                        "endpoint": "${core}",
                        "useGETForQueries": true,
                        "operationHeaders": {
                            "Content-Type": "application/json",
                            "Store": "{context.headers['store']}",
                            "Authorization": "{context.headers['Authorization']}"
                        }
                    }
                },
                "transforms": [{
                    "filterSchema": {
                        "mode": "bare",
                        "filters": [
                            "Query.!category",
                            "Query.!customerOrders",
                            "Query.!products",
                            "Query.!categories",
                            "Query.!urlResolver",
                            "Query.!wishlist",
                            "Query.!categoryList",
                            "Mutation.!setPaymentMethodAndPlaceOrder",
                            "Mutation.!addBundleProductsToCart",
                            "Mutation.!addConfigurableProductsToCart",
                            "Mutation.!addDownloadableProductsToCart",
                            "Mutation.!addSimpleProductsToCart",
                            "Mutation.!addVirtualProductsToCart",
                            "Mutation.!createCustomer",
                            "Mutation.!updateCustomer"
                        ]
                    }
                }],
                "responseConfig": {
                "headers": ["X-Magento-Cache-Id"]
                }
            },
            {
                "name": "CatalogServiceGraphql",
                "handler": {
                    "graphql": {
                        "endpoint": "${catalog}",
                        "useGETForQueries": true,
                        "schemaHeaders": {
                            "Content-Type": "application/json",
                            "x-api-key": "${apiKey}"
                        },
                        "operationHeaders": {
                            "Content-Type": "application/json",
                            "Magento-Environment-Id": "{context.headers['magento-environment-id']}",
                            "Magento-Website-Code": "{context.headers['magento-website-code']}",
                            "Magento-Store-View-Code": "{context.headers['magento-store-view-code']}",
                            "Magento-Store-Code": "{context.headers['magento-store-code']}",
                            "Magento-Customer-Group": "{context.headers['magento-customer-group']}",
                            "x-api-key": "{context.headers['x-api-key']}",
                            "Authorization": "context.headers['Authorization']"
                        }
                    }
                }
            }]
        }
    }
    `
}

/**
 *
 * @param saas
 * @param core
 * @param catalog
 * @param apiKey
 */
async function createTempMeshConfigFile (
  saas,
  core,
  catalog,
  apiKey
) {
  let meshConfigFile

  // If user chose SaaS (initialization.js) they will only have commerce.datasource.saas
  if (core && catalog) {
    aioLogger.debug('creating Mesh for PaaS/CatalogServices')
    meshConfigFile = getPaaSMeshConfig(core, catalog, apiKey)
  } else {
    aioLogger.debug('creating Mesh for SaaS')
    meshConfigFile = await getCSaaSMeshConfig(saas)
  }

  await fsPromise.writeFile(meshConfigFilePath, meshConfigFile)
}

/**
 *
 */
export async function confirmAPIMeshCreation () {
  return await promptConfirm(
    'Do you want to create an API Mesh for your Commerce instance?'
  )
}

/**
 *
 * @param installedPlugins
 */
async function checkAndInstallMeshPlugin (installedPlugins) {
  aioLogger.debug('Checking for API Mesh plugin...\n\n', installedPlugins)

  const meshPlugin = installedPlugins.get('@adobe/aio-cli-plugin-api-mesh')

  if (!meshPlugin) {
    console.log('Installing API Mesh plugin...')

    await runCommand(
      'aio plugins:install @adobe/aio-cli-plugin-api-mesh'
    )
  }
}

/**
 *
 * @param runAIOCommand
 * @param installedPlugins
 */
export async function createMesh (runAIOCommand, installedPlugins) {
  try {
    await checkAndInstallMeshPlugin(installedPlugins)

    const { apiKey, datasource } = config.get('commerce')
    const { saas, paas, catalog } = datasource

    console.log('Creating API Mesh...')

    await createTempMeshConfigFile(saas, paas, catalog, apiKey)

    const { meshUrl } = await runAIOCommand('api-mesh:create', [
      meshConfigFilePath,
      '-c'
    ])

    config.set('commerce.datasource.meshUrl', meshUrl)
  } catch (error) {
    aioLogger.error(error)
    console.log(
      'API Mesh creation failed, please retry by running \naio api-mesh update mesh_config.json'
    )

    throw new Error(
      'API Mesh creation failed, please retry by running aio api-mesh update mesh_config.json'
    )
  }
}

/**
 *
 */
export function getMeshDetailsPage () {
  try {
    const devConsoleEnv = config.get('cli.env')
    const { org, project, workspace } = config.get('console')
    const orgID = org.id
    const projectID = project.id
    const workspaceID = workspace.id

    if (devConsoleEnv === 'stage') {
      return `https://developer-stage.adobe.com/console/projects/${orgID}/${projectID}/workspaces/${workspaceID}/details`
    } else {
      return `https://developer.adobe.com/console/projects/${orgID}/${projectID}/workspaces/${workspaceID}/details`
    }
  } catch (err) {
    aioLogger.debug(err)

    return null
  }
}
