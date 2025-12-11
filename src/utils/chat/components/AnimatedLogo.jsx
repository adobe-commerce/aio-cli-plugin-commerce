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
import Gradient from 'ink-gradient'
import { ADOBE_LOGO, COMMERCE_TEXT } from '../constants/index.js'

// Adobe Red gradient - from deep red to lighter red/coral
const ADOBE_GRADIENT = ['#ED1C24', '#FF4D4D', '#ED1C24']
// Commerce gradient - subtle red to magenta
const COMMERCE_GRADIENT = ['#ED1C24', '#CC0066']

// Helper to get logo lines
const getAdobeLines = () => ADOBE_LOGO.split('\n').filter(line => line.trim())
const getCommerceLines = () => COMMERCE_TEXT.split('\n').filter(line => line.trim())

// Static logo component (shown after animation or as header)
export function Logo ({ compact = false }) {
  const adobeLines = getAdobeLines()
  const commerceLines = getCommerceLines()

  if (compact) {
    // Compact version for header - just show first line
    return (
      <Box flexDirection="column" alignItems="center">
        <Gradient colors={ADOBE_GRADIENT}>
          {adobeLines[0]}
        </Gradient>
      </Box>
    )
  }

  // Join lines with newlines for Gradient (which wraps in Text)
  const adobeText = adobeLines.join('\n')
  const commerceText = commerceLines.join('\n')

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Gradient colors={ADOBE_GRADIENT}>
        {adobeText}
      </Gradient>
      <Box marginTop={1}>
        <Gradient colors={COMMERCE_GRADIENT}>
          {commerceText}
        </Gradient>
      </Box>
      <Box marginTop={1}>
        <Text color="gray" italic>Docs Chat - Powered by AI</Text>
      </Box>
    </Box>
  )
}

// Animated logo component (shown on startup)
export function AnimatedLogo ({ onComplete }) {
  const [frame, setFrame] = useState(0)
  const [showCommerce, setShowCommerce] = useState(false)
  const [fadeIn, setFadeIn] = useState(0)

  const adobeLines = getAdobeLines()
  const commerceLines = getCommerceLines()

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

  // Join visible lines with newlines for Gradient
  const visibleAdobeText = adobeLines.slice(0, frame).join('\n')
  const visibleCommerceText = commerceLines.slice(0, fadeIn).join('\n')

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      {frame > 0 && (
        <Gradient colors={ADOBE_GRADIENT}>
          {visibleAdobeText}
        </Gradient>
      )}
      {showCommerce && fadeIn > 0 && (
        <Box marginTop={1}>
          <Gradient colors={COMMERCE_GRADIENT}>
            {visibleCommerceText}
          </Gradient>
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

