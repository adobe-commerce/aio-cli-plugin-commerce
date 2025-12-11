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

import React from 'react'
import { Box, Text, useInput } from 'ink'
import { SLASH_COMMANDS, MAX_CONTEXT_TOKENS } from '../constants/index.js'

export function StatsDisplay ({ stats, onDismiss }) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss()
    }
  })

  const usageColor = stats.contextUsagePercent >= 90 ? 'red' : stats.contextUsagePercent >= 70 ? 'yellow' : 'green'

  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor="cyan"
      padding={1}
      marginY={1}
    >
      <Text color="cyan" bold>📊 Session Statistics</Text>
      <Box marginTop={1} flexDirection="column">
        <Text>Messages sent: <Text color="green" bold>{stats.messagesSent}</Text></Text>
        <Text>Responses received: <Text color="green" bold>{stats.responsesReceived}</Text></Text>
        <Text>Session duration: <Text color="green" bold>{stats.duration}</Text></Text>
        <Text>Total tokens used: <Text color="green" bold>{stats.totalTokensUsed}</Text></Text>
        <Text>Commands in history: <Text color="green" bold>{stats.historyCount}</Text></Text>
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text color="cyan" bold>📦 Context Window</Text>
        <Text>Current tokens: <Text color={usageColor} bold>{stats.contextTokens}/{MAX_CONTEXT_TOKENS}</Text> (<Text color={usageColor}>{stats.contextUsagePercent}%</Text>)</Text>
        <Text>Messages in context: <Text color="green" bold>{stats.contextMessageCount}</Text></Text>
        <Text>Times compacted: <Text color="green" bold>{stats.compactionCount}</Text></Text>
        {stats.hasSummary && <Text>Has summary: <Text color="yellow" bold>Yes</Text></Text>}
      </Box>
      <Box marginTop={1}>
        <Text color="gray" italic>Press Enter to dismiss</Text>
      </Box>
    </Box>
  )
}

export function HistoryDisplay ({ history, onDismiss }) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss()
    }
  })

  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor="blue"
      padding={1}
      marginY={1}
    >
      <Text color="blue" bold>📜 Command History</Text>
      <Box marginTop={1} flexDirection="column">
        {history.length === 0 ? (
          <Text color="gray" italic>No commands in history yet.</Text>
        ) : (
          history.slice(-15).map((cmd, i) => (
            <Box key={i}>
              <Text color="gray">{(history.length - 15 + i + 1).toString().padStart(3)}. </Text>
              <Text color="cyan">{cmd.length > 60 ? cmd.substring(0, 57) + '...' : cmd}</Text>
            </Box>
          ))
        )}
      </Box>
      <Box marginTop={1}>
        <Text color="gray" italic>Press Enter to dismiss • Use ↑/↓ in input to navigate</Text>
      </Box>
    </Box>
  )
}

export function ExportSuccess ({ filePath, onDismiss }) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss()
    }
  })

  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor="green"
      padding={1}
      marginY={1}
    >
      <Text color="green" bold>✅ Export Successful</Text>
      <Box marginTop={1} flexDirection="column">
        <Text>Chat exported to:</Text>
        <Text color="cyan" bold>{filePath}</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="gray" italic>Press Enter to dismiss</Text>
      </Box>
    </Box>
  )
}

export function HelpDisplay ({ onDismiss }) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss()
    }
  })

  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor="yellow"
      padding={1}
      marginY={1}
    >
      <Text color="yellow" bold>📚 Available Commands</Text>
      <Box marginTop={1} flexDirection="column">
        {Object.entries(SLASH_COMMANDS).map(([cmd, { description }]) => (
          <Box key={cmd}>
            <Text color="cyan" bold>{cmd.padEnd(15)}</Text>
            <Text>{description}</Text>
          </Box>
        ))}
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text color="gray" bold>Keyboard Shortcuts:</Text>
        <Text color="gray">  ↑ / ↓      Navigate command history</Text>
        <Text color="gray">  Ctrl+C     Exit the application</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="gray" italic>Press Enter to dismiss</Text>
      </Box>
    </Box>
  )
}

