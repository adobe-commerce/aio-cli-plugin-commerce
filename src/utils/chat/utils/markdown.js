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

import { Marked } from 'marked'
import { markedTerminal } from 'marked-terminal'

// Configure marked with terminal renderer
const marked = new Marked(markedTerminal({
  reflowText: true,
  width: 80,
  tab: 2
}))

/**
 * Update markdown renderer options (e.g., for terminal width)
 * @param {object} options - Options to pass to markedTerminal
 */
export function updateMarkdownOptions (options) {
  marked.setOptions(markedTerminal({
    reflowText: true,
    tab: 2,
    ...options
  }))
}

/**
 * Render markdown to terminal-formatted text
 * @param {string} text - Markdown text to render
 * @returns {string} Terminal-formatted text
 */
export function renderMarkdown (text) {
  try {
    return marked.parse(text).trim()
  } catch {
    return text
  }
}

