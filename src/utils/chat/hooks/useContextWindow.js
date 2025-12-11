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
import { MAX_CONTEXT_TOKENS, AUTO_COMPACT_THRESHOLD, COMPACT_API_URL } from '../constants/index.js'
import { estimateTokens } from '../utils/index.js'

/**
 * Custom hook for managing the context window with auto-compaction
 * @param {Function} addSystemMessage - Function to add system messages to display
 * @returns {object} Context window state and handlers
 */
export function useContextWindow (addSystemMessage) {
  const [contextWindow, setContextWindow] = useState([])
  const [contextSummary, setContextSummary] = useState('')
  const [compactionCount, setCompactionCount] = useState(0)
  const [isCompacting, setIsCompacting] = useState(false)

  const calculateContextTokens = useCallback(() => {
    let tokens = 0
    if (contextSummary) {
      tokens += estimateTokens(contextSummary)
    }
    for (const msg of contextWindow) {
      tokens += estimateTokens(msg.content)
    }
    return tokens
  }, [contextSummary, contextWindow])

  const getContextUsagePercent = useCallback(() => {
    return Math.round((calculateContextTokens() / MAX_CONTEXT_TOKENS) * 100)
  }, [calculateContextTokens])

  const addToContext = useCallback((message) => {
    setContextWindow(prev => [...prev, message])
  }, [])

  const clearContext = useCallback(() => {
    setContextWindow([])
    setContextSummary('')
  }, [])

  const buildConversationHistory = useCallback(() => {
    const history = []

    // Include summary if we have one
    if (contextSummary) {
      history.push({
        role: 'system',
        content: `Previous conversation summary: ${contextSummary}`
      })
    }

    // Add current context window messages
    for (const msg of contextWindow) {
      history.push({
        role: msg.role,
        content: msg.content
      })
    }

    return history
  }, [contextSummary, contextWindow])

  const compactContextWindow = useCallback(async (isAutomatic = false) => {
    if (contextWindow.length === 0) {
      if (!isAutomatic && addSystemMessage) {
        addSystemMessage('Nothing to compact - context window is empty.')
      }
      return false
    }

    setIsCompacting(true)
    const beforeTokens = calculateContextTokens()

    try {
      // Prepare messages for summarization (include existing summary if any)
      const messagesToSummarize = []
      if (contextSummary) {
        messagesToSummarize.push({
          role: 'system',
          content: `Previous conversation summary: ${contextSummary}`
        })
      }
      messagesToSummarize.push(...contextWindow.map(m => ({
        role: m.role,
        content: m.content
      })))

      const response = await fetch(COMPACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesToSummarize })
      })

      if (!response.ok) {
        throw new Error(`Compact API error: ${response.status}`)
      }

      const data = await response.json()
      const newSummary = data.summary || data.content || ''

      if (!newSummary) {
        throw new Error('No summary returned from API')
      }

      // Update context with new summary and clear the window
      setContextSummary(newSummary)
      setContextWindow([])
      setCompactionCount(prev => prev + 1)

      const afterTokens = estimateTokens(newSummary)
      const savedTokens = beforeTokens - afterTokens

      if (addSystemMessage) {
        addSystemMessage(`${isAutomatic ? '🔄 Auto-compacted' : '✅ Compacted'} context: ${beforeTokens} → ${afterTokens} tokens (saved ${savedTokens} tokens)`)
      }

      return true
    } catch (error) {
      if (addSystemMessage) {
        addSystemMessage(`Compaction failed: ${error.message}`)
      }
      return false
    } finally {
      setIsCompacting(false)
    }
  }, [contextWindow, contextSummary, calculateContextTokens, addSystemMessage])

  const checkAutoCompaction = useCallback(async () => {
    const usagePercent = getContextUsagePercent()
    if (usagePercent >= AUTO_COMPACT_THRESHOLD * 100) {
      await compactContextWindow(true)
    }
  }, [getContextUsagePercent, compactContextWindow])

  return {
    contextWindow,
    contextSummary,
    compactionCount,
    isCompacting,
    calculateContextTokens,
    getContextUsagePercent,
    addToContext,
    clearContext,
    buildConversationHistory,
    compactContextWindow,
    checkAutoCompaction
  }
}

