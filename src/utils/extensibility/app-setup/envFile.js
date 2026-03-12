/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import fs from 'fs'
import path from 'path'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:envFile.js')

/** Matches KEY=value or KEY= (empty value). Captures key and optional value. */
const ENV_LINE_PATTERN = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/

/**
 * Updates specific keys in an existing .env file.
 * Preserves comments, blank lines, key order, and keys not in updates.
 * Keys not present in the file are appended at the end.
 *
 * @param {string} filePath - Path to the .env file
 * @param {Record<string, string>} updates - Key-value pairs to set or update
 */
export function updateEnvValues (filePath, updates) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Env file not found: ${filePath}`)
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const updatedKeys = new Set()

  const updated = lines.map((line) => {
    const match = line.match(ENV_LINE_PATTERN)
    if (match && Object.prototype.hasOwnProperty.call(updates, match[1])) {
      updatedKeys.add(match[1])
      return `${match[1]}=${updates[match[1]]}`
    }
    return line
  })

  const missingKeys = Object.keys(updates).filter((k) => !updatedKeys.has(k))
  let output = updated.join('\n')
  if (missingKeys.length > 0) {
    const append = missingKeys.map((k) => `${k}=${updates[k]}`).join('\n')
    output = output.trimEnd() ? output + '\n' + append + '\n' : append + '\n'
  }
  fs.writeFileSync(filePath, output, 'utf-8')
  aioLogger.debug('Updated env values', Object.keys(updates))
}

/**
 * Copies a source file to a destination using fs (OS-agnostic).
 *
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @throws {Error} When source file does not exist
 */
export function copyEnvFile (sourcePath, destPath) {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`)
  }
  const dir = path.dirname(destPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.copyFileSync(sourcePath, destPath)
  aioLogger.debug('Copied env file', sourcePath, '->', destPath)
}
