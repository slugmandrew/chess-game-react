import React, { useReducer } from 'react'
import { Square } from './Square'
import styled from 'styled-components'
import { Piece, PieceProps } from './Piece'
import { Active, DndContext, DragEndEvent, DragStartEvent, Over } from '@dnd-kit/core'
import { Col, Row } from 'reactstrap'
import { piecesList } from '../Constants'
import { PieceType } from './PieceType'
import { PieceColor } from './PieceColor'

type Action = { type: 'start' } | { type: 'move'; payload: { active: Active; over: Over } } | { type: 'reset' } | { type: 'setActivePiece'; payload: { active: Active } } | { type: 'clearActivePiece' }

type State = {
  pieces: Array<Array<PieceProps | undefined>>
  currentPlayer: 'black' | 'white'
  movingPiece: PieceProps | null
  validMoves: boolean[][]
}

type Position = {
  x: number
  y: number
}

const PositionImpl: (x: number, y: number) => void = (x: number, y: number) => {
  if (x < 0 || x > 8) throw new Error(`The value of X was outside the accepted range: [${x}]`)
  if (y < 0 || y > 8) throw new Error(`The value of Y was outside the accepted range: [${y}]`)
}

function setupBoard(): PieceProps[][] {
  const pieces: PieceProps[][] = Array(8)
    .fill(0)
    .map((x) => Array(8).fill(0))
  piecesList.forEach((piece) => (pieces[piece.x][piece.y] = piece))
  return pieces
}

const resetArray = () =>
  Array(8)
    .fill(false)
    .map((x) => Array(8).fill(false))

const initialState: State = {
  pieces: setupBoard(),
  currentPlayer: 'white',
  movingPiece: null,
  validMoves: resetArray(),
}

const plus = (a: number, b: number) => a + b
const minus = (a: number, b: number) => a - b

const reducer = (state: State, action: Action): State => {
  const getPiece = (pieceId: string) =>
    state.pieces.reduce<PieceProps | undefined>((acc, current) => {
      return acc ?? current.find((cell) => cell?.id === pieceId)
    }, undefined)

  const getValidMoves: (piece: PieceProps) => Array<Array<boolean>> = (piece: PieceProps) => {
    let validMoves = resetArray()

    // grab the coordinates
    const { x, y } = piece
    console.log(`Piece is at [${x},${y}]`)

    // choose which way to go
    const operator = piece.color === PieceColor.Black ? plus : minus

    // pass in the axis and whether to increment / decrement
    const walkStraightPath = (axisIn: 'x' | 'y', direction: 1 | -1, limit: 1 | 7) => {
      let pathIsClear = true
      const isX = axisIn === 'x'
      const isY = axisIn === 'y'
      const axis = isX ? x : y

      // newVar is the shifted coordinate
      let newVar = operator(axis, direction)
      let count = 0

      // while no piece is in the way, and we are still on the board
      while (pathIsClear && newVar >= 0 && newVar < 8 && count < limit) {
        count++
        // whether to increment each dimension of the array
        const chosenX = isX ? newVar : x
        const chosenY = isY ? newVar : y
        // detect existing piece so we stop walking
        const pieceAlreadyThere = state.pieces[chosenX][chosenY]
        console.log('pieceAlreadyThere', pieceAlreadyThere)
        if (pieceAlreadyThere) {
          validMoves[chosenX][chosenY] = true
          pathIsClear = false
        } else {
          validMoves[chosenX][chosenY] = true
          newVar = operator(newVar, direction)
        }
      }
    }

    // calculate moves based on piece type
    switch (piece.type) {
      case PieceType.King:
        // King can walk in any direction for one square
        walkStraightPath('x', 1, 1)
        walkStraightPath('x', -1, 1)
        walkStraightPath('y', 1, 1)
        walkStraightPath('y', -1, 1)

        break
      case PieceType.Queen:
        break
      case PieceType.Bishop:
        break
      case PieceType.Knight:
        break
      case PieceType.Rook:
        // Rook can walk both axes in both directions for an unlimited number of squares
        walkStraightPath('x', 1, 7)
        walkStraightPath('x', -1, 7)
        walkStraightPath('y', 1, 7)
        walkStraightPath('y', -1, 7)

        break
      case PieceType.Pawn: {
        // the two squares in front
        validMoves[operator(x, 1)][y] = true
        validMoves[operator(x, 2)][y] = true

        // the two diagonals
        validMoves[operator(x, 1)][operator(y, 1)] = true
        validMoves[operator(x, 1)][operator(y, -1)] = true

        break
      }
    }

    return validMoves
  }

  switch (action.type) {
    case 'start': {
      return state
    }
    case 'move': {
      const { active, over } = action.payload

      const activePiece = getPiece(active.id)

      if (activePiece) {
        let { x, y } = activePiece

        console.log('Active Piece', activePiece)

        const split = over.id.split('-')

        console.log(split)

        const destX = parseInt(split[1])
        const destY = parseInt(split[2])

        const pieceInDestination: PieceProps | undefined = state.pieces[destX][destY]
        console.log('Piece in destination', pieceInDestination)

        const validMoves = getValidMoves(activePiece)

        if (validMoves[destX][destY]) {
          // if we are moving to a blank square
          if (!pieceInDestination) {
            // first make the piece aware of it's new coordinates
            activePiece.x = destX
            activePiece.y = destY

            // now move the piece
            let newPieces = state.pieces.slice()
            newPieces[destX][destY] = activePiece
            newPieces[x][y] = undefined
            return {
              ...state,
              pieces: newPieces,
              validMoves: resetArray(),
            }
          }
        }
      }

      console.log('No action, returning same state')
      return state // default return same state
    }
    case 'reset': {
      return state
    }

    case 'setActivePiece': {
      const pieceId = action.payload.active.id

      const piece = getPiece(pieceId)

      if (piece) {
        const validMoves = getValidMoves(piece)

        return { ...state, movingPiece: piece, validMoves: validMoves }
      } else return state
    }
    case 'clearActivePiece': {
      return { ...state, movingPiece: null, validMoves: resetArray() }
    }
  }
}
const keygen: (x: number, y: number, str: string) => string = (x: number, y: number, str: string) => {
  return `${str}-${x + y * 8}`
}

const keygen2 = (x: number, y: number, str: string) => {
  return `${str}-${x}-${y}`
}

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 480px;
  height: 480px;
`

export const Board = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    console.log('Start (active)', active)

    dispatch({ type: 'setActivePiece', payload: { active } })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    console.log('Active?', active)
    console.log('Over?', over)

    if (over) {
      dispatch({
        type: 'move',
        payload: { active, over },
      })
    }

    dispatch({ type: 'clearActivePiece' })
  }

  function handleDragCancel() {}

  const renderSquare = (x: number, y: number) => {
    const black = (x + y) % 2 === 1 // determine the colour of this square
    const piece = state.pieces[x][y] // grab the piece
    return (
      <Square color={black ? 'black' : 'white'} id={keygen2(x, y, 'square')} x={x} y={y} validMove={state.validMoves[x][y]}>
        {piece ? <Piece {...piece} /> : <></>}
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
      <Row>
        <Col className={'d-flex justify-content-center'}>
          <BoardWrapper>{squares}</BoardWrapper>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>Moving Piece:</strong> {state.movingPiece ? state.movingPiece?.id : 'None'}
          </p>
          <p>
            <strong>From X, Y:</strong> {state.movingPiece ? state.movingPiece?.x + ', ' + state.movingPiece.y : 'None'}
          </p>
          <p>
            <strong>Valid Moves:</strong>
          </p>
          <div>
            {state.validMoves.map((items, index) => {
              return (
                <>
                  {items.map((subItem, sIndex) => {
                    if (subItem)
                      return (
                        <>
                          {' '}
                          [{index} , {sIndex}]{' '}
                        </>
                      )
                  })}
                </>
              )
            })}
          </div>
        </Col>
      </Row>
    </DndContext>
  )
}
