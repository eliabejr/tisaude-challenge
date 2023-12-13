/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import axios from 'axios';
import { Box, Button, Flex, Input, Image, InputGroup, Select, useToast, Icon, InputRightElement } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdOutlineRemoveRedEye } from 'react-icons/md';

import DashboardLayout from '~/components/layout'
import Panel from '~/components/panel';

import { endpoints } from '~/services/api';
import { IUserDTO } from '~/interfaces/user';
import { RiEyeCloseLine } from 'react-icons/ri';

const UserNewPage = () => {

  const initialState: IUserDTO = {
    name: '',
    email: '',
    avatar: '',
    password: ''
  }

  const [userInfo, setUserInfo] = useState<IUserDTO>(initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const toast = useToast()

  const navigate = useNavigate()

  // functions
  const submitAction = async () => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    setIsLoading(true)

    try {
      const response = await axios.post(endpoints.users.postUser, userInfo, config);
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

  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    setUserInfo({
      ...userInfo, [event.target.name]: event.target.value
    })
  }

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    setUserInfo({
      ...userInfo, [event.target.name]: event.target.value
    })
  }

  function disableButton() {
    const disabled =
      userInfo.name.length < 1 ||
      userInfo.email.length < 1 ||
      userInfo.password.length < 3 ||
      isLoading

    return disabled
  }


  return (
    <DashboardLayout screenTitle='Novo usuário'>
      <Flex direction='column' gap='20px'>
        <Panel heading="Informações do Usuário" padding='25px'>
          <Flex direction='row' gap='20px'>
            <Image boxSize='150px' src={userInfo.avatar === '' ? 'https://placehold.co/150x150' : userInfo.avatar} borderRadius='full' alt={userInfo.name} />
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
                    value={userInfo.name} />
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
                    value={userInfo.email} />
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
                    value={userInfo.password} />
                  <InputRightElement display='flex' alignItems='center' mt='4px'>
                    <Icon
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>

                <Select size='md' placeholder='Função no sistema' name='role' onChange={handleSelect} value={userInfo.role}>
                  <option label={'Administrador'} key={`admin`} value={'admin'}>
                    Administrador
                  </option>
                  <option label={'Cliente'} key={`customer`} value={'customer'}>
                    Cliente
                  </option>
                </Select>
              </Flex>

              <InputGroup>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Avatar'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name="avatar"
                  onChange={handleChange}
                  value={userInfo.avatar} />
              </InputGroup>
            </Flex>
          </Flex>
        </Panel>

        <Box>
          <Button leftIcon={<MdAdd />} colorScheme='brand' variant='solid' onClick={submitAction} disabled={disableButton()}>
            {isLoading ? 'Criando...' : 'Criar usuário'}
          </Button>
        </Box>
      </Flex>

    </DashboardLayout>
  )
}

export default UserNewPage