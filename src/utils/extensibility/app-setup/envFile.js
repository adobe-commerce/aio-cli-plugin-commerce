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
 * Parses an .env file into a key-value object.
 * Preserves only lines that match KEY=value. Comments and blank lines are ignored.
 *
 * @param {string} filePath - Path to the .env file
 * @returns {Record<string, string>} Key-value pairs
 */
export function readEnvFile (filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Env file not found: ${filePath}`)
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const result = {}
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(ENV_LINE_PATTERN)
    if (match) {
      result[match[1]] = match[2]
    }
  }
  return result
}

/**
 * Writes a key-value object to an .env file.
 * Each key is written as KEY=value on its own line.
 *
 * @param {string} filePath - Path to write to
 * @param {Record<string, string>} data - Key-value pairs
 */
export function writeEnvFile (filePath, data) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const lines = Object.entries(data).map(([k, v]) => `${k}=${v}`)
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf-8')
  aioLogger.debug('Wrote env file', filePath)
}

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
  const eol = content.includes('\r\n') ? '\r\n' : '\n'
  const lines = content.split(/\r?\n/)
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
  let output = updated.join(eol)
  if (missingKeys.length > 0) {
    const append = missingKeys.map((k) => `${k}=${updates[k]}`).join(eol)
    output = output.trimEnd() ? output + eol + append + eol : append + eol
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
