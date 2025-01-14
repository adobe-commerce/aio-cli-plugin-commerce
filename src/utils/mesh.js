import { promises as fsPromise } from "fs";
import path from "path";
import config from "@adobe/aio-lib-core-config";

const meshConfigFilePath = path.join("./", "mesh_config.json");

async function createTempMeshConfigFile(core, githubOrg, githubRepo) {
    const meshConfigFile = `
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
                    "https://main--${githubRepo}--${githubOrg}.aem.page"
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

    await fsPromise.writeFile(meshConfigFilePath, meshConfigFile);
}

async function deleteTempMeshConfigFile() {
    await fsPromise.unlink(meshConfigFilePath);
}

export async function createMesh(runAIOCommand) {
    console.log("Creating API Mesh...");

    const { core, catalog } = config.get("commerce.datasource");
    const { org: githubOrg, repo: githubRepo } = config.get("commerce.github");

    if (!core && !catalog) {
        throw new Error(
            "❌ Please provide one of core or catalog datasource URLs."
        );
    }

    await createTempMeshConfigFile(core, githubOrg, githubRepo);

    const { meshUrl } = await runAIOCommand("api-mesh:create", [
        meshConfigFilePath,
    ]);
    config.set("commerce.datasource.meshUrl", meshUrl);

    await deleteTempMeshConfigFile();
}
