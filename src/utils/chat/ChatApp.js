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

import React, { useState, useEffect, useCallback } from 'react';
import { render, Box, Text, useInput, useApp, useStdout } from 'ink';

// Local imports
import { SLASH_COMMANDS } from './constants/index.js';
import { updateMarkdownOptions, formatTimestamp, formatDuration, estimateTokens, exportToMarkdown, exportToJson } from './utils/index.js';
import { AnimatedLogo, Message, ChatInput, StreamingIndicator, CompactingIndicator, StatsDisplay, HistoryDisplay, ExportSuccess, HelpDisplay } from './components/index.js';
import { useCommandHistory, useContextWindow, useStreamResponse } from './hooks/index.js';

/* eslint-disable react/react-in-jsx-scope */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ChatApp() {
  const {
    exit
  } = useApp();
  const {
    stdout
  } = useStdout();

  // UI state
  const [showLogo, setShowLogo] = useState(true);
  const [messages, setMessages] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [exportedFilePath, setExportedFilePath] = useState('');
  const [sessionStart] = useState(Date.now());

  // Stats state
  const [stats, setStats] = useState({
    messagesSent: 0,
    responsesReceived: 0,
    totalTokensUsed: 0,
    historyCount: 0
  });

  // Helper to add system messages
  const addSystemMessage = useCallback(content => {
    setMessages(prev => [...prev, {
      role: 'system',
      content
    }]);
  }, []);

  // Helper to add any message
  const addMessage = useCallback(message => {
    setMessages(prev => [...prev, message]);
  }, []);

  // Custom hooks
  const {
    commandHistory,
    historyIndex,
    inputValue,
    setInputValue,
    addToHistory,
    handleHistoryNavigate,
    resetNavigation
  } = useCommandHistory();
  const {
    contextWindow,
    contextSummary,
    compactionCount,
    isCompacting,
    calculateContextTokens,
    getContextUsagePercent,
    addToContext,
    clearContext,
    buildConversationHistory,
    compactContextWindow
  } = useContextWindow(addSystemMessage);
  const {
    isStreaming,
    streamContent,
    streamResponse
  } = useStreamResponse({
    buildHistory: buildConversationHistory,
    checkAutoCompaction: async () => {
      const usagePercent = getContextUsagePercent();
      if (usagePercent >= 90) {
        await compactContextWindow(true);
      }
    },
    addMessage,
    addToContext,
    updateStats: setStats
  });

  // Calculate terminal width for markdown
  useEffect(() => {
    if (stdout) {
      updateMarkdownOptions({
        width: Math.min(stdout.columns - 10, 100) || 80
      });
    }
  }, [stdout]);

  // Get formatted duration
  const getFormattedDuration = useCallback(() => {
    return formatDuration(sessionStart);
  }, [sessionStart]);

  // Handle slash commands
  const handleSlashCommand = useCallback(async command => {
    const cmd = command.toLowerCase().trim();
    if (cmd === '/clear') {
      setMessages([{
        role: 'system',
        content: 'Chat history and context cleared.'
      }]);
      clearContext();
      return true;
    }
    if (cmd === '/compact') {
      await compactContextWindow(false);
      return true;
    }
    if (cmd === '/stats') {
      setStats(prev => ({
        ...prev,
        duration: getFormattedDuration(),
        historyCount: commandHistory.length,
        contextTokens: calculateContextTokens(),
        contextUsagePercent: getContextUsagePercent(),
        contextMessageCount: contextWindow.length,
        compactionCount,
        hasSummary: !!contextSummary
      }));
      setShowStats(true);
      return true;
    }
    if (cmd === '/history') {
      setShowHistory(true);
      return true;
    }
    if (cmd === '/export' || cmd === '/export md' || cmd === '/export markdown') {
      try {
        const filePath = await exportToMarkdown(messages, getFormattedDuration());
        setExportedFilePath(filePath);
        setShowExportSuccess(true);
      } catch (error) {
        addSystemMessage(`Export failed: ${error.message}`);
      }
      return true;
    }
    if (cmd === '/export json') {
      try {
        const filePath = await exportToJson({
          messages,
          duration: getFormattedDuration(),
          stats,
          commandHistory,
          compactionCount
        });
        setExportedFilePath(filePath);
        setShowExportSuccess(true);
      } catch (error) {
        addSystemMessage(`Export failed: ${error.message}`);
      }
      return true;
    }
    if (cmd === '/help') {
      setShowHelp(true);
      return true;
    }
    if (cmd === '/exit' || cmd === '/quit') {
      exit();
      return true;
    }
    return false;
  }, [exit, getFormattedDuration, commandHistory, messages, stats, compactionCount, contextSummary, contextWindow.length, calculateContextTokens, getContextUsagePercent, clearContext, compactContextWindow, addSystemMessage]);

  // Handle message submission
  const handleSubmit = useCallback(async input => {
    resetNavigation();
    addToHistory(input);

    // Check for slash commands first
    if (input.startsWith('/')) {
      if (await handleSlashCommand(input)) {
        return;
      }
      // Unknown command
      addSystemMessage(`Unknown command: ${input}. Type /help for available commands.`);
      return;
    }

    // Regular message - add to display messages
    addMessage({
      role: 'user',
      content: input,
      timestamp: formatTimestamp(new Date())
    });

    // Add to context window
    addToContext({
      role: 'user',
      content: input
    });
    const inputTokens = estimateTokens(input);
    setStats(prev => ({
      ...prev,
      messagesSent: prev.messagesSent + 1,
      totalTokensUsed: prev.totalTokensUsed + inputTokens
    }));
    streamResponse(input);
  }, [handleSlashCommand, streamResponse, resetNavigation, addToHistory, addMessage, addToContext, addSystemMessage]);

  // Handle Ctrl+C
  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      exit();
    }
  });

  // Show animated logo on startup
  if (showLogo) {
    return /*#__PURE__*/_jsx(Box, {
      flexDirection: "column",
      padding: 1,
      children: /*#__PURE__*/_jsx(AnimatedLogo, {
        onComplete: () => setShowLogo(false)
      })
    });
  }
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    padding: 1,
    children: [/*#__PURE__*/_jsxs(Box, {
      borderStyle: "double",
      borderColor: "red",
      paddingX: 2,
      justifyContent: "center",
      children: [/*#__PURE__*/_jsx(Text, {
        color: "red",
        bold: true,
        children: "ADOBE"
      }), /*#__PURE__*/_jsx(Text, {
        children: " "
      }), /*#__PURE__*/_jsx(Text, {
        color: "magenta",
        bold: true,
        children: "COMMERCE"
      }), /*#__PURE__*/_jsx(Text, {
        children: " "
      }), /*#__PURE__*/_jsx(Text, {
        color: "gray",
        children: "Docs Chat"
      })]
    }), /*#__PURE__*/_jsxs(Box, {
      flexDirection: "column",
      flexGrow: 1,
      marginY: 1,
      children: [messages.length === 0 && !isStreaming && /*#__PURE__*/_jsxs(Box, {
        flexDirection: "column",
        alignItems: "center",
        paddingY: 2,
        children: [/*#__PURE__*/_jsx(Text, {
          color: "gray",
          children: "Welcome to Adobe Commerce Docs Chat!"
        }), /*#__PURE__*/_jsxs(Text, {
          color: "gray",
          children: ["Ask any question about Adobe Commerce, or type ", /*#__PURE__*/_jsx(Text, {
            color: "yellow",
            children: "/help"
          }), " for commands."]
        }), /*#__PURE__*/_jsx(Text, {
          color: "gray",
          dimColor: true,
          children: "Use \u2191/\u2193 arrows to navigate command history."
        })]
      }), messages.map((msg, i) => /*#__PURE__*/_jsx(Message, {
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }, i)), isStreaming && streamContent && /*#__PURE__*/_jsx(Message, {
        role: "assistant",
        content: streamContent + ' ▌'
      }), isStreaming && !streamContent && /*#__PURE__*/_jsx(StreamingIndicator, {}), isCompacting && /*#__PURE__*/_jsx(CompactingIndicator, {})]
    }), showStats && /*#__PURE__*/_jsx(StatsDisplay, {
      stats: stats,
      onDismiss: () => setShowStats(false)
    }), showHistory && /*#__PURE__*/_jsx(HistoryDisplay, {
      history: commandHistory,
      onDismiss: () => setShowHistory(false)
    }), showExportSuccess && /*#__PURE__*/_jsx(ExportSuccess, {
      filePath: exportedFilePath,
      onDismiss: () => setShowExportSuccess(false)
    }), showHelp && /*#__PURE__*/_jsx(HelpDisplay, {
      onDismiss: () => setShowHelp(false)
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      children: /*#__PURE__*/_jsx(ChatInput, {
        onSubmit: handleSubmit,
        disabled: isStreaming,
        commandHistory: commandHistory,
        historyIndex: historyIndex,
        onHistoryNavigate: handleHistoryNavigate,
        onValueChange: setInputValue,
        externalValue: inputValue
      })
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      justifyContent: "center",
      children: /*#__PURE__*/_jsxs(Text, {
        color: "gray",
        dimColor: true,
        children: [/*#__PURE__*/_jsx(Text, {
          color: "yellow",
          children: "/help"
        }), " commands \u2022 ", /*#__PURE__*/_jsx(Text, {
          color: "yellow",
          children: "/export"
        }), " save chat \u2022 ", /*#__PURE__*/_jsx(Text, {
          color: "yellow",
          children: "\u2191\u2193"
        }), " history \u2022 ", /*#__PURE__*/_jsx(Text, {
          color: "yellow",
          children: "Ctrl+C"
        }), " exit"]
      })
    })]
  });
}
export async function startChatApp() {
  const app = render(/*#__PURE__*/_jsx(ChatApp, {}));
  await app.waitUntilExit();
}