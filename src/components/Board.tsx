import React, { FC } from 'react'
import styled from 'styled-components'
import { Square } from './Square'
import { Piece, PieceProps } from './Piece'
import { Draggable } from './Draggable'
import { State } from './Chess'
import { Grid, SimpleGrid } from '@mantine/core'

const BoardOuter = styled.div`
  display: block;
  overflow: clip;
  width: 480px;
  height: 480px;
`

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const keygen = (x: number, y: number, str: string) => {
  return `${str}-${x}-${y}`
}

export const Board: FC<State> = ({ pieces, validMoves, currentPlayer }) => {
  const renderSquare = (x: number, y: number) => {
    const black = (x + y) % 2 === 1 // determine the colour of this square
    const piece = pieces[x][y] // grab the piece
    // console.log('got piece: ', piece)
    let id = keygen(x, y, 'square')
    return (
      <Square key={id} color={black ? 'black' : 'white'} id={id} x={x} y={y} validMove={validMoves[x][y]}>
        {piece ? (
          currentPlayer === piece?.color ? (
            <Draggable id={piece.id}>
              <Piece key={piece.id} {...piece} />
            </Draggable>
          ) : (
            <Piece key={piece.id} {...piece} />
          )
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

  return (
    <SimpleGrid style={{ width: 480, height: 480 }} spacing={0} cols={8}>
      {squares}
    </SimpleGrid>
  )
}
