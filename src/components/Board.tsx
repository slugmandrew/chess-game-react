import React, { FC } from 'react'
import styled from 'styled-components'
import { Square } from './Square'
import { Piece, PieceProps } from './Piece'
import { Draggable } from './Draggable'

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 480px;
  height: 480px;
`

const keygen = (x: number, y: number, str: string) => {
  return `${str}-${x}-${y}`
}

export const Board: FC<{ pieces: Array<Array<PieceProps | undefined>>; validMoves: boolean[][] }> = ({ pieces, validMoves }) => {
  console.log('got pieces: ', pieces)

  const renderSquare = (x: number, y: number) => {
    const black = (x + y) % 2 === 1 // determine the colour of this square
    const piece = pieces[x][y] // grab the piece
    console.log('got piece: ', piece)
    return (
      <Square color={black ? 'black' : 'white'} id={keygen(x, y, 'square')} x={x} y={y} validMove={validMoves[x][y]}>
        {piece ? (
          <>
            <Draggable id={piece.id}>
              <Piece {...piece} />
            </Draggable>
          </>
        ) : (
          <></>
        )}
      </Square>
    )
  }

  const squares = []
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      squares.push(renderSquare(x, y))
    }
  }

  return <BoardWrapper>{squares}</BoardWrapper>
}
