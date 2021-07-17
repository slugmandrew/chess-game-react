import { FC } from "react";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";

export type SquareProps = {
  color: 'black' | 'white',
  key: string
}


const Wrapper = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color === 'white' ? 'bisque' : 'darkgray'};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Square: FC<SquareProps> = ({ color, key, children }) => {

  const { setNodeRef } = useDroppable({ id: key });

  return (
    <Wrapper color={color} key={key} ref={setNodeRef}>
      {children}
    </Wrapper>
  )
}
