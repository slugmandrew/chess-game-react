import { FC, useState } from 'react'
import styled from 'styled-components'
import { useDroppable } from '@dnd-kit/core'
import { PieceProps } from './Piece'

export type SquareProps = {
  id: string
  color: 'black' | 'white'
  x: number
  y: number
  validMove: boolean
}

const Wrapper = styled.div<{ color: string; isOver: boolean; validMove: boolean }>`
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.validMove ? 'lightgreen' : props.color === 'white' ? 'bisque' : 'darkgray')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.isOver ? '2px solid red' : 'none')}
}
`

export const Square: FC<SquareProps> = ({ color, id, validMove, children, x, y }) => {
  const { isOver, setNodeRef, active } = useDroppable({ id: id, data: { something: id } })
  // const [moveAllowed, setMoveAllowed] = useState(false)

  // console.log("ActiveSquare", active)

  // if (active) {
  //   const pieceBeingMoved = pieces.reduce<PieceProps | undefined>((acc, current) => {
  //     return acc ?? current.find((cell) => cell?.id === active.id);
  //   }, undefined)
  //   if (pieceBeingMoved) {
  //     setMoveAllowed(x - pieceBeingMoved.x < 2)
  //   }
  // }

  return (
    <div ref={setNodeRef}>
      <Wrapper color={color} key={id} isOver={isOver} validMove={validMove}>
        {children}
      </Wrapper>
    </div>
  )
}
