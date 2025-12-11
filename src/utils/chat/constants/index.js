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

// API endpoints
export const API_URL = 'https://extensibility-docs.apimesh-adobe-test.workers.dev/ai-search';
export const COMPACT_API_URL = 'https://extensibility-docs.apimesh-adobe-test.workers.dev/compact';

// Context window configuration
export const MAX_CONTEXT_TOKENS = 5000;
export const AUTO_COMPACT_THRESHOLD = 0.9; // Compact at 90% of max tokens

// ASCII Art Logos
export const ADOBE_LOGO = `
   █████╗ ██████╗  ██████╗ ██████╗ ███████╗
  ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔════╝
  ███████║██║  ██║██║   ██║██████╔╝█████╗
  ██╔══██║██║  ██║██║   ██║██╔══██╗██╔══╝
  ██║  ██║██████╔╝╚██████╔╝██████╔╝███████╗
  ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝
`;
export const COMMERCE_TEXT = `
   ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗██████╗  ██████╗███████╗
  ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗██╔════╝██╔════╝
  ██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██████╔╝██║     █████╗
  ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██╔══██╗██║     ██╔══╝
  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║  ██║╚██████╗███████╗
   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝
`;

// Slash commands configuration
export const SLASH_COMMANDS = {
  '/clear': {
    description: 'Clear chat history and context',
    action: 'clear'
  },
  '/compact': {
    description: 'Summarize conversation context to save tokens',
    action: 'compact'
  },
  '/stats': {
    description: 'Show session and context statistics',
    action: 'stats'
  },
  '/export': {
    description: 'Export chat to markdown file',
    action: 'export'
  },
  '/export json': {
    description: 'Export chat to JSON file',
    action: 'export-json'
  },
  '/history': {
    description: 'Show command history',
    action: 'history'
  },
  '/help': {
    description: 'Show available commands',
    action: 'help'
  },
  '/exit': {
    description: 'Exit the chat',
    action: 'exit'
  }
};