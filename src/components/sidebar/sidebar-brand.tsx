import React from 'react';
import { Flex } from '@chakra-ui/react';

import { Logo } from '~/components/logo';

export function SidebarBrand() {

  return (
    <Flex alignItems='center' flexDirection='column'>
      <Logo />
      <Flex h='1px' w='100%' bg='rgba(135, 140, 189, 0.3)' mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;