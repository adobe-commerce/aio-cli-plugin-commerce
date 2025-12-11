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

import { useState, useCallback } from 'react'
import { API_URL } from '../constants/index.js'
import { estimateTokens, formatTimestamp } from '../utils/index.js'

/**
 * Custom hook for handling streaming responses from the API
 * @param {object} options - Configuration options
 * @param {Function} options.buildHistory - Function to build conversation history
 * @param {Function} options.checkAutoCompaction - Function to check and perform auto-compaction
 * @param {Function} options.addMessage - Function to add a message to display
 * @param {Function} options.addToContext - Function to add a message to context window
 * @param {Function} options.updateStats - Function to update stats
 * @returns {object} Streaming state and handler
 */
export function useStreamResponse ({ buildHistory, checkAutoCompaction, addMessage, addToContext, updateStats }) {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamContent, setStreamContent] = useState('')

  const streamResponse = useCallback(async (query) => {
    setIsStreaming(true)
    setStreamContent('')

    try {
      // Check if auto-compaction is needed before making the request
      await checkAutoCompaction()

      // Build conversation history for context
      const history = buildHistory()

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          stream: true,
          history
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.response) {
                fullContent += data.response
                setStreamContent(fullContent)
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      // Process remaining buffer
      if (buffer.startsWith('data: ')) {
        try {
          const data = JSON.parse(buffer.slice(6))
          if (data.response) {
            fullContent += data.response
          }
        } catch {
          // Skip
        }
      }

      const assistantMessage = {
        role: 'assistant',
        content: fullContent,
        timestamp: formatTimestamp(new Date())
      }

      // Add to display messages
      addMessage(assistantMessage)

      // Add to context window
      addToContext({ role: 'assistant', content: fullContent })

      const responseTokens = estimateTokens(fullContent)
      updateStats(prev => ({
        ...prev,
        responsesReceived: prev.responsesReceived + 1,
        totalTokensUsed: prev.totalTokensUsed + responseTokens
      }))
    } catch (error) {
      addMessage({
        role: 'system',
        content: `Error: ${error.message}`
      })
    } finally {
      setIsStreaming(false)
      setStreamContent('')
    }
  }, [buildHistory, checkAutoCompaction, addMessage, addToContext, updateStats])

  return {
    isStreaming,
    streamContent,
    streamResponse
  }
}

