/* eslint-disable react/require-default-props */
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

import Card from './card'

interface PanelProps {
  heading?: string | React.ReactNode
  subheading?: string
  padding?: string,
  children: React.ReactNode
}

const Panel: React.FC<PanelProps> = ({ heading, subheading, children, padding }) => {
  const textColor = useColorModeValue('#1A202C', 'white');
  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' mb="8px" justifyContent='space-between' direction='column'>
        {!heading ? null : (
          <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
            {heading}
          </Text>
        )}
        {!subheading ? null : (
          <Text color={textColor} fontSize='14px' fontWeight='400' lineHeight='100%'>
            {subheading}
          </Text>
        )}
      </Flex>
      <Box px={padding || '0px'} py={padding || '0px'}>{children}</Box>
    </Card>

  )
}

export default Panel