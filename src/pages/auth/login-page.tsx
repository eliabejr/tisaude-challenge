import { useContext, useState } from 'react'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "~/guards/context";

import { colors } from '~/utils/theme'

import bgLogin from '~/assets/bg-login-tisaude-challenge.jpg'
import { ILogin } from '~/interfaces/auth';

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import React from 'react';

const LoginPage = () => {
  const loginInfo: ILogin = {
    email: '',
    password: ''
  }
  const { signin } = useContext(AuthContext);

  const navigate = useNavigate()
  const toast = useToast()

  const [info, setInfo] = useState<ILogin>(loginInfo);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // theme
  const textColor = useColorModeValue("brand.800", "white");
  const textColorSecondary = "gray.400";

  const handleClick = () => setShow(!show);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  }

  const handleLogin = () => {
    setErrorLogin(null);
    setLoading(true);

    signin(info.email, info.password)
      .then(() => {
        navigate('/produtos');
      })
      .catch(function (error) {
        if (error.response?.status === 401) {
          setErrorLogin('Senha incorreta');
        } else if (error.response) {
          setErrorLogin('Ocorreu um erro, tente fazer login novamente.');
        } else {
          setErrorLogin('Ocorreu um erro, tente fazer login novamente.');
        }
        toast({
          title: errorLogin,
          status: 'error',
          isClosable: true,
        })
        setLoading(false);
      });
  }

  return (
    <>
      <Flex position='relative' h='max-content'>
        <Flex
          h={{
            sm: 'initial',
            md: 'unset',
            lg: '90vh',
            xl: '90vh'
          }}
          w='100%'
          maxW={{ md: '66%', lg: '1313px' }}
          mx='auto'
          pt={{ sm: '50px', md: '0px' }}
          px={{ lg: '30px', xl: '0px' }}
          ps={{ xl: '70px' }}
          justifyContent='start'
          direction='column'>
          <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w='100%'
            mx={{ base: "auto", lg: "0px" }}
            me='auto'
            h='100%'
            alignItems='start'
            justifyContent='center'
            mb={{ base: "30px", md: "60px" }}
            px={{ base: "25px", md: "0px" }}
            mt={{ base: "40px", md: "14vh" }}
            flexDirection='column'>
            <Box me='auto'>
              <Heading color={textColor} fontSize='36px' mb='10px'>
                Entrar
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Faça login para visualizar as informações
              </Text>
            </Box>
            <Flex
              zIndex='2'
              direction='column'
              w={{ base: "100%", md: "420px" }}
              maxW='100%'
              background='transparent'
              borderRadius='15px'
              mx={{ base: "auto", lg: "unset" }}
              me='auto'
              mb={{ base: "20px", md: "auto" }}>
              <FormControl>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Email<Text color={colors.primary}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='email'
                  placeholder='user@mail.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name="email"
                  onChange={handleChange}
                  value={info.email}
                />
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'>
                  Password<Text color={colors.primary}>*</Text>
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Min. 8 characters'
                    mb='24px'
                    size='lg'
                    type={show ? "text" : "password"}
                    variant='auth'
                    name="password"
                    onChange={handleChange}
                    value={info.password}
                  />
                  <InputRightElement display='flex' alignItems='center' mt='4px'>
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent='space-between' align='center' mb='24px'>
                  <FormControl display='flex' alignItems='center'>
                    <Checkbox
                      id='remember-login'
                      colorScheme='brandScheme'
                      me='10px'
                    />
                    <FormLabel
                      htmlFor='remember-login'
                      mb='0'
                      fontWeight='normal'
                      color={textColor}
                      fontSize='sm'>
                      Mantenha-me conectado
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Button
                  onClick={handleLogin}
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'>
                  {loading ? 'Carregando' : 'Entrar'}
                </Button>
              </FormControl>
            </Flex>
            <Box
              display={{ base: 'none', md: 'block' }}
              h='100%'
              minH='100vh'
              w={{ lg: '50vw', '2xl': '44vw' }}
              position='absolute'
              right='0px'>
              <Flex
                bg={`url(${bgLogin})`}
                justify='center'
                align='end'
                w='100%'
                h='100%'
                bgSize='cover'
                bgPosition='50%'
                position='absolute'
                borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default LoginPage
