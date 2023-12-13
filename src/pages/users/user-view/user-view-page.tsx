/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Image, Skeleton, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoTrashBin } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { IUser } from '~/interfaces/user';

import DashboardLayout from '~/components/layout'
import { H3 } from '~/components/typography';
import Panel from '~/components/panel';

import { endpoints } from '~/services/api';

const UserViewPage = () => {
  const { userId } = useParams()

  const [user, setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const navigate = useNavigate()
  // use effects
  useEffect(() => {
    async function loadUser() {
      const response = await axios.get(endpoints.users.getUser(parseInt(userId)))
      setUser(response.data)
    }
    try {
      loadUser()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, []);

  const deleteUser = async (id: number) => {
    setIsLoading(true)
    try {
      await axios.delete(endpoints.users.deleteUser(id));
      toast({
        title: `Usuário deletado com sucesso!`,
        status: 'success',
        isClosable: true,
      })
      setIsLoading(false)
      return navigate('/usuarios')
    } catch (error) {
      setIsLoading(false)
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    }
  };

  // renders
  function RenderUserInfo(title: string, content: any) {
    return (
      <div>
        <H3 size="1.1rem">{title}</H3>
        <Skeleton height='fit-content' isLoaded={!isLoading}>
          <span>{content || ''}</span>
        </Skeleton>
      </div>
    )
  }

  function RenderUserDetails() {
    return (
      <>
        <Flex direction='column' gap="20px">
          <Panel heading="Informações do Usuário" padding='26px'>
            <Flex direction='row' gap='20px'>
              <Image boxSize='150px' src={user.avatar} borderRadius='full' alt={user.name} />
              <Flex direction='column'>
                {RenderUserInfo('Nome:', user.name)}
                {RenderUserInfo('Email:', user?.email)}
                {RenderUserInfo('Função:', user?.role)}
              </Flex>
            </Flex>
          </Panel>
        </Flex>

        <Flex direction='row' gap='20px'>
          <Button leftIcon={<MdEdit />} colorScheme='brand' variant='solid' onClick={() => navigate(`/usuarios/${userId}/editar`)}>
            Editar
          </Button>
          <Button rightIcon={<IoTrashBin />} colorScheme='brand' variant='outline' onClick={onOpen}>
            Deletar Usuário
          </Button>
        </Flex>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Apagar Usuário
              </AlertDialogHeader>

              <AlertDialogBody>
                Você tem certeza? Não será possível reverter esta ação
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={() => deleteUser(user.id)} ml={3}>
                  Deletar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  return (
    <DashboardLayout screenTitle={!isLoading && user?.name}>
      <Flex direction='column' gap='20px'>
        {user && RenderUserDetails()}
      </Flex>

    </DashboardLayout>
  )
}

export default UserViewPage