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

import React from 'react'
import { Box, Text } from 'ink'
import { renderMarkdown } from '../utils/index.js'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
export function Message ({
  role,
  content,
  timestamp
}) {
  const isUser = role === 'user'
  const isSystem = role === 'system'
  if (isSystem) {
    return /* #__PURE__ */_jsx(Box, {
      marginY: 1,
      paddingX: 2,
      children: /* #__PURE__ */_jsx(Text, {
        color: 'yellow',
        italic: true,
        children: content
      })
    })
  }
  if (isUser) {
    return /* #__PURE__ */_jsx(Box, {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginY: 1,
      paddingX: 1,
      children: /* #__PURE__ */_jsxs(Box, {
        flexDirection: 'column',
        alignItems: 'flex-end',
        children: [/* #__PURE__ */_jsxs(Box, {
          marginBottom: 1,
          justifyContent: 'flex-end',
          children: [/* #__PURE__ */_jsx(Text, {
            color: 'cyan',
            bold: true,
            children: 'You'
          }), timestamp && /* #__PURE__ */_jsxs(Text, {
            color: 'gray',
            dimColor: true,
            children: [' \u2022 ', timestamp]
          })]
        }), /* #__PURE__ */_jsx(Box, {
          borderStyle: 'round',
          borderColor: 'cyan',
          paddingX: 2,
          paddingY: 1,
          justifyContent: 'flex-end',
          children: /* #__PURE__ */_jsx(Text, {
            align: 'right',
            children: content
          })
        })]
      })
    })
  }

  // Assistant message with markdown rendering
  const renderedContent = renderMarkdown(content)
  return /* #__PURE__ */_jsx(Box, {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginY: 1,
    paddingX: 1,
    children: /* #__PURE__ */_jsxs(Box, {
      flexDirection: 'column',
      alignItems: 'flex-start',
      flexBasis: '90%',
      children: [/* #__PURE__ */_jsxs(Box, {
        marginBottom: 1,
        children: [/* #__PURE__ */_jsx(Text, {
          color: 'magenta',
          bold: true,
          children: 'Adobe Commerce Docs'
        }), timestamp && /* #__PURE__ */_jsxs(Text, {
          color: 'gray',
          dimColor: true,
          children: [' \u2022 ', timestamp]
        })]
      }), /* #__PURE__ */_jsx(Box, {
        borderStyle: 'round',
        borderColor: 'magenta',
        paddingX: 2,
        paddingY: 1,
        children: /* #__PURE__ */_jsx(Text, {
          children: renderedContent
        })
      })]
    })
  })
}
