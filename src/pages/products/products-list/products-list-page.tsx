// libraries
import React, { useEffect, useState } from 'react'
import { Button, Flex, Input, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Skeleton } from '@chakra-ui/react'
import axios from 'axios'

// components
import DashboardLayout from '~/components/layout'
import ProductCard from '~/components/product-card'

import { endpoints } from '~/services/api'
import { IProduct, IProductCategory, IProductOptions } from '~/interfaces/product'
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@chakra-ui/icons'

const ProductsList = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<IProductCategory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [options, setOptions] = useState<IProductOptions>()

  const navigate = useNavigate()

  // use effects
  useEffect(() => {
    let url = endpoints.products.getProductsAll

    if (options) {
      const params = {
        price: options.price && `price=${options.price}`,
        title: options.title && `title=${options.title}`,
        price_min: options.price_min && `price_min=${options.price_min}`,
        price_max: options.price_max && `price_max=${options.price_max}`,
        categoryId: options.categoryId && `categoryId=${options.categoryId}`,
      }

      const join_params = [params.price, params.title, params.price_min, params.price_max, params.categoryId].filter(Boolean).join("&");
      url = `${endpoints.products.getProductsAll}?${join_params}`
    }

    async function loadProducts() {
      const response = await axios.get(url)
      setProducts(response.data)
    }

    try {
      loadProducts()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [options]);

  useEffect(() => {
    async function loadCategories() {
      const response = await axios.get(endpoints.categories.getCategoriesAll)
      setCategories(response.data)
    }
    try {
      loadCategories()
    } catch (error) {
      console.log(error)
    }
  }, []);

  const handleFilter = async (
    param: 'price' | 'title' | 'price_min' | 'price_max' | 'categoryId',
    value: any
  ) => {
    setOptions({
      ...options, [param]: value
    })
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    setOptions({
      ...options, [event.target.name]: parseFloat(event.target.value)
    })
  }

  // main
  return (
    <>
      <DashboardLayout screenTitle="Todos os produtos" actions={
        <Flex direction='row' gap='10px'>
          {/* categoria */}
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                  {'Categoria'}
                </MenuButton>
                <MenuList>
                  {categories.map((category) => {
                    return (
                      <MenuItem key={`${category.name}-${category.id}`} value={category.name} onClick={() => handleFilter('categoryId', category.id)}>
                        {category.name}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </>
            )}
          </Menu>

          {/* preço */}
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                  {'Preço'}
                </MenuButton>
                <MenuList padding={2}>
                  <Input placeholder='0,00' size='md' onChange={handleChange} name='price' value={options?.price || 0} />
                </MenuList>
              </>
            )}
          </Menu>

          {/* preço mínimo */}
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                  {'Preço Min.'}
                </MenuButton>
                <MenuList padding={2}>
                  <Input placeholder='0,00' size='md' onChange={handleChange} name='price_min' value={options?.price_min || 0} />
                </MenuList>
              </>
            )}
          </Menu>

          {/* preço máximo */}
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                  {'Preço Max.'}
                </MenuButton>
                <MenuList padding={2}>
                  <Input placeholder='0,00' size='md' onChange={handleChange} name='price_max' value={options?.price_max || 0} />
                </MenuList>
              </>
            )}
          </Menu>
          <Button colorScheme='brand' variant='solid' onClick={() => navigate('/produtos/novo')}>
            Novo Produto
          </Button>
        </Flex>
      }>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, '2xl': 6 }} gap='20px' mb='20px'>
          {products && products.map((product) => {

            return (
              <Skeleton isLoaded={!isLoading}>
                <ProductCard images={product.images} id={product.id} title={product.title} price={product.price} category={product.category} description={product.description} />
              </Skeleton>
            )
          })}
        </SimpleGrid>
      </DashboardLayout>
    </>
  )
};

export default ProductsList