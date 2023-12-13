// libraries
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Flex, Icon, Skeleton, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdStar } from 'react-icons/md'

// components
import DashboardLayout from '~/components/layout'

import { endpoints } from '~/services/api'
import { IUser } from '~/interfaces/user'
import { caseInsensitiveSort } from '~/utils/functions'
import Panel from '~/components/panel'
import DataTable from 'react-data-table-component'

const UsersListPage = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  // use effects
  useEffect(() => {
    async function loadUsers() {
      const response = await axios.get(endpoints.users.getUsersAll)
      setUsers(response.data)
    }
    try {
      loadUsers()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, []);

  function handleRole(role: string) {
    switch (role) {
      case 'admin':
        return {
          text: 'Administrator',
          icon: MdStar,
          color: 'brand.900'
        }
      case 'customer':
        return {
          text: 'Cliente',
          icon: MdPerson,
          color: 'green.500'
        }
    }
  }

  const columns = [
    {
      cell: (row: IUser) => (
        <Avatar size='xs' name={row.name} src={row.avatar} />
      ),
      sortable: false,
      sortFunction: caseInsensitiveSort,
      ignoreRowClick: true,
      width: '50px',
    },
    {
      name: 'Usuário',
      selector: (row: IUser) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: IUser) => row.email,
      sortable: true,
    },
    {
      name: 'Função',
      cell: (row: IUser) => (
        <Flex align='center'>
          <Icon
            w='24px'
            h='24px'
            me='5px'
            color={handleRole(row.role)?.color}
            as={handleRole(row.role)?.icon}
          />
          <Text color={"#1A202C"} fontSize='sm' fontWeight='700'>
            {handleRole(row.role)?.text}
          </Text>
        </Flex>
      ),
      sortable: true,
    },
    {
      cell: (row: IUser) => (
        <Button onClick={() => navigate(`/usuarios/${row.id}`)}>Ver</Button>
      ),
      sortable: false,
      sortFunction: caseInsensitiveSort,
      ignoreRowClick: true,
    },
  ]

  // main
  return (
    <>
      <DashboardLayout screenTitle="Usuários" actions={
        <Button colorScheme='brand' variant='solid' onClick={() => navigate('/usuarios/novo')}>
          Novo Usuário
        </Button>
      }>
        <Panel heading="Usuários do Sistema">
          {isLoading && (
            <Stack mx='20px' my='20px'>
              <Skeleton height='20px' isLoaded={!isLoading} />
              <Skeleton height='20px' isLoaded={!isLoading} />
              <Skeleton height='20px' isLoaded={!isLoading} />
            </Stack>
          )}
          {users &&
            (
              <DataTable
                columns={columns}
                noDataComponent="Nenhuma informação encontrada."
                pagination={true}
                paginationPerPage={10}
                striped={true}
                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todos' }}
                data={users} />
            )}
        </Panel>
      </DashboardLayout>
    </>
  )
};

export default UsersListPage