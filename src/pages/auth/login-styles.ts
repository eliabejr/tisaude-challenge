import styled from 'styled-components'

import { colors, sizes } from '~/utils/theme'
import bgLogin from '~/assets/bg-login-tisaude-challenge.jpg'

export const LoginPageWrapper = styled.section`
  align-items: center;
  background-image: url(${bgLogin});
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${sizes.fullHeight};
  width: ${sizes.full};
`

export const SideArea = styled.aside`
  background-size: cover;
  display: flex;
  opacity: 0.2;

  @media (max-width: 960px) {
    height: ${sizes.fullHeight};
    width: ${sizes.full};
  }
`

export const LoginArea = styled.aside`
  background-color: ${colors.light100};
  border-radius: 10px;
  color: ${colors.dark500};
  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  justify-content: center;
  padding: 3em;
  min-width: 320px;
  max-width: 500px;
  width: 30%;
  

  @media (max-width: 960px) {
    width: 90%;
    margin: ${sizes.s8};
    padding: ${sizes.s8};
    position: absolute;
  }
`
