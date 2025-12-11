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
import { render, Box, Text, useInput, useApp, useStdout } from 'ink'
import TextInput from 'ink-text-input'
import { Marked } from 'marked'
import { markedTerminal } from 'marked-terminal'
import fs from 'fs/promises'
import path from 'path'

const API_URL = 'https://extensibility-docs.apimesh-adobe-test.workers.dev/ai-search'

// Configure marked with terminal renderer
const marked = new Marked(markedTerminal({
  reflowText: true,
  width: 80,
  tab: 2
}))

// Adobe ASCII Art Logo
const ADOBE_LOGO = `
   █████╗ ██████╗  ██████╗ ██████╗ ███████╗
  ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔════╝
  ███████║██║  ██║██║   ██║██████╔╝█████╗  
  ██╔══██║██║  ██║██║   ██║██╔══██╗██╔══╝  
  ██║  ██║██████╔╝╚██████╔╝██████╔╝███████╗
  ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝
`

const COMMERCE_TEXT = `
   ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗██████╗  ██████╗███████╗
  ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗██╔════╝██╔════╝
  ██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██████╔╝██║     █████╗  
  ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██╔══██╗██║     ██╔══╝  
  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║  ██║╚██████╗███████╗
   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝
`

// Slash commands configuration
const SLASH_COMMANDS = {
  '/clear': {
    description: 'Clear chat history',
    action: 'clear'
  },
  '/compact': {
    description: 'Toggle compact mode (less spacing)',
    action: 'compact'
  },
  '/stats': {
    description: 'Show session statistics',
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
}

// Animated Logo Component
function AnimatedLogo ({ onComplete }) {
  const [frame, setFrame] = useState(0)
  const [showCommerce, setShowCommerce] = useState(false)
  const [fadeIn, setFadeIn] = useState(0)

  const adobeLines = ADOBE_LOGO.split('\n').filter(line => line.trim())
  const commerceLines = COMMERCE_TEXT.split('\n').filter(line => line.trim())

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => {
        if (prev < adobeLines.length) {
          return prev + 1
        }
        return prev
      })
    }, 80)

    return () => clearInterval(timer)
  }, [adobeLines.length])

  useEffect(() => {
    if (frame >= adobeLines.length && !showCommerce) {
      const timer = setTimeout(() => setShowCommerce(true), 200)
      return () => clearTimeout(timer)
    }
  }, [frame, adobeLines.length, showCommerce])

  useEffect(() => {
    if (showCommerce) {
      const timer = setInterval(() => {
        setFadeIn(prev => {
          if (prev < commerceLines.length) {
            return prev + 1
          }
          return prev
        })
      }, 60)

      return () => clearInterval(timer)
    }
  }, [showCommerce, commerceLines.length])

  useEffect(() => {
    if (fadeIn >= commerceLines.length && showCommerce) {
      const timer = setTimeout(() => onComplete(), 800)
      return () => clearTimeout(timer)
    }
  }, [fadeIn, commerceLines.length, showCommerce, onComplete])

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Box flexDirection="column">
        {adobeLines.slice(0, frame).map((line, i) => (
          <Text key={i} color="red" bold>{line}</Text>
        ))}
      </Box>
      {showCommerce && (
        <Box flexDirection="column" marginTop={1}>
          {commerceLines.slice(0, fadeIn).map((line, i) => (
            <Text key={i} color="magenta">{line}</Text>
          ))}
        </Box>
      )}
      {fadeIn >= commerceLines.length && (
        <Box marginTop={1}>
          <Text color="gray" italic>Docs Chat - Powered by AI</Text>
        </Box>
      )}
    </Box>
  )
}

// Render markdown to terminal
function renderMarkdown (text) {
  try {
    return marked.parse(text).trim()
  } catch {
    return text
  }
}

// Message component
function Message ({ role, content, compact, timestamp }) {
  const isUser = role === 'user'
  const isSystem = role === 'system'

  if (isSystem) {
    return (
      <Box marginY={compact ? 0 : 1} paddingX={2}>
        <Text color="yellow" italic>{content}</Text>
      </Box>
    )
  }

  if (isUser) {
    return (
      <Box
        flexDirection="row"
        justifyContent="flex-end"
        marginY={compact ? 0 : 1}
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
            paddingY={compact ? 0 : 1}
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
      marginY={compact ? 0 : 1}
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
          paddingY={compact ? 0 : 1}
        >
          <Text>{renderedContent}</Text>
        </Box>
      </Box>
    </Box>
  )
}

// Streaming indicator
function StreamingIndicator () {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 300)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box paddingLeft={2} marginY={1}>
      <Text color="magenta" bold>Adobe Commerce Docs</Text>
      <Text color="gray"> is thinking{dots}</Text>
    </Box>
  )
}

// Input component with slash commands and history
function ChatInput ({ onSubmit, disabled, commandHistory, historyIndex, onHistoryNavigate, onValueChange, externalValue }) {
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

// Stats display
function StatsDisplay ({ stats, onDismiss }) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss()
    }
  })

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
        <Text>Total tokens (approx): <Text color="green" bold>{stats.approxTokens}</Text></Text>
        <Text>Commands in history: <Text color="green" bold>{stats.historyCount}</Text></Text>
      </Box>
      <Box marginTop={1}>
        <Text color="gray" italic>Press Enter to dismiss</Text>
      </Box>
    </Box>
  )
}

// History display
function HistoryDisplay ({ history, onDismiss }) {
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

// Export success display
function ExportSuccess ({ filePath, onDismiss }) {
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

// Help display
function HelpDisplay ({ onDismiss }) {
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

// Format timestamp
function formatTimestamp (date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

// Main Chat Application
function ChatApp () {
  const { exit } = useApp()
  const { stdout } = useStdout()

  const [showLogo, setShowLogo] = useState(true)
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamContent, setStreamContent] = useState('')
  const [compactMode, setCompactMode] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showExportSuccess, setShowExportSuccess] = useState(false)
  const [exportedFilePath, setExportedFilePath] = useState('')
  const [sessionStart] = useState(Date.now())
  const [stats, setStats] = useState({
    messagesSent: 0,
    responsesReceived: 0,
    approxTokens: 0,
    historyCount: 0
  })

  // Command history state
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputValue, setInputValue] = useState('')
  const [tempInput, setTempInput] = useState('')

  // Calculate terminal width for markdown
  useEffect(() => {
    if (stdout) {
      marked.setOptions(markedTerminal({
        reflowText: true,
        width: Math.min(stdout.columns - 10, 100) || 80,
        tab: 2
      }))
    }
  }, [stdout])

  const formatDuration = useCallback(() => {
    const seconds = Math.floor((Date.now() - sessionStart) / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }, [sessionStart])

  // Export to Markdown
  const exportToMarkdown = useCallback(async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `commerce-docs-chat-${timestamp}.md`
    const filePath = path.join(process.cwd(), filename)

    let content = `# Adobe Commerce Docs Chat Export\n\n`
    content += `**Exported:** ${new Date().toLocaleString()}\n`
    content += `**Session Duration:** ${formatDuration()}\n`
    content += `**Messages:** ${messages.filter(m => m.role !== 'system').length}\n\n`
    content += `---\n\n`

    for (const msg of messages) {
      if (msg.role === 'system') continue

      if (msg.role === 'user') {
        content += `## 👤 You\n`
        if (msg.timestamp) content += `*${msg.timestamp}*\n\n`
        content += `${msg.content}\n\n`
      } else {
        content += `## 🤖 Adobe Commerce Docs\n`
        if (msg.timestamp) content += `*${msg.timestamp}*\n\n`
        content += `${msg.content}\n\n`
      }
      content += `---\n\n`
    }

    await fs.writeFile(filePath, content, 'utf-8')
    return filePath
  }, [messages, formatDuration])

  // Export to JSON
  const exportToJson = useCallback(async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `commerce-docs-chat-${timestamp}.json`
    const filePath = path.join(process.cwd(), filename)

    const data = {
      exportedAt: new Date().toISOString(),
      sessionDuration: formatDuration(),
      stats: {
        messagesSent: stats.messagesSent,
        responsesReceived: stats.responsesReceived,
        approxTokens: stats.approxTokens
      },
      messages: messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp || null
      })),
      commandHistory
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return filePath
  }, [messages, formatDuration, stats, commandHistory])

  const handleSlashCommand = useCallback(async (command) => {
    const cmd = command.toLowerCase().trim()

    if (cmd === '/clear') {
      setMessages([{ role: 'system', content: 'Chat history cleared.' }])
      return true
    }

    if (cmd === '/compact') {
      setCompactMode(prev => !prev)
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Compact mode ${!compactMode ? 'enabled' : 'disabled'}.`
      }])
      return true
    }

    if (cmd === '/stats') {
      setStats(prev => ({
        ...prev,
        duration: formatDuration(),
        historyCount: commandHistory.length
      }))
      setShowStats(true)
      return true
    }

    if (cmd === '/history') {
      setShowHistory(true)
      return true
    }

    if (cmd === '/export' || cmd === '/export md' || cmd === '/export markdown') {
      try {
        const filePath = await exportToMarkdown()
        setExportedFilePath(filePath)
        setShowExportSuccess(true)
      } catch (error) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `Export failed: ${error.message}`
        }])
      }
      return true
    }

    if (cmd === '/export json') {
      try {
        const filePath = await exportToJson()
        setExportedFilePath(filePath)
        setShowExportSuccess(true)
      } catch (error) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `Export failed: ${error.message}`
        }])
      }
      return true
    }

    if (cmd === '/help') {
      setShowHelp(true)
      return true
    }

    if (cmd === '/exit' || cmd === '/quit') {
      exit()
      return true
    }

    return false
  }, [compactMode, exit, formatDuration, commandHistory.length, exportToMarkdown, exportToJson])

  const streamResponse = useCallback(async (query) => {
    setIsStreaming(true)
    setStreamContent('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, stream: true })
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

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fullContent,
        timestamp: formatTimestamp(new Date())
      }])
      setStats(prev => ({
        ...prev,
        responsesReceived: prev.responsesReceived + 1,
        approxTokens: prev.approxTokens + Math.ceil(fullContent.length / 4)
      }))
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Error: ${error.message}`
      }])
    } finally {
      setIsStreaming(false)
      setStreamContent('')
    }
  }, [])

  // Handle history navigation
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

  const handleSubmit = useCallback(async (input) => {
    // Reset history navigation
    setHistoryIndex(-1)
    setTempInput('')
    setInputValue('')

    // Add to command history (don't add duplicates of the last command)
    if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== input) {
      setCommandHistory(prev => [...prev, input])
    }

    // Check for slash commands first
    if (input.startsWith('/')) {
      if (await handleSlashCommand(input)) {
        return
      }
      // Unknown command
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Unknown command: ${input}. Type /help for available commands.`
      }])
      return
    }

    // Regular message
    setMessages(prev => [...prev, {
      role: 'user',
      content: input,
      timestamp: formatTimestamp(new Date())
    }])
    setStats(prev => ({
      ...prev,
      messagesSent: prev.messagesSent + 1,
      approxTokens: prev.approxTokens + Math.ceil(input.length / 4)
    }))
    streamResponse(input)
  }, [handleSlashCommand, streamResponse, commandHistory])

  // Handle Ctrl+C
  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      exit()
    }
  })

  if (showLogo) {
    return (
      <Box flexDirection="column" padding={1}>
        <AnimatedLogo onComplete={() => setShowLogo(false)} />
      </Box>
    )
  }

  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box
        borderStyle="double"
        borderColor="red"
        paddingX={2}
        justifyContent="center"
      >
        <Text color="red" bold>ADOBE</Text>
        <Text> </Text>
        <Text color="magenta" bold>COMMERCE</Text>
        <Text> </Text>
        <Text color="gray">Docs Chat</Text>
      </Box>

      {/* Messages area */}
      <Box flexDirection="column" flexGrow={1} marginY={1}>
        {messages.length === 0 && !isStreaming && (
          <Box flexDirection="column" alignItems="center" paddingY={2}>
            <Text color="gray">Welcome to Adobe Commerce Docs Chat!</Text>
            <Text color="gray">Ask any question about Adobe Commerce, or type <Text color="yellow">/help</Text> for commands.</Text>
            <Text color="gray" dimColor>Use ↑/↓ arrows to navigate command history.</Text>
          </Box>
        )}

        {messages.map((msg, i) => (
          <Message
            key={i}
            role={msg.role}
            content={msg.content}
            compact={compactMode}
            timestamp={msg.timestamp}
          />
        ))}

        {isStreaming && streamContent && (
          <Message role="assistant" content={streamContent + ' ▌'} compact={compactMode} />
        )}

        {isStreaming && !streamContent && (
          <StreamingIndicator />
        )}
      </Box>

      {/* Stats overlay */}
      {showStats && (
        <StatsDisplay stats={stats} onDismiss={() => setShowStats(false)} />
      )}

      {/* History overlay */}
      {showHistory && (
        <HistoryDisplay history={commandHistory} onDismiss={() => setShowHistory(false)} />
      )}

      {/* Export success overlay */}
      {showExportSuccess && (
        <ExportSuccess filePath={exportedFilePath} onDismiss={() => setShowExportSuccess(false)} />
      )}

      {/* Help overlay */}
      {showHelp && (
        <HelpDisplay onDismiss={() => setShowHelp(false)} />
      )}

      {/* Input area */}
      <Box marginTop={1}>
        <ChatInput
          onSubmit={handleSubmit}
          disabled={isStreaming}
          commandHistory={commandHistory}
          historyIndex={historyIndex}
          onHistoryNavigate={handleHistoryNavigate}
          onValueChange={setInputValue}
          externalValue={inputValue}
        />
      </Box>

      {/* Footer */}
      <Box marginTop={1} justifyContent="center">
        <Text color="gray" dimColor>
          <Text color="yellow">/help</Text> commands • <Text color="yellow">/export</Text> save chat • <Text color="yellow">↑↓</Text> history • <Text color="yellow">Ctrl+C</Text> exit
        </Text>
      </Box>
    </Box>
  )
}

export function startChatApp () {
  render(<ChatApp />)
}

