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
import TextInput from 'ink-text-input';
import { Marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import fs from 'fs/promises';
import path from 'path';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const API_URL = 'https://extensibility-docs.apimesh-adobe-test.workers.dev/ai-search';

// Configure marked with terminal renderer
const marked = new Marked(markedTerminal({
  reflowText: true,
  width: 80,
  tab: 2
}));

// Adobe ASCII Art Logo
const ADOBE_LOGO = `
   █████╗ ██████╗  ██████╗ ██████╗ ███████╗
  ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔════╝
  ███████║██║  ██║██║   ██║██████╔╝█████╗
  ██╔══██║██║  ██║██║   ██║██╔══██╗██╔══╝
  ██║  ██║██████╔╝╚██████╔╝██████╔╝███████╗
  ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝
`;
const COMMERCE_TEXT = `
   ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗██████╗  ██████╗███████╗
  ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗██╔════╝██╔════╝
  ██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██████╔╝██║     █████╗
  ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██╔══██╗██║     ██╔══╝
  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║  ██║╚██████╗███████╗
   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝
`;

// Context window configuration
const MAX_CONTEXT_TOKENS = 5000;
const AUTO_COMPACT_THRESHOLD = 0.9; // Compact at 90% of max tokens
const COMPACT_API_URL = 'https://extensibility-docs.apimesh-adobe-test.workers.dev/compact';

// Approximate token count (rough estimate: 1 token ≈ 4 characters)
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// Slash commands configuration
const SLASH_COMMANDS = {
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

// Animated Logo Component
function AnimatedLogo({
  onComplete
}) {
  const [frame, setFrame] = useState(0);
  const [showCommerce, setShowCommerce] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);
  const adobeLines = ADOBE_LOGO.split('\n').filter(line => line.trim());
  const commerceLines = COMMERCE_TEXT.split('\n').filter(line => line.trim());
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => {
        if (prev < adobeLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [adobeLines.length]);
  useEffect(() => {
    if (frame >= adobeLines.length && !showCommerce) {
      const timer = setTimeout(() => setShowCommerce(true), 200);
      return () => clearTimeout(timer);
    }
  }, [frame, adobeLines.length, showCommerce]);
  useEffect(() => {
    if (showCommerce) {
      const timer = setInterval(() => {
        setFadeIn(prev => {
          if (prev < commerceLines.length) {
            return prev + 1;
          }
          return prev;
        });
      }, 60);
      return () => clearInterval(timer);
    }
  }, [showCommerce, commerceLines.length]);
  useEffect(() => {
    if (fadeIn >= commerceLines.length && showCommerce) {
      const timer = setTimeout(() => onComplete(), 800);
      return () => clearTimeout(timer);
    }
  }, [fadeIn, commerceLines.length, showCommerce, onComplete]);
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    alignItems: "center",
    paddingY: 1,
    children: [/*#__PURE__*/_jsx(Box, {
      flexDirection: "column",
      children: adobeLines.slice(0, frame).map((line, i) => /*#__PURE__*/_jsx(Text, {
        color: "red",
        bold: true,
        children: line
      }, i))
    }), showCommerce && /*#__PURE__*/_jsx(Box, {
      flexDirection: "column",
      marginTop: 1,
      children: commerceLines.slice(0, fadeIn).map((line, i) => /*#__PURE__*/_jsx(Text, {
        color: "magenta",
        children: line
      }, i))
    }), fadeIn >= commerceLines.length && /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      children: /*#__PURE__*/_jsx(Text, {
        color: "gray",
        italic: true,
        children: "Docs Chat - Powered by AI"
      })
    })]
  });
}

// Render markdown to terminal
function renderMarkdown(text) {
  try {
    return marked.parse(text).trim();
  } catch {
    return text;
  }
}

// Message component
function Message({
  role,
  content,
  timestamp
}) {
  const isUser = role === 'user';
  const isSystem = role === 'system';
  if (isSystem) {
    return /*#__PURE__*/_jsx(Box, {
      marginY: 1,
      paddingX: 2,
      children: /*#__PURE__*/_jsx(Text, {
        color: "yellow",
        italic: true,
        children: content
      })
    });
  }
  if (isUser) {
    return /*#__PURE__*/_jsx(Box, {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginY: 1,
      paddingX: 1,
      children: /*#__PURE__*/_jsxs(Box, {
        flexDirection: "column",
        alignItems: "flex-end",
        children: [/*#__PURE__*/_jsxs(Box, {
          marginBottom: 1,
          justifyContent: "flex-end",
          children: [/*#__PURE__*/_jsx(Text, {
            color: "cyan",
            bold: true,
            children: "You"
          }), timestamp && /*#__PURE__*/_jsxs(Text, {
            color: "gray",
            dimColor: true,
            children: [" \u2022 ", timestamp]
          })]
        }), /*#__PURE__*/_jsx(Box, {
          borderStyle: "round",
          borderColor: "cyan",
          paddingX: 2,
          paddingY: 1,
          justifyContent: "flex-end",
          children: /*#__PURE__*/_jsx(Text, {
            align: "right",
            children: content
          })
        })]
      })
    });
  }

  // Assistant message with markdown rendering
  const renderedContent = renderMarkdown(content);
  return /*#__PURE__*/_jsx(Box, {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginY: 1,
    paddingX: 1,
    children: /*#__PURE__*/_jsxs(Box, {
      flexDirection: "column",
      alignItems: "flex-start",
      flexBasis: "90%",
      children: [/*#__PURE__*/_jsxs(Box, {
        marginBottom: 1,
        children: [/*#__PURE__*/_jsx(Text, {
          color: "magenta",
          bold: true,
          children: "Adobe Commerce Docs"
        }), timestamp && /*#__PURE__*/_jsxs(Text, {
          color: "gray",
          dimColor: true,
          children: [" \u2022 ", timestamp]
        })]
      }), /*#__PURE__*/_jsx(Box, {
        borderStyle: "round",
        borderColor: "magenta",
        paddingX: 2,
        paddingY: 1,
        children: /*#__PURE__*/_jsx(Text, {
          children: renderedContent
        })
      })]
    })
  });
}

// Streaming indicator
function StreamingIndicator() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300);
    return () => clearInterval(timer);
  }, []);
  return /*#__PURE__*/_jsxs(Box, {
    paddingLeft: 2,
    marginY: 1,
    children: [/*#__PURE__*/_jsx(Text, {
      color: "magenta",
      bold: true,
      children: "Adobe Commerce Docs"
    }), /*#__PURE__*/_jsxs(Text, {
      color: "gray",
      children: [" is thinking", dots]
    })]
  });
}

// Compacting indicator
function CompactingIndicator() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 200);
    return () => clearInterval(timer);
  }, []);
  return /*#__PURE__*/_jsx(Box, {
    paddingLeft: 2,
    marginY: 1,
    children: /*#__PURE__*/_jsxs(Text, {
      color: "yellow",
      bold: true,
      children: ["\uD83D\uDD04 Compacting context", dots]
    })
  });
}

// Input component with slash commands and history
function ChatInput({
  onSubmit,
  disabled,
  commandHistory,
  historyIndex,
  onHistoryNavigate,
  onValueChange,
  externalValue
}) {
  const [value, setValue] = useState('');
  const [showCommands, setShowCommands] = useState(false);

  // Sync with external value (for history navigation)
  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
      setShowCommands(externalValue.startsWith('/'));
    }
  }, [externalValue]);
  const handleChange = useCallback(newValue => {
    setValue(newValue);
    setShowCommands(newValue.startsWith('/'));
    if (onValueChange) {
      onValueChange(newValue);
    }
  }, [onValueChange]);
  const handleSubmit = useCallback(submittedValue => {
    if (submittedValue.trim()) {
      onSubmit(submittedValue.trim());
      setValue('');
      setShowCommands(false);
    }
  }, [onSubmit]);

  // Handle up/down arrow keys for history
  useInput((input, key) => {
    if (disabled) return;
    if (key.upArrow && commandHistory.length > 0) {
      onHistoryNavigate('up');
    } else if (key.downArrow) {
      onHistoryNavigate('down');
    }
  });
  const matchingCommands = showCommands ? Object.entries(SLASH_COMMANDS).filter(([cmd]) => cmd.startsWith(value.toLowerCase())) : [];
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    width: "100%",
    children: [showCommands && matchingCommands.length > 0 && /*#__PURE__*/_jsx(Box, {
      flexDirection: "column",
      borderStyle: "single",
      borderColor: "gray",
      paddingX: 1,
      marginBottom: 1,
      children: matchingCommands.map(([cmd, {
        description
      }]) => /*#__PURE__*/_jsxs(Box, {
        children: [/*#__PURE__*/_jsx(Text, {
          color: "yellow",
          bold: true,
          children: cmd
        }), /*#__PURE__*/_jsxs(Text, {
          color: "gray",
          children: [" - ", description]
        })]
      }, cmd))
    }), /*#__PURE__*/_jsxs(Box, {
      borderStyle: "round",
      borderColor: disabled ? 'gray' : 'green',
      paddingX: 2,
      width: "100%",
      children: [/*#__PURE__*/_jsx(Text, {
        color: "green",
        bold: true,
        children: "\u276F "
      }), /*#__PURE__*/_jsx(TextInput, {
        value: value,
        onChange: handleChange,
        onSubmit: handleSubmit,
        placeholder: disabled ? 'Waiting for response...' : 'Ask a question or type / for commands'
      })]
    }), commandHistory.length > 0 && historyIndex >= 0 && /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      paddingLeft: 2,
      children: /*#__PURE__*/_jsxs(Text, {
        color: "gray",
        dimColor: true,
        children: ["History: ", historyIndex + 1, "/", commandHistory.length]
      })
    })]
  });
}

// Stats display
function StatsDisplay({
  stats,
  onDismiss
}) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss();
    }
  });
  const usageColor = stats.contextUsagePercent >= 90 ? 'red' : stats.contextUsagePercent >= 70 ? 'yellow' : 'green';
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    borderStyle: "double",
    borderColor: "cyan",
    padding: 1,
    marginY: 1,
    children: [/*#__PURE__*/_jsx(Text, {
      color: "cyan",
      bold: true,
      children: "\uD83D\uDCCA Session Statistics"
    }), /*#__PURE__*/_jsxs(Box, {
      marginTop: 1,
      flexDirection: "column",
      children: [/*#__PURE__*/_jsxs(Text, {
        children: ["Messages sent: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.messagesSent
        })]
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Responses received: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.responsesReceived
        })]
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Session duration: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.duration
        })]
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Total tokens used: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.totalTokensUsed
        })]
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Commands in history: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.historyCount
        })]
      })]
    }), /*#__PURE__*/_jsxs(Box, {
      marginTop: 1,
      flexDirection: "column",
      children: [/*#__PURE__*/_jsx(Text, {
        color: "cyan",
        bold: true,
        children: "\uD83D\uDCE6 Context Window"
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Current tokens: ", /*#__PURE__*/_jsxs(Text, {
          color: usageColor,
          bold: true,
          children: [stats.contextTokens, "/", MAX_CONTEXT_TOKENS]
        }), " (", /*#__PURE__*/_jsxs(Text, {
          color: usageColor,
          children: [stats.contextUsagePercent, "%"]
        }), ")"]
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Messages in context: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.contextMessageCount
        })]
      }), /*#__PURE__*/_jsxs(Text, {
        children: ["Times compacted: ", /*#__PURE__*/_jsx(Text, {
          color: "green",
          bold: true,
          children: stats.compactionCount
        })]
      }), stats.hasSummary && /*#__PURE__*/_jsxs(Text, {
        children: ["Has summary: ", /*#__PURE__*/_jsx(Text, {
          color: "yellow",
          bold: true,
          children: "Yes"
        })]
      })]
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      children: /*#__PURE__*/_jsx(Text, {
        color: "gray",
        italic: true,
        children: "Press Enter to dismiss"
      })
    })]
  });
}

// History display
function HistoryDisplay({
  history,
  onDismiss
}) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss();
    }
  });
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    borderStyle: "double",
    borderColor: "blue",
    padding: 1,
    marginY: 1,
    children: [/*#__PURE__*/_jsx(Text, {
      color: "blue",
      bold: true,
      children: "\uD83D\uDCDC Command History"
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      flexDirection: "column",
      children: history.length === 0 ? /*#__PURE__*/_jsx(Text, {
        color: "gray",
        italic: true,
        children: "No commands in history yet."
      }) : history.slice(-15).map((cmd, i) => /*#__PURE__*/_jsxs(Box, {
        children: [/*#__PURE__*/_jsxs(Text, {
          color: "gray",
          children: [(history.length - 15 + i + 1).toString().padStart(3), ". "]
        }), /*#__PURE__*/_jsx(Text, {
          color: "cyan",
          children: cmd.length > 60 ? cmd.substring(0, 57) + '...' : cmd
        })]
      }, i))
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      children: /*#__PURE__*/_jsx(Text, {
        color: "gray",
        italic: true,
        children: "Press Enter to dismiss \u2022 Use \u2191/\u2193 in input to navigate"
      })
    })]
  });
}

// Export success display
function ExportSuccess({
  filePath,
  onDismiss
}) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss();
    }
  });
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    borderStyle: "double",
    borderColor: "green",
    padding: 1,
    marginY: 1,
    children: [/*#__PURE__*/_jsx(Text, {
      color: "green",
      bold: true,
      children: "\u2705 Export Successful"
    }), /*#__PURE__*/_jsxs(Box, {
      marginTop: 1,
      flexDirection: "column",
      children: [/*#__PURE__*/_jsx(Text, {
        children: "Chat exported to:"
      }), /*#__PURE__*/_jsx(Text, {
        color: "cyan",
        bold: true,
        children: filePath
      })]
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      children: /*#__PURE__*/_jsx(Text, {
        color: "gray",
        italic: true,
        children: "Press Enter to dismiss"
      })
    })]
  });
}

// Help display
function HelpDisplay({
  onDismiss
}) {
  useInput((input, key) => {
    if (key.return || key.escape) {
      onDismiss();
    }
  });
  return /*#__PURE__*/_jsxs(Box, {
    flexDirection: "column",
    borderStyle: "double",
    borderColor: "yellow",
    padding: 1,
    marginY: 1,
    children: [/*#__PURE__*/_jsx(Text, {
      color: "yellow",
      bold: true,
      children: "\uD83D\uDCDA Available Commands"
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      flexDirection: "column",
      children: Object.entries(SLASH_COMMANDS).map(([cmd, {
        description
      }]) => /*#__PURE__*/_jsxs(Box, {
        children: [/*#__PURE__*/_jsx(Text, {
          color: "cyan",
          bold: true,
          children: cmd.padEnd(15)
        }), /*#__PURE__*/_jsx(Text, {
          children: description
        })]
      }, cmd))
    }), /*#__PURE__*/_jsxs(Box, {
      marginTop: 1,
      flexDirection: "column",
      children: [/*#__PURE__*/_jsx(Text, {
        color: "gray",
        bold: true,
        children: "Keyboard Shortcuts:"
      }), /*#__PURE__*/_jsx(Text, {
        color: "gray",
        children: "  \u2191 / \u2193      Navigate command history"
      }), /*#__PURE__*/_jsx(Text, {
        color: "gray",
        children: "  Ctrl+C     Exit the application"
      })]
    }), /*#__PURE__*/_jsx(Box, {
      marginTop: 1,
      children: /*#__PURE__*/_jsx(Text, {
        color: "gray",
        italic: true,
        children: "Press Enter to dismiss"
      })
    })]
  });
}

// Format timestamp
function formatTimestamp(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Main Chat Application
function ChatApp() {
  const {
    exit
  } = useApp();
  const {
    stdout
  } = useStdout();
  const [showLogo, setShowLogo] = useState(true);
  const [messages, setMessages] = useState([]); // Full chat history for display and export
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [isCompacting, setIsCompacting] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [exportedFilePath, setExportedFilePath] = useState('');
  const [sessionStart] = useState(Date.now());

  // Context window state - this is what gets sent to the AI
  const [contextWindow, setContextWindow] = useState([]); // Current unsummarized messages
  const [contextSummary, setContextSummary] = useState(''); // Summary of previous conversations
  const [compactionCount, setCompactionCount] = useState(0); // Number of times context was compacted

  const [stats, setStats] = useState({
    messagesSent: 0,
    responsesReceived: 0,
    totalTokensUsed: 0,
    historyCount: 0
  });

  // Command history state
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [tempInput, setTempInput] = useState('');

  // Calculate current context token usage
  const calculateContextTokens = useCallback(() => {
    let tokens = 0;
    if (contextSummary) {
      tokens += estimateTokens(contextSummary);
    }
    for (const msg of contextWindow) {
      tokens += estimateTokens(msg.content);
    }
    return tokens;
  }, [contextSummary, contextWindow]);

  // Get context usage percentage
  const getContextUsagePercent = useCallback(() => {
    return Math.round(calculateContextTokens() / MAX_CONTEXT_TOKENS * 100);
  }, [calculateContextTokens]);

  // Calculate terminal width for markdown
  useEffect(() => {
    if (stdout) {
      marked.setOptions(markedTerminal({
        reflowText: true,
        width: Math.min(stdout.columns - 10, 100) || 80,
        tab: 2
      }));
    }
  }, [stdout]);
  const formatDuration = useCallback(() => {
    const seconds = Math.floor((Date.now() - sessionStart) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  }, [sessionStart]);

  // Export to Markdown
  const exportToMarkdown = useCallback(async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `commerce-docs-chat-${timestamp}.md`;
    const filePath = path.join(process.cwd(), filename);
    let content = `# Adobe Commerce Docs Chat Export\n\n`;
    content += `**Exported:** ${new Date().toLocaleString()}\n`;
    content += `**Session Duration:** ${formatDuration()}\n`;
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
  }, [messages, formatDuration]);

  // Export to JSON
  const exportToJson = useCallback(async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `commerce-docs-chat-${timestamp}.json`;
    const filePath = path.join(process.cwd(), filename);
    const data = {
      exportedAt: new Date().toISOString(),
      sessionDuration: formatDuration(),
      stats: {
        messagesSent: stats.messagesSent,
        responsesReceived: stats.responsesReceived,
        totalTokensUsed: stats.totalTokensUsed,
        compactionCount
      },
      messages: messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp || null
      })),
      commandHistory
    };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return filePath;
  }, [messages, formatDuration, stats, commandHistory, compactionCount]);

  // Compact the context window by summarizing messages
  const compactContextWindow = useCallback(async (isAutomatic = false) => {
    if (contextWindow.length === 0) {
      if (!isAutomatic) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: 'Nothing to compact - context window is empty.'
        }]);
      }
      return false;
    }
    setIsCompacting(true);
    const beforeTokens = calculateContextTokens();
    try {
      // Prepare messages for summarization (include existing summary if any)
      const messagesToSummarize = [];
      if (contextSummary) {
        messagesToSummarize.push({
          role: 'system',
          content: `Previous conversation summary: ${contextSummary}`
        });
      }
      messagesToSummarize.push(...contextWindow.map(m => ({
        role: m.role,
        content: m.content
      })));
      const response = await fetch(COMPACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messagesToSummarize
        })
      });
      if (!response.ok) {
        throw new Error(`Compact API error: ${response.status}`);
      }
      const data = await response.json();
      const newSummary = data.summary || data.content || '';
      if (!newSummary) {
        throw new Error('No summary returned from API');
      }

      // Update context with new summary and clear the window
      setContextSummary(newSummary);
      setContextWindow([]);
      setCompactionCount(prev => prev + 1);
      const afterTokens = estimateTokens(newSummary);
      const savedTokens = beforeTokens - afterTokens;
      setMessages(prev => [...prev, {
        role: 'system',
        content: `${isAutomatic ? '🔄 Auto-compacted' : '✅ Compacted'} context: ${beforeTokens} → ${afterTokens} tokens (saved ${savedTokens} tokens)`
      }]);
      return true;
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Compaction failed: ${error.message}`
      }]);
      return false;
    } finally {
      setIsCompacting(false);
    }
  }, [contextWindow, contextSummary, calculateContextTokens]);

  // Check if auto-compaction is needed
  const checkAutoCompaction = useCallback(async () => {
    const usagePercent = getContextUsagePercent();
    if (usagePercent >= AUTO_COMPACT_THRESHOLD * 100) {
      await compactContextWindow(true);
    }
  }, [getContextUsagePercent, compactContextWindow]);
  const handleSlashCommand = useCallback(async command => {
    const cmd = command.toLowerCase().trim();
    if (cmd === '/clear') {
      setMessages([{
        role: 'system',
        content: 'Chat history and context cleared.'
      }]);
      setContextWindow([]);
      setContextSummary('');
      return true;
    }
    if (cmd === '/compact') {
      await compactContextWindow(false);
      return true;
    }
    if (cmd === '/stats') {
      setStats(prev => ({
        ...prev,
        duration: formatDuration(),
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
        const filePath = await exportToMarkdown();
        setExportedFilePath(filePath);
        setShowExportSuccess(true);
      } catch (error) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `Export failed: ${error.message}`
        }]);
      }
      return true;
    }
    if (cmd === '/export json') {
      try {
        const filePath = await exportToJson();
        setExportedFilePath(filePath);
        setShowExportSuccess(true);
      } catch (error) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `Export failed: ${error.message}`
        }]);
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
  }, [exit, formatDuration, commandHistory.length, exportToMarkdown, exportToJson, compactContextWindow, calculateContextTokens, getContextUsagePercent, contextWindow.length, compactionCount, contextSummary]);

  // Build conversation history for context using contextWindow and summary
  const buildConversationHistory = useCallback(() => {
    const history = [];

    // Include summary if we have one
    if (contextSummary) {
      history.push({
        role: 'system',
        content: `Previous conversation summary: ${contextSummary}`
      });
    }

    // Add current context window messages
    for (const msg of contextWindow) {
      history.push({
        role: msg.role,
        content: msg.content
      });
    }
    return history;
  }, [contextSummary, contextWindow]);
  const streamResponse = useCallback(async query => {
    setIsStreaming(true);
    setStreamContent('');
    try {
      // Check if auto-compaction is needed before making the request
      await checkAutoCompaction();

      // Build conversation history for context
      const history = buildConversationHistory();
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          stream: true,
          history
        })
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';
      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {
          stream: true
        });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.response) {
                fullContent += data.response;
                setStreamContent(fullContent);
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
          const data = JSON.parse(buffer.slice(6));
          if (data.response) {
            fullContent += data.response;
          }
        } catch {
          // Skip
        }
      }
      const assistantMessage = {
        role: 'assistant',
        content: fullContent,
        timestamp: formatTimestamp(new Date())
      };

      // Add to display messages
      setMessages(prev => [...prev, assistantMessage]);

      // Add to context window
      setContextWindow(prev => [...prev, {
        role: 'assistant',
        content: fullContent
      }]);
      const responseTokens = estimateTokens(fullContent);
      setStats(prev => ({
        ...prev,
        responsesReceived: prev.responsesReceived + 1,
        totalTokensUsed: prev.totalTokensUsed + responseTokens
      }));
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Error: ${error.message}`
      }]);
    } finally {
      setIsStreaming(false);
      setStreamContent('');
    }
  }, [buildConversationHistory, checkAutoCompaction]);

  // Handle history navigation
  const handleHistoryNavigate = useCallback(direction => {
    if (direction === 'up') {
      if (historyIndex === -1) {
        // Save current input before navigating
        setTempInput(inputValue);
      }
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      if (newIndex >= 0 && commandHistory.length > 0) {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (direction === 'down') {
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        // Restore original input
        setHistoryIndex(-1);
        setInputValue(tempInput);
      } else {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    }
  }, [historyIndex, commandHistory, inputValue, tempInput]);
  const handleSubmit = useCallback(async input => {
    // Reset history navigation
    setHistoryIndex(-1);
    setTempInput('');
    setInputValue('');

    // Add to command history (don't add duplicates of the last command)
    if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== input) {
      setCommandHistory(prev => [...prev, input]);
    }

    // Check for slash commands first
    if (input.startsWith('/')) {
      if (await handleSlashCommand(input)) {
        return;
      }
      // Unknown command
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Unknown command: ${input}. Type /help for available commands.`
      }]);
      return;
    }

    // Regular message - add to display messages
    setMessages(prev => [...prev, {
      role: 'user',
      content: input,
      timestamp: formatTimestamp(new Date())
    }]);

    // Add to context window
    setContextWindow(prev => [...prev, {
      role: 'user',
      content: input
    }]);
    const inputTokens = estimateTokens(input);
    setStats(prev => ({
      ...prev,
      messagesSent: prev.messagesSent + 1,
      totalTokensUsed: prev.totalTokensUsed + inputTokens
    }));
    streamResponse(input);
  }, [handleSlashCommand, streamResponse, commandHistory]);

  // Handle Ctrl+C
  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      exit();
    }
  });
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