import {FC} from "react";
import styled from "styled-components";

export type SquareProps = {
  color: 'black' | 'white',
  key?: number
}


const Wrapper = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color === 'white' ? 'bisque' : 'darkgray'};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Square: FC<SquareProps> = ({color, key, children}) => {

  return (
      <Wrapper color={color} key={key}>
        {children}
      </Wrapper>
  )
}
