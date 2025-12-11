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

/**
 * Custom hook for managing command history with navigation
 * @returns {object} Command history state and handlers
 */
export function useCommandHistory () {
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputValue, setInputValue] = useState('')
  const [tempInput, setTempInput] = useState('')

  const addToHistory = useCallback((input) => {
    // Don't add duplicates of the last command
    if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== input) {
      setCommandHistory(prev => [...prev, input])
    }
  }, [commandHistory])

  const handleHistoryNavigate = useCallback((direction) => {
    if (direction === 'up') {
      if (historyIndex === -1) {
        // Save current input before navigating
        setTempInput(inputValue)
      }
      const newIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1)

      if (newIndex >= 0 && commandHistory.length > 0) {
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      }
    } else if (direction === 'down') {
      if (historyIndex === -1) return

      const newIndex = historyIndex + 1

      if (newIndex >= commandHistory.length) {
        // Restore original input
        setHistoryIndex(-1)
        setInputValue(tempInput)
      } else {
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      }
    }
  }, [historyIndex, commandHistory, inputValue, tempInput])

  const resetNavigation = useCallback(() => {
    setHistoryIndex(-1)
    setTempInput('')
    setInputValue('')
  }, [])

  return {
    commandHistory,
    historyIndex,
    inputValue,
    setInputValue,
    addToHistory,
    handleHistoryNavigate,
    resetNavigation
  }
}

