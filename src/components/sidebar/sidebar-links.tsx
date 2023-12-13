/* eslint-disable */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { IUser } from '~/interfaces/user';

export function SidebarLinks(props: {
  user: IUser;
  routes: RoutesType[];
}) {

  let location = useLocation();
  let activeColor = useColorModeValue('gray.700', 'white');
  let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
  let activeIcon = useColorModeValue('brand.900', 'brand.500');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.900', 'brand.500');

  const { routes, user } = props;

  const activeRoute = (routeName: string) => {
    return location.pathname === routeName;
  };

  const createLinks = (
    routes: RoutesType[],
  ) => {
    return routes.map(
      (
        route: RoutesType,
        index: number
      ) => {
        if (user && route.roles.includes(user.role)) {
          return (
            <Link key={index} to={route.path}>
              {route.icon ? (
                <Box>
                  <HStack
                    spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
                    py='5px'
                    ps='10px'>
                    <Flex w='100%' alignItems='center' justifyContent='center'>
                      <Box
                        color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
                        me='18px'>
                        {route.icon}
                      </Box>
                      <Text
                        me='auto'
                        color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                        fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h='36px'
                      w='4px'
                      bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
                      borderRadius='5px'
                    />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
                    py='5px'
                    ps='10px'>
                    <Text
                      me='auto'
                      color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
                      fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
                      {route.name}
                    </Text>
                    <Box h='36px' w='4px' bg='yellow.400' borderRadius='5px' />
                  </HStack>
                </Box>
              )}
            </Link>
          )
        }
      }
    );
  };
  //  BRAND
  return <>{createLinks(routes)}</>
}

export default SidebarLinks;