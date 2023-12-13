import styled from 'styled-components'

import { border, colors, sizes } from '~/utils/theme'

// interfaces
interface ContainerButtonDropdownInterface {
  isPress: boolean;
}

interface ContainerDropdownInterface {
  visible: boolean,
  index?: string,
}

export const DashboardWrapper = styled.div`
  background-color: ${colors.lightful};
  display: flex;
  flex-direction: row;
  min-height: ${sizes.fullHeight};
  overflow: hidden;
  width: ${sizes.full};
`

export const DashboardPanelWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  width: 100%;

  @media (max-width: 960px) {
    padding: ${sizes.s4};
    width: 100vw;
    height: 90vh;
  }
`

export const DashboardContentWrapper = styled.div`
  padding: ${sizes.s8};
`

export const DashboardNavWrapper = styled.nav`
  background-color: transparent;
  border-width: 0;
  border-bottom-width: ${border.sm};
  border-color: ${colors.light100};
  border-style: solid;
  color: ${colors.lightful};
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 100%;
  z-index: 1;
`

export const DashboardMenuWrapper = styled.aside`
  background-color: ${colors.darkful};
  color: ${colors.lightful};
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 350px;
  z-index: 10;

  @media (max-width: 960px) {
    flex-direction: row;
    max-width: 100%;
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
`

export const LogoWrapper = styled.div`
  display: flex;
  padding: ${sizes.s4};
  margin-left: ${sizes.s4};
  margin-top: 1rem;

  & img {
    height: auto;
    width: 180px;
  }

  @media (max-width: 960px) {
    justify-content: center;
    display: none;
  }
`
export const ContainerDropdownMenu = styled.div`
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 20px;

    & .icon-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: #FFF;
      background-color: ${colors.primary};
      border: none;
      outline: none;
      border-radius: 50%;
      cursor: pointer;

      .icon-button__badge {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 25px;
        height: 25px;
        background: red;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }
`;



export const ContainerIconPerson = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
`;

export const ContainerLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const ContainerDropdown = styled.div<ContainerDropdownInterface>`
    top: 46px;
    right: 0px;
    position: absolute;
    width: 200px;
    border-radius: 2px;
    background-color: ${colors.lightful};
    z-index: ${(props) => props.index};

    // animation fadeinout
    animation: ${(props) => (props.visible ? 'fadein 0.2s linear forwards' : 'fadeout 0.2s linear forwards')};
    opacity: 0;

    @keyframes fadein {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    @keyframes fadeout {
        0% { opacity: ${(props) => (props.visible ? 1 : 0)}; }
        100% { opacity: 0; }
    }
`;

export const ContainerButtonDropdown = styled.div<ContainerButtonDropdownInterface>`
    padding: 16px;
    cursor: ${(props) => (props.isPress ? 'pointer' : 'auto')};

    &:hover {
        background-color: ${(props) => (props.isPress ? colors.light150 : colors.lightful)};
    }
`;

export const Item = styled.li`
  color: #353535;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  list-style: none;
  border-radius: 15px;
  transition: all ease 500ms;
  cursor: pointer;

  & > div {
    padding: 10px;
  }

  &:hover{
    background: rgba(255, 191, 58, 0.85); //#F1F6FC //light100 // // 
  }
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  box-shadow: 0px 2px 2px 1px #F1F1F1;
  width: auto;
  height: auto;
  background-color: #FFF;
  border-radius: 8px;
  position: absolute;
  top: 10%;
  right: 4%;
  z-index: 100;
  padding: 20px;
  gap: 15px;
  cursor: auto;
  z-index: 999;
`

export const Title = styled.h3`
  color: #353535;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
`

export const Description = styled.p`
  color: #353535;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  margin-top: 5px;
`
