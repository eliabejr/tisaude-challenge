// chakra imports
import React from 'react';
import { Box, Flex, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';

//   Custom components
import Brand from './sidebar-brand';
import Links from './sidebar-links';
import { useAuth } from '~/guards/context';
import { IUser } from '~/interfaces/user';

// FUNCTIONS

function SidebarContent(props: { user: IUser, routes: RoutesType[] }) {
  const { routes, user } = props;
  const { signout } = useAuth();
  const textColor = useColorModeValue('secondaryGray.500', 'white');
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mt='8px' mb='auto'>
        <Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
          <Links user={user} routes={routes} />
        </Box>
      </Stack>
      <Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
        <HStack
          onClick={() => signout()}
          spacing={'26px'}
          py='5px'
          ps='10px'>
          <Flex w='100%' alignItems='center' justifyContent='center'>
            <Box
              color={'red.500'}
              me='18px'>
              <Icon as={MdLogout} width='20px' height='20px' color='inherit' />
            </Box>
            <Text
              me='auto'
              color={textColor}
              fontWeight={'normal'}>
              Sair
            </Text>
          </Flex>
          <Box
            h='36px'
            w='4px'
            bg={'transparent'}
            borderRadius='5px'
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default SidebarContent;