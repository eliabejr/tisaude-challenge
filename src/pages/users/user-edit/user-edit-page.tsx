/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, Flex, Icon, Input, InputGroup, InputRightElement, Select, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardLayout from '~/components/layout'
import Panel from '~/components/panel';

import { IUserDTO, IUser } from '~/interfaces/user';
import { endpoints } from '~/services/api';
import { MdAdd, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

const UserEditPage = () => {
  const { productId } = useParams()

  const initialState: IUser = {
    id: 0,
    name: '',
    email: '',
    role: 'customer',
    password: '',
    avatar: ''
  }

  const [user, setUser] = useState<IUser>(initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const toast = useToast()

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      const response = await axios.get(endpoints.users.getUser(parseInt(productId)))
      setUser(response.data)
    }
    try {
      loadUser()
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    }
  }, []);


  // functions
  const submitAction = async () => {
    const body: IUserDTO = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      avatar: user.avatar,
    }
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    setIsLoading(true)

    try {
      const response = await axios.put(endpoints.users.putUser(user.id), body, config);
      toast({
        title: 'Usuário criado!',
        status: 'success',
        isClosable: true,
      })
      setIsLoading(false)
      return navigate(`/usuarios/${response.data?.id}`)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    setUser({
      ...user, [event.target.name]: event.target.value
    })
  }

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    setUser({
      ...user, [event.target.name]: event.target.value
    })
  }

  function disableButton() {
    const disabled =
      user.name.length < 1 ||
      user.email.length < 1 ||
      user.password.length < 3 ||
      isLoading

    return disabled
  }


  return (
    <DashboardLayout screenTitle={`Editar ${user?.name}`}>
      <Flex direction='column' gap='20px'>
        <Panel heading="Informações do Usuário" padding='25px'>
          <Flex direction='column' gap='10px'>
            <Flex direction='row' gap='20px'>
              <InputGroup>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Nome do Usuário'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name="name"
                  onChange={handleChange}
                  value={user.name} />
              </InputGroup>

              <InputGroup>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='email'
                  placeholder='Email'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name="email"
                  onChange={handleChange}
                  value={user.email} />
              </InputGroup>
            </Flex>

            <Flex direction='row' gap='20px'>
              <InputGroup>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='password'
                  placeholder='Senha'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name="password"
                  onChange={handleChange}
                  value={user.password} />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>

              <Select size='md' placeholder='Função no sistema' name='role' onChange={handleSelect} value={user.role}>
                <option label={'Administrador'} key={`admin`} value={'admin'}>
                  Administrador
                </option>
                <option label={'Cliente'} key={`customer`} value={'customer'}>
                  Cliente
                </option>
              </Select>
            </Flex>
          </Flex>
        </Panel>

        <Box>
          <Button leftIcon={<MdAdd />} colorScheme='brand' variant='solid' onClick={submitAction} disabled={disableButton()}>
            {isLoading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </Box>
      </Flex>

    </DashboardLayout>
  )
}

export default UserEditPage