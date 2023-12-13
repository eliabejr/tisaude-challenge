/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Select, Textarea, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '~/components/layout'
import Panel from '~/components/panel';

import { IProductDTO, IProductCategory } from '~/interfaces/product';
import { endpoints } from '~/services/api';
import { MdAdd } from 'react-icons/md';

const ProductNewPage = () => {

  const initialState: IProductDTO = {
    title: '',
    price: 0,
    categoryId: 0,
    description: ''
  }

  const [productInfo, setProductInfo] = useState<IProductDTO>(initialState)
  const [categories, setCategories] = useState<IProductCategory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toast = useToast()

  const navigate = useNavigate()

  useEffect(() => {
    async function loadCategories() {
      const response = await axios.get(endpoints.categories.getCategoriesAll)
      setCategories(response.data)
    }
    try {
      loadCategories()
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
    const body: IProductDTO = {
      ...productInfo,
      images: [
        'https://wp.pt.aleteia.org/wp-content/uploads/sites/5/2016/08/neymar-100-jesus.jpg'
      ]
    }
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    setIsLoading(true)

    try {
      const response = await axios.post(endpoints.products.postProduct, body, config);
      toast({
        title: 'Produto criado!',
        status: 'success',
        isClosable: true,
      })
      setIsLoading(false)
      return navigate(`/produtos/${response.data?.id}`)
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
    setProductInfo({
      ...productInfo, [event.target.name]: event.target.value
    })
  }

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    setProductInfo({
      ...productInfo, [event.target.name]: event.target.value
    })
  }

  const handleDescription: React.ChangeEventHandler<HTMLTextAreaElement> = async (event) => {
    setProductInfo({
      ...productInfo, [event.target.name]: event.target.value
    })
  }

  function disableButton() {
    const disabled =
      productInfo.title.length < 1 ||
      productInfo.description.length < 1 ||
      productInfo.price < 0 ||
      productInfo.categoryId === 0
    isLoading

    return disabled
  }


  return (
    <DashboardLayout screenTitle='Novo produto'>
      <Flex direction='column' gap='20px'>
        <Panel heading="Informações do Produto" padding='25px'>
          <Flex direction='column' gap='10px'>
            <Flex direction='row' gap='20px'>
              <InputGroup>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Nome do produto...'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name="title"
                  onChange={handleChange}
                  value={productInfo.title} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  color='gray.300'
                  fontSize='1.2em'
                  children='$'
                />
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='number'
                  placeholder='0,00'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  name='price'
                  onChange={handleChange}
                  value={productInfo.price} />
              </InputGroup>
            </Flex>

            <Flex direction='row' gap='20px'>
              <Select size='md' placeholder='Categoria do produto' name='categoryId' onChange={handleSelect}> °
                {categories.map((category) => {
                  return (
                    <option label={category.name} key={`${category.name}-${category.id}`} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </Select>
            </Flex>

            <Flex mt='5'>
              <Textarea
                value={productInfo.description}
                onChange={handleDescription}
                name='description'
                placeholder='Descrição do produto'
                size='md'
              />
            </Flex>
          </Flex>
        </Panel>

        <Box>
          <Button leftIcon={<MdAdd />} colorScheme='brand' variant='solid' onClick={submitAction} disabled={disableButton()}>
            {isLoading ? 'Publicando...' : 'Publicar produto'}
          </Button>
        </Box>
      </Flex>

    </DashboardLayout>
  )
}

export default ProductNewPage