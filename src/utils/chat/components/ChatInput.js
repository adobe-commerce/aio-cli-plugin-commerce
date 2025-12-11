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
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { SLASH_COMMANDS } from '../constants/index.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ChatInput({
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