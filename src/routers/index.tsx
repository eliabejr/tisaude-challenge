import { Icon } from '@chakra-ui/react';
import React from 'react';
import { MdAllInbox, MdFileCopy, MdPeople } from 'react-icons/md';

const adminRoutes = [
  {
    name: 'Produtos',
    roles: ['admin', 'customer'],
    group: 'Administrativo',
    path: '/produtos',
    icon: <Icon as={MdAllInbox} width='20px' height='20px' color='inherit' />,
  },
  {
    name: 'Usuários',
    roles: ['admin'],
    group: 'Administrativo',
    path: '/usuarios',
    icon: <Icon as={MdPeople} width='20px' height='20px' color='inherit' />,
  },
  {
    name: 'Arquivos',
    roles: ['admin', 'customer'],
    group: 'Administrativo',
    path: '/upload',
    icon: <Icon as={MdFileCopy} width='20px' height='20px' color='inherit' />,
  },
]

const routes = [
  ...adminRoutes,
];

export default routes;