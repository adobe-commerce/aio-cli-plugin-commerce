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
import { Box, Text } from 'ink'
import { renderMarkdown } from '../utils/index.js'

export function Message ({ role, content, timestamp }) {
  const isUser = role === 'user'
  const isSystem = role === 'system'

  if (isSystem) {
    return (
      <Box marginY={1} paddingX={2}>
        <Text color="yellow" italic>{content}</Text>
      </Box>
    )
  }

  if (isUser) {
    return (
      <Box
        flexDirection="row"
        justifyContent="flex-end"
        marginY={1}
        paddingX={1}
      >
        <Box
          flexDirection="column"
          alignItems="flex-end"
        >
          <Box marginBottom={1} justifyContent="flex-end">
            <Text color="cyan" bold>You</Text>
            {timestamp && <Text color="gray" dimColor> • {timestamp}</Text>}
          </Box>
          <Box
            borderStyle="round"
            borderColor="cyan"
            paddingX={2}
            paddingY={1}
            justifyContent="flex-end"
          >
            <Text align="right">{content}</Text>
          </Box>
        </Box>
      </Box>
    )
  }

  // Assistant message with markdown rendering
  const renderedContent = renderMarkdown(content)

  return (
    <Box
      flexDirection="row"
      justifyContent="flex-start"
      marginY={1}
      paddingX={1}
    >
      <Box
        flexDirection="column"
        alignItems="flex-start"
        flexBasis="90%"
      >
        <Box marginBottom={1}>
          <Text color="magenta" bold>Adobe Commerce Docs</Text>
          {timestamp && <Text color="gray" dimColor> • {timestamp}</Text>}
        </Box>
        <Box
          borderStyle="round"
          borderColor="magenta"
          paddingX={2}
          paddingY={1}
        >
          <Text>{renderedContent}</Text>
        </Box>
      </Box>
    </Box>
  )
}

