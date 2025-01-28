import { promises as fsPromise } from 'fs'
import path from 'path'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'

import { runCommand } from './runCommand.js'
import { promptConfirm } from './prompt.js'

const aioLogger = Logger('commerce:mesh.js')
const meshConfigFilePath = path.join('./', 'mesh_config.json')

const MESH_RETRIES = 2
const MESH_RETRY_INTERVAL = 60000

/**
 *
 * @param core
 * @param githubOrg
 * @param githubRepo
 */
function getCSaaSMeshConfig (core, githubOrg, githubRepo) {
  return `
    {
        "meshConfig": {
            "responseConfig": {
            "CORS": {
                "credentials": true,
                "exposedHeaders": ["Content-Range", "X-Content-Range"],
                "maxAge": 60480,
                "methods": ["GET", "POST"],
                "origin": [
                "http://localhost:3000",
                "https://main--${githubRepo}--${githubOrg}.aem.page",
                "https://main--${githubRepo}--${githubOrg}.aem.live"
                ]
            },
            "headers": {
                "mode": "no-cors",
                "x-include-metadata": "true",
                "Cache-Control": "max-age=900, s-max-age=1800, stale-while-revalidate=30, stale-if-error=86400"
            },
            "includeHTTPDetails": false
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
                        "Authorization": "context.headers['Authorization']"
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

/**
 *
 * @param core
 * @param catalog
 * @param githubOrg
 * @param githubRepo
 * @param apiKey
 * @param environmentId
 */
function getPaaSMeshConfig (
  core,
  catalog,
  githubOrg,
  githubRepo,
  apiKey,
  environmentId
) {
  return `
    {
        "meshConfig": {
            "responseConfig": {
            "CORS": {
                "credentials": true,
                "exposedHeaders": ["Content-Range', 'X-Content-Range"],
                "maxAge": 60480,
                "methods": ["GET', 'POST"],
                "origin": [
                "http://localhost:3000",
                "https://main--${githubRepo}--${githubOrg}.aem.page",
                "https://main--${githubRepo}--${githubOrg}.aem.live"
                ]
            },
            "headers": {
                "mode": "no-cors",
                "x-include-metadata": "true",
                "Cache-Control": "max-age=900, s-max-age=1800, stale-while-revalidate=30, stale-if-error=86400"
            },
            "includeHTTPDetails": false
            },
            "sources": [
            {
                "name": "CommerceGraphQl",
                "handler": {
                "graphql": {
                    "endpoint": "${core}",
                    "useGETForQueries": true,
                    "operationHeaders": {
                    "Content-Type": "application/json",
                    "Store": "{context.headers[\"store\"]}",
                    "Authorization": "context.headers[\"Authorization\"]"
                    }
                }
                },
                "transforms": [
                {
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
                }
                ],
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
                        "x-api-key": "${apiKey}",
                    },
                    "operationHeaders": {
                        "Content-Type": "application/json",
                        "Magento-Environment-Id": "${environmentId}",
                        "Magento-Website-Code": "{context.headers['magento-website-code']}",
                        "Magento-Store-View-Code": "{context.headers['magento-store-view-code']}",
                        "Magento-Store-Code": "{context.headers['magento-store-code']}",
                        "Magento-Customer-Group": "{context.headers['magento-customer-group']}",
                        "x-api-key": "${apiKey}",
                        "Authorization": "context.headers['Authorization']"
                    }
                }
                }
            }
            ]
        }
        }
    `
}

/**
 *
 * @param saas
 * @param core
 * @param catalog
 * @param githubOrg
 * @param githubRepo
 * @param apiKey
 * @param environmentId
 */
async function createTempMeshConfigFile (
  saas,
  core,
  catalog,
  githubOrg,
  githubRepo,
  apiKey,
  environmentId
) {
  let meshConfigFile

  // If user chose SaaS (initialization.js) they will only have commerce.datasource.saas
  if (core && catalog) {
    aioLogger.debug('creating Mesh for PaaS/CatalogServices')
    meshConfigFile = getPaaSMeshConfig(
      core,
      catalog,
      githubOrg,
      githubRepo,
      apiKey,
      environmentId
    )
  } else {
    aioLogger.debug('creating Mesh for SaaS')
    meshConfigFile = getCSaaSMeshConfig(saas, githubOrg, githubRepo)
  }

  await fsPromise.writeFile(meshConfigFilePath, meshConfigFile)
}

/**
 *
 */
async function deleteTempMeshConfigFile () {
  await fsPromise.unlink(meshConfigFilePath)
}

/**
 *
 */
async function confirmAPIMeshCreation () {
  return await promptConfirm(
    'Do you want to create an API Mesh for your Commerce instance?'
  )
}

/**
 *
 * @param runAIOCommand
 */
async function updateMesh (runAIOCommand) {
  aioLogger.debug('Updating API Mesh...')
  await runAIOCommand('api-mesh:update', [meshConfigFilePath, '-c'])
  aioLogger.debug('API Mesh updated')
}

/**
 *
 * @param runAIOCommand
 */
async function getMeshStatus (runAIOCommand) {
  aioLogger.debug('Checking API Mesh status...')
  const { meshStatus } = await runAIOCommand('api-mesh:status', [])
  aioLogger.debug('API Mesh status: ', meshStatus)

  return meshStatus
}

/**
 * Function to check the status of the mesh creation and retry if it fails
 *
 * @param {*} runAIOCommand
 */
async function checkAndRetryMeshUpdate (runAIOCommand) {
  let meshStatus = await getMeshStatus(runAIOCommand)
  let count = 0

  /**
   *
   * Wait 1 minute and if meshStatus is not success, run an update.
   * Repeat this process for MESH_RETRIES times and then throw an error if meshStatus is still not success
   *
   */
  while (meshStatus !== 'success' && count < MESH_RETRIES) {
    aioLogger.debug(
            `Mesh creation failed. Retrying... Attempt ${
                count + 1
            }/${MESH_RETRIES}`
    )
    console.log('Retrying API Mesh creation...')
    await updateMesh(runAIOCommand)
    await new Promise((resolve) =>
      setTimeout(resolve, MESH_RETRY_INTERVAL)
    )

    meshStatus = await getMeshStatus(runAIOCommand)

    count++
  }

  if (meshStatus !== 'success') {
    throw new Error('API Mesh creation failed')
  }
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
      'aio plugins:install @adobe/aio-cli-plugin-api-mesh@4.1.0-beta.3' // will remove the beta version tag once the latest version is published with the necessary changes
    )
  }
}

/**
 *
 * @param runAIOCommand
 * @param installedPlugins
 */
export async function createMesh (runAIOCommand, installedPlugins) {
  const shouldCreateMesh = await confirmAPIMeshCreation()

  if (!shouldCreateMesh) {
    aioLogger.debug('Not creating API Mesh - will use default environment')
    return
  }

  await checkAndInstallMeshPlugin(installedPlugins)

  const { apiKey, environmentId, datasource, github } =
        config.get('commerce')
  const { saas, paas, catalog } = datasource
  const { org: githubOrg, repo: githubRepo } = github

  if (paas || saas) {
    const shouldCreateMesh = await confirmAPIMeshCreation()

    if (!shouldCreateMesh) {
      aioLogger.debug('Not creating API Mesh - will use default environment')
      return
    }

    await checkAndInstallMeshPlugin(installedPlugins)

    console.log('Creating API Mesh...')
    await createTempMeshConfigFile(
      saas,
      paas,
      catalog,
      githubOrg,
      githubRepo,
      apiKey,
      environmentId
    )

    const { meshUrl } = await runAIOCommand('api-mesh:create', [
      meshConfigFilePath,
      '-c'
    ])

    await new Promise((resolve) =>
      setTimeout(resolve, MESH_RETRY_INTERVAL)
    )
    await checkAndRetryMeshUpdate(runAIOCommand)

    config.set('commerce.datasource.meshUrl', meshUrl)

    await deleteTempMeshConfigFile()
  } else {
    // this means the user chose to use demo env, so no need to create mesh
    console.log('Not creating API Mesh - will use default environment')
  }
}
