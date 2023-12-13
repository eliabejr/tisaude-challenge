import React from 'react'
import LogoWrapper from './logo-styles'

import { useColorModeValue } from '@chakra-ui/react'
import logoMono from '~/assets/logo-tisaude.png'
import logoMonoWhite from '~/assets/logo-tisaude-white.png'

export const Logo: React.FC = () => {
  const logoImg = useColorModeValue(logoMono, logoMonoWhite);
  return (
    <LogoWrapper src={logoImg} />
  )
}