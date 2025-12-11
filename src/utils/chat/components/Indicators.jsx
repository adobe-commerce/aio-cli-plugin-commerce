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

import React, { useState, useEffect } from 'react'
import { Box, Text } from 'ink'

export function StreamingIndicator () {
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

export function CompactingIndicator () {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box paddingLeft={2} marginY={1}>
      <Text color="yellow" bold>🔄 Compacting context{dots}</Text>
    </Box>
  )
}

