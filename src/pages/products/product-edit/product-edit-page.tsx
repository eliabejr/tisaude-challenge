/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Select, Textarea, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardLayout from '~/components/layout'
import Panel from '~/components/panel';

import { IProductDTO, IProductCategory, IProduct } from '~/interfaces/product';
import { endpoints } from '~/services/api';
import { MdAdd } from 'react-icons/md';

const ProductEditPage = () => {
  const { productId } = useParams()

  const initialState: IProduct = {
    id: 0,
    title: '',
    price: 0,
    category: null,
    description: ''
  }

  const [productInfo, setProductInfo] = useState<IProduct>(initialState)
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

  useEffect(() => {
    async function loadProduct() {
      const response = await axios.get(endpoints.products.getProduct(parseInt(productId)))
      setProductInfo(response.data)
    }
    try {
      loadProduct()
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
      title: productInfo.title,
      price: productInfo.price,
      categoryId: productInfo.category.id,
      description: productInfo.description,
    }
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    setIsLoading(true)

    try {
      const response = await axios.put(endpoints.products.putProduct(productInfo.id), body, config);
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
  };

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
      isLoading

    return disabled
  }


  return (
    <DashboardLayout screenTitle='Editar Produto'>
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
              <Select size='md' placeholder='Categoria do produto' name='categoryId' onChange={handleSelect} value={productInfo?.category?.id}>
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
            {isLoading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </Box>
      </Flex>

    </DashboardLayout>
  )
}

export default ProductEditPage