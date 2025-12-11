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

import fs from 'fs/promises';
import path from 'path';

/**
 * Export chat messages to a Markdown file
 * @param {Array} messages - Chat messages to export
 * @param {string} duration - Session duration string
 * @returns {Promise<string>} Path to the exported file
 */
export async function exportToMarkdown(messages, duration) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `commerce-docs-chat-${timestamp}.md`;
  const filePath = path.join(process.cwd(), filename);
  let content = `# Adobe Commerce Docs Chat Export\n\n`;
  content += `**Exported:** ${new Date().toLocaleString()}\n`;
  content += `**Session Duration:** ${duration}\n`;
  content += `**Messages:** ${messages.filter(m => m.role !== 'system').length}\n\n`;
  content += `---\n\n`;
  for (const msg of messages) {
    if (msg.role === 'system') continue;
    if (msg.role === 'user') {
      content += `## 👤 You\n`;
      if (msg.timestamp) content += `*${msg.timestamp}*\n\n`;
      content += `${msg.content}\n\n`;
    } else {
      content += `## 🤖 Adobe Commerce Docs\n`;
      if (msg.timestamp) content += `*${msg.timestamp}*\n\n`;
      content += `${msg.content}\n\n`;
    }
    content += `---\n\n`;
  }
  await fs.writeFile(filePath, content, 'utf-8');
  return filePath;
}

/**
 * Export chat data to a JSON file
 * @param {object} data - Data to export (messages, stats, history, etc.)
 * @returns {Promise<string>} Path to the exported file
 */
export async function exportToJson(data) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `commerce-docs-chat-${timestamp}.json`;
  const filePath = path.join(process.cwd(), filename);
  const exportData = {
    exportedAt: new Date().toISOString(),
    sessionDuration: data.duration,
    stats: {
      messagesSent: data.stats.messagesSent,
      responsesReceived: data.stats.responsesReceived,
      totalTokensUsed: data.stats.totalTokensUsed,
      compactionCount: data.compactionCount
    },
    messages: data.messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp || null
    })),
    commandHistory: data.commandHistory
  };
  await fs.writeFile(filePath, JSON.stringify(exportData, null, 2), 'utf-8');
  return filePath;
}