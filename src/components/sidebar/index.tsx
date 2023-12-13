import React from 'react';

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import SidebarContent from './sidebar-content';

import { IoMenuOutline } from 'react-icons/io5';
import { IUser } from '~/interfaces/user';

function Sidebar(props: { user: IUser, routes: RoutesType[];[x: string]: any }) {
  const { routes, user } = props;

  let variantChange = '0.2s linear';
  let shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  let sidebarBg = useColorModeValue('white', 'blackAlpha.900');
  let sidebarMargins = '0px';

  return (
    <Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w='300px'
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}>
        <SidebarContent user={user} routes={routes} />
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props: { user: IUser, routes: RoutesType[] }) {
  let sidebarBackgroundColor = useColorModeValue('white', 'blackAlpha.800');
  let menuColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes, user } = props;

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClick={onClose}
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <SidebarContent user={user} routes={routes} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;