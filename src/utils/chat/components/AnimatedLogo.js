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
import { ADOBE_LOGO, COMMERCE_TEXT } from '../constants/index.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AnimatedLogo({
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