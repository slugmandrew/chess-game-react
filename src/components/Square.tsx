import React, { FC } from 'react'
import styled from 'styled-components'
import { useDroppable } from '@dnd-kit/core'

export type SquareProps = {
  id: string
  color: 'black' | 'white'
  x: number
  y: number
  validMove: boolean
}

const Wrapper = styled.div<{ color: string; isOver: boolean; validMove: boolean }>`
  width: 56px;
  height: 56px;
  background-color: ${(props) => (props.validMove ? 'lightgreen' : props.color === 'white' ? 'bisque' : 'darkgray')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.isOver ? '2px solid red' : '2px solid transparent')};
}
`

export const Square: FC<SquareProps> = ({ color, id, validMove, children, x, y }) => {
  const { isOver, setNodeRef } = useDroppable({ id: id, data: { something: id } })

  return (
    <Wrapper ref={setNodeRef} color={color} key={id} isOver={isOver} validMove={validMove}>
      {children}
    </Wrapper>
  )
}
