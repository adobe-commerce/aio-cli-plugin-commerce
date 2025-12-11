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

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StreamingIndicator() {
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
export function CompactingIndicator() {
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