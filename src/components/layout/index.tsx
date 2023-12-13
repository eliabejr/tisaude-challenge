import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import Sidebar from '~/components/sidebar';

import routes from '~/routers';

export default function DashboardLayout(props: any) {
  const { children, actions, ...rest } = props;

  return (
    <Box>
      <Sidebar routes={routes} {...rest} />
      <Box
        float='right'
        minHeight='100vh'
        height='100%'
        overflow='auto'
        position='relative'
        maxHeight='100%'
        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
        transitionDuration='.2s, .2s, .35s'
        transitionProperty='top, bottom, width'
        transitionTimingFunction='linear, linear, ease'>


        <Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='10px' backgroundColor='#f9fafb'>
          <Flex direction='row' justifyContent='space-between'>
            <Text
              mb='30px'
              borderRadius='inherit'
              fontWeight='bold'
              fontSize='34px'
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent'
              }}
              _focus={{
                boxShadow: 'none'
              }}>
              {props.screenTitle}
            </Text>

            <Flex direction='row' gap='10px'>
              {actions}
            </Flex>
          </Flex>

          {children}
        </Box>
      </Box>
    </Box>
  );
}