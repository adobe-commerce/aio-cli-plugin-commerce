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

/**
 * Detects the package manager by checking for lock files in the target directory.
 * Returns 'yarn' if only yarn.lock exists, 'npm' if only package-lock.json exists,
 * or null if neither or both are present (ambiguous).
 *
 * @param {string} targetDir - The project root directory
 * @returns {{ manager: string|null, reason: string|null }}
 */
export function detectPackageManager (targetDir) {
  const hasYarnLock = fs.existsSync(path.join(targetDir, 'yarn.lock'))
  const hasPackageLock = fs.existsSync(path.join(targetDir, 'package-lock.json'))

  if (hasYarnLock && !hasPackageLock) {
    return { manager: 'yarn', reason: 'yarn.lock found' }
  }
  if (hasPackageLock && !hasYarnLock) {
    return { manager: 'npm', reason: 'package-lock.json found' }
  }
  return { manager: null, reason: null }
}
