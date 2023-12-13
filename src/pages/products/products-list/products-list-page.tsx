// libraries
import React, { useEffect, useState } from 'react'
import { Button, SimpleGrid, Skeleton } from '@chakra-ui/react'
import axios from 'axios'

// components
import DashboardLayout from '~/components/layout'
import ProductCard from '~/components/product-card'

import { endpoints } from '~/services/api'
import { IProduct } from '~/interfaces/product'
import { useNavigate } from 'react-router-dom'

const ProductsList = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  // use effects
  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get(endpoints.products.getProductsAll)
      setProducts(response.data)
    }
    try {
      loadProducts()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, []);

  // main
  return (
    <>
      <DashboardLayout screenTitle="Todos os produtos" actions={
        <Button colorScheme='brand' variant='solid' onClick={() => navigate('/produtos/novo')}>
          Novo Produto
        </Button>
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