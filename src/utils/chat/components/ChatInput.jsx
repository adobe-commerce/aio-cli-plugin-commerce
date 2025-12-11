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

import React, { useState, useEffect, useCallback } from 'react'
import { Box, Text, useInput } from 'ink'
import TextInput from 'ink-text-input'
import { SLASH_COMMANDS } from '../constants/index.js'

export function ChatInput ({ onSubmit, disabled, commandHistory, historyIndex, onHistoryNavigate, onValueChange, externalValue }) {
  const [value, setValue] = useState('')
  const [showCommands, setShowCommands] = useState(false)

  // Sync with external value (for history navigation)
  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue)
      setShowCommands(externalValue.startsWith('/'))
    }
  }, [externalValue])

  const handleChange = useCallback((newValue) => {
    setValue(newValue)
    setShowCommands(newValue.startsWith('/'))
    if (onValueChange) {
      onValueChange(newValue)
    }
  }, [onValueChange])

  const handleSubmit = useCallback((submittedValue) => {
    if (submittedValue.trim()) {
      onSubmit(submittedValue.trim())
      setValue('')
      setShowCommands(false)
    }
  }, [onSubmit])

  // Handle up/down arrow keys for history
  useInput((input, key) => {
    if (disabled) return

    if (key.upArrow && commandHistory.length > 0) {
      onHistoryNavigate('up')
    } else if (key.downArrow) {
      onHistoryNavigate('down')
    }
  })

  const matchingCommands = showCommands
    ? Object.entries(SLASH_COMMANDS).filter(([cmd]) =>
      cmd.startsWith(value.toLowerCase())
    )
    : []

  return (
    <Box flexDirection="column" width="100%">
      {showCommands && matchingCommands.length > 0 && (
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor="gray"
          paddingX={1}
          marginBottom={1}
        >
          {matchingCommands.map(([cmd, { description }]) => (
            <Box key={cmd}>
              <Text color="yellow" bold>{cmd}</Text>
              <Text color="gray"> - {description}</Text>
            </Box>
          ))}
        </Box>
      )}
      <Box borderStyle="round" borderColor={disabled ? 'gray' : 'green'} paddingX={2} width="100%">
        <Text color="green" bold>❯ </Text>
        <TextInput
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
          placeholder={disabled ? 'Waiting for response...' : 'Ask a question or type / for commands'}
        />
      </Box>
      {commandHistory.length > 0 && historyIndex >= 0 && (
        <Box marginTop={1} paddingLeft={2}>
          <Text color="gray" dimColor>History: {historyIndex + 1}/{commandHistory.length}</Text>
        </Box>
      )}
    </Box>
  )
}

