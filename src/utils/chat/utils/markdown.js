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

import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'
import chalk from 'chalk'

// Force chalk to use colors (overrides NO_COLOR env var)
chalk.level = 3

// Default terminal renderer options
let terminalOptions = {
  reflowText: true,
  width: 80,
  tab: 2
}

// Configure marked with terminal renderer
marked.use(markedTerminal(terminalOptions))

/**
 * Update markdown renderer options (e.g., for terminal width)
 * @param {object} options - Options to pass to markedTerminal
 */
export function updateMarkdownOptions (options) {
  terminalOptions = { ...terminalOptions, ...options }
  marked.use(markedTerminal(terminalOptions))
}

/**
 * Render markdown to terminal-formatted text
 * @param {string} text - Markdown text to render
 * @returns {string} Terminal-formatted text
 */
export function renderMarkdown (text) {
  try {
    const rendered = marked.parse(text)
    // Remove trailing newlines but preserve internal formatting
    return rendered.replace(/\n+$/, '')
  } catch {
    return text
  }
}
