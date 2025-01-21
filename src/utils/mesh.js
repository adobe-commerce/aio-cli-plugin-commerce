import { promises as fsPromise } from "fs";
import path from "path";
import config from "@adobe/aio-lib-core-config";

import { promptConfirm } from "./prompt.js";

const meshConfigFilePath = path.join("./", "mesh_config.json");

function getCSaaSMeshConfig(core, githubOrg, githubRepo) {
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
    `;
}

function getPSaaSMeshConfig(core, catalog, githubOrg, githubRepo) {
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
                "name": "CommerceGraphQl",
                "handler": {
                "graphql": {
                    "endpoint": "${core}",
                    "useGETForQueries": true,
                    "operationHeaders": {
                    "Content-Type": "application/json",
                    "Store": "{context.headers['store']}",
                    "Authorization": "context.headers['Authorization']"
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
                    "x-api-key": "4dfa19c9fe6f4cccade55cc5b3da94f7"
                    },
                    "operationHeaders": {
                    "Content-Type": "application/json",
                    "Magento-Environment-Id": "{context.headers['magento-environment-id']}",
                    "Magento-Website-Code": "{context.headers['magento-website-code']}",
                    "Magento-Store-View-Code": "{context.headers['magento-store-view-code']}",
                    "Magento-Store-Code": "{context.headers['magento-store-code']}",
                    "Magento-Customer-Group": "{context.headers['magento-customer-group']}",
                    "x-api-key": "{context.headers['x-api-key']}",
                    "Authorization": "context.headers['authorization']"
                    }
                }
                }
            }
            ]
        }
        }
    `;
}

async function createTempMeshConfigFile(core, catalog, githubOrg, githubRepo) {
    let meshConfigFile;

    if (core && catalog) {
        meshConfigFile = getPSaaSMeshConfig(
            core,
            catalog,
            githubOrg,
            githubRepo
        );
    } else {
        meshConfigFile = getCSaaSMeshConfig(core, githubOrg, githubRepo);
    }

    await fsPromise.writeFile(meshConfigFilePath, meshConfigFile);
}

async function deleteTempMeshConfigFile() {
    await fsPromise.unlink(meshConfigFilePath);
}

async function confirmAPIMeshCreation() {
    return await promptConfirm(
        "Do you want to create an API Mesh for your Commerce instance?"
    );
}

export async function createMesh(runAIOCommand) {
    const shouldCreateMesh = await confirmAPIMeshCreation();

    if (!shouldCreateMesh) {
        return;
    }

    console.log("Creating API Mesh...");

    const { core, catalog } = config.get("commerce.datasource");
    const { org: githubOrg, repo: githubRepo } = config.get("commerce.github");

    if (!core) {
        throw new Error("❌ Please provide core commerce datasource URLs.");
    }

    await createTempMeshConfigFile(core, catalog, githubOrg, githubRepo);

    const { meshUrl } = await runAIOCommand("api-mesh:create", [
        meshConfigFilePath,
        "-c",
    ]);
    config.set("commerce.datasource.meshUrl", meshUrl);

    await deleteTempMeshConfigFile();
}
