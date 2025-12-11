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

import React from 'react';
import { Box, Text, useInput } from 'ink';
import { SLASH_COMMANDS, MAX_CONTEXT_TOKENS } from '../constants/index.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StatsDisplay({
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
export function HistoryDisplay({
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
export function ExportSuccess({
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
export function HelpDisplay({
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