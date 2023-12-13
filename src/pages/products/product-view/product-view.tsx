/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Image, SimpleGrid, Skeleton, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { lightFormat } from 'date-fns';
import { IoTrashBin } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

import DashboardLayout from '~/components/layout'
import { H3 } from '~/components/typography';
import Panel from '~/components/panel';

import { normalizeDate } from '~/utils/date';
import { IProduct } from '~/interfaces/product';
import { endpoints } from '~/services/api';
import { useAuth } from '~/guards/context';

const ProductViewPage = () => {
  const { productId } = useParams()
  const { user } = useAuth()

  const [product, setProduct] = useState<IProduct>()
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const navigate = useNavigate()
  // use effects
  useEffect(() => {
    async function loadProduct() {
      const response = await axios.get(endpoints.products.getProduct(parseInt(productId)))
      setProduct(response.data)
    }
    try {
      loadProduct()
      setIsLoading(false)
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
      setIsLoading(false)
    }
  }, []);

  const deleteProduct = async (id: number) => {
    setIsLoading(true)
    try {
      await axios.delete(endpoints.products.deleteProduct(id));
      toast({
        title: `Produto deletado com sucesso!`,
        status: 'success',
        isClosable: true,
      })
      setIsLoading(false)
      return navigate('/produtos')
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
  function RenderProductInfo(title: string, content: any) {
    return (
      <div>
        <H3 size="1.1rem">{title}</H3>
        <Skeleton height='fit-content' isLoaded={!isLoading}>
          <span>{content || ''}</span>
        </Skeleton>
      </div>
    )
  }

  function RenderProductDetails() {
    return (
      <>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, '2xl': 6 }} gap='0px' mb='20px'>

          {product && product.images.map((img, index) => {

            return (
              <Skeleton isLoaded={!isLoading}>
                <Image key={index} src={img} />
              </Skeleton>
            )
          })}
        </SimpleGrid>
        <Flex direction='column' gap="20px">
          <Panel heading="Informações do Produto" padding='26px'>
            <Flex direction='row'>
              <Flex direction='column'>
                {RenderProductInfo('Título:', product.title)}
                {RenderProductInfo('Categoria:', product?.category?.name)}
                {RenderProductInfo('Preço:', product?.price)}
                {RenderProductInfo('Criado em:', lightFormat(normalizeDate(product?.creationAt), 'dd/MM/yyyy hh:mm'))}
                {RenderProductInfo('Última atualização:', lightFormat(normalizeDate(product?.updatedAt), 'dd/MM/yyyy hh:mm'))}
              </Flex>
            </Flex>
          </Panel>
          <Panel heading='Descrição' padding='26px'>
            <Skeleton isLoaded={!isLoading}>
              <span>{product.description || ''}</span>
            </Skeleton>
          </Panel>
        </Flex>

        {user.role === 'admin' && (
          <Flex direction='row' gap='20px'>
            <Button leftIcon={<MdEdit />} colorScheme='brand' variant='solid' onClick={() => navigate(`/produtos/${productId}/editar`)}>
              Editar
            </Button>
            <Button rightIcon={<IoTrashBin />} colorScheme='brand' variant='outline' onClick={onOpen}>
              Deletar produto
            </Button>
          </Flex>
        )}

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Apagar produto
              </AlertDialogHeader>

              <AlertDialogBody>
                Você tem certeza? Não será possível reverter esta ação
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={() => deleteProduct(product.id)} ml={3}>
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
    <DashboardLayout screenTitle={!isLoading && product?.title}>
      <Flex direction='column' gap='20px'>
        {product && RenderProductDetails()}
      </Flex>

    </DashboardLayout>
  )
}

export default ProductViewPage