import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Image, useColorModeValue, Badge, Button } from '@chakra-ui/react';
import { MdVisibility } from 'react-icons/md';

import { formatBRL } from '~/utils/currency';
import { IProduct } from '~/interfaces/product';

const ProductCard = ({ id, images, title, price, category, description }: IProduct) => {
  const background = useColorModeValue('white', 'transparent');
  const navigate = useNavigate();

  return (
    <Box key={`Product-${title}-${id}`} borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor={background}>
      <Image src={images[0]} alt={title} />

      <Box p='6'>
        <Box
          mb='3'
          fontWeight='semibold'
          as='h2'
          lineHeight='tight'
          noOfLines={1}
        >
          {title}
        </Box>

        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='purple'>
            {category.name}
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            ml='2'
          >
            {formatBRL.format(price)}
          </Box>
        </Box>

        <Box
          mt='3'
          mb='4'
          lineHeight='tight'
          noOfLines={1}
        >
          {description}
        </Box>

        <Button onClick={() => navigate(`/produtos/${id}`)} leftIcon={<MdVisibility />} colorScheme='brand' variant='solid' isFullWidth>
          Ver detalhes
        </Button>

      </Box>
    </Box>
  )
}

export default ProductCard