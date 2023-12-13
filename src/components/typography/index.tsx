import styled from 'styled-components'
import { font } from '~/utils/theme'

interface HeadingProps {
  size?: string,
  color?: string,
  weight?: string,
  transform?: string,
}

export const H1 = styled.h1<HeadingProps>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  font-family: ${font.family.default};
  font-size: ${(props) => (props.size ? props.size : font.sizes.xl)};
  font-weight: ${(props) => (props.weight ? props.weight : font.weight.black)};
  letter-spacing: -.025rem;
  text-transform: ${(props) => props.transform || 'inherit'};
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export const H2 = styled.h2<HeadingProps>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  font-family: ${font.family.default};
  font-size: ${(props) => (props.size ? props.size : font.sizes.lg)};
  font-weight: ${(props) => (props.weight ? props.weight : font.weight.bold)};
  text-transform: ${(props) => props.transform || 'inherit'};
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export const H3 = styled.h3<HeadingProps>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  font-family: ${font.family.default};
  font-size: ${(props) => (props.size ? props.size : font.sizes.md)};
  font-weight: ${(props) => (props.weight ? props.weight : font.weight.bold)};
  letter-spacing: -.025rem;
  text-transform: ${(props) => props.transform || 'inherit'};
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export const H4 = styled.h4<HeadingProps>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  font-family: ${font.family.default};
  font-size: ${(props) => (props.size ? props.size : font.sizes.sm)};
  font-weight: ${(props) => (props.weight ? props.weight : font.weight.semiBold)};
  letter-spacing: -.025rem;
  text-transform: ${(props) => props.transform || 'inherit'};
  overflow-wrap: anywhere;
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;


`

export const H5 = styled.h1<HeadingProps>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  font-family: ${font.family.default};
  font-size: ${(props) => (props.size ? props.size : font.sizes.minimun)};
  font-weight: ${(props) => (props.weight ? props.weight : font.weight.thin)};
`

interface TextProps {
  size?: string,
  color?: string,
  weight?: string,
  transform?: string,
  lineHeight?: string,
  opacity?: string,
}

export const Text = styled.span<TextProps>`
  color: ${(props) => props.size || 'inherit'};
  font-family: ${font.family.default};
  font-size: ${(props) => props.size || font.sizes.regular};
  font-weight: ${(props) => props.weight || font.weight.regular};
  letter-spacing: -.025rem;
  line-height: ${(props) => props.lineHeight || '1.2'};
  text-transform: ${(props) => props.transform || 'inherit'};
  opacity: ${(props) => props.opacity};
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

`
interface ContainerLegendInterface {
  color: string,
}

export const ContainerLegend = styled.div<ContainerLegendInterface>`
    width: 20px;
    height: 10px;
    background-color: ${(props) => props.color};
`;