import { FC } from "react";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";

export type SquareProps = {
  id: string
  color: 'black' | 'white',
}


const Wrapper = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background-color: ${props => props.color === 'white' ? 'bisque' : 'darkgray'};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Square: FC<SquareProps> = ({ color, id, children }) => {

  const { isOver, setNodeRef } = useDroppable({ id: id, data: { something: id } });

  const style = {
    border: isOver ? '3px solid green' : "none",
  };

  return (
    <div ref={setNodeRef}>
      <Wrapper color={color} key={id} style={style}>
        {children}
      </Wrapper>
    </div>

  )
}
