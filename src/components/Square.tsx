import {FC, ReactChildren} from "react";
import styled from "styled-components";

export type SquareProps = {
  color: 'black' | 'white'
}


const Wrapper = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  border: 1px solid ${props => props.color};
  background-color: ${props => props.color}
`

export const Square: FC<SquareProps> = ({color, children}) => {

  return (
      <Wrapper color={color}>
        {children}
      </Wrapper>
  )
}
