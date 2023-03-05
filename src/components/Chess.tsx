import React, { useReducer } from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { Active, DndContext, DragEndEvent, DragStartEvent, Over } from '@dnd-kit/core'
import { Button } from 'primereact/button'
import { Board } from './Board'
import { PieceProps } from './Piece'
import { PieceColor } from './PieceColor'
import { piecesList } from '../Constants'
import { PieceType } from './PieceType'

type Action =
  | { type: 'start' }
  | { type: 'move'; payload: { active: Active; over: Over } }
  | { type: 'reset' }
  | { type: 'setActivePiece'; payload: { active: Active } }
  | { type: 'clearActivePiece' }

export type State = {
  pieces: Array<Array<PieceProps | undefined>>
  graveyard: Array<PieceProps>
  currentPlayer: PieceColor
  movingPiece: PieceProps | null
  validMoves: boolean[][]
}

function setupBoard(): PieceProps[][] {
  const pieces: PieceProps[][] = Array(8)
    .fill(0)
    .map((x) => Array(8).fill(0))
  piecesList.forEach((piece) => {
    pieces[piece.x][piece.y] = {
      color: piece.color,
      id: piece.id,
      type: piece.type,
      x: piece.x,
      y: piece.y,
    }
  })
  return pieces
}

const resetArray = () =>
  Array(8)
    .fill(false)
    .map((x) => Array(8).fill(false))

const { Black, White } = PieceColor

const initialState: State = {
  pieces: setupBoard(),
  graveyard: [],
  currentPlayer: White,
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
    let isBlack = piece.color === Black
    const operator = isBlack ? plus : minus

    const inRange = (pos: number) => {
      return pos >= 0 && pos < 8
    }

    const assessSquare = (x: number, y: number, mustKill = false, canKill = true, onSquareEmpty?: Function, onSquareOccupied?: Function) => {
      if (inRange(x) && inRange(y)) {
        const targetPiece = state.pieces[x][y]
        console.log('targetPiece', targetPiece)
        if (targetPiece) {
          console.log(`Path is blocked by ${targetPiece.color} ${targetPiece.type}, stopping`)
          validMoves[x][y] = piece.color === targetPiece.color ? false : canKill
          if (onSquareOccupied) onSquareOccupied()
        } else {
          validMoves[x][y] = !mustKill
          if (onSquareEmpty) onSquareEmpty()
        }
      }
    }

    const performKnightJump = (incrementX: 1 | -1 | 2 | -2, incrementY: 1 | -1 | 2 | -2) => {
      // newX and newY are the shifted coordinates
      let newX = operator(x, incrementX)
      let newY = operator(y, incrementY)

      assessSquare(newX, newY)
    }

    const walkDiagonalPath = (incrementX: 1 | -1, incrementY: 1 | -1, limit: 1 | 7, mustKill = false) => {
      let pathIsClear = true

      // newX and newY are the shifted coordinates
      let newX = operator(x, incrementX)
      let newY = operator(y, incrementY)
      let squaresTravelled = 0

      while (pathIsClear && squaresTravelled < limit) {
        squaresTravelled++

        assessSquare(
          newX,
          newY,
          mustKill,
          true,
          () => {
            newX = operator(newX, incrementX)
            newY = operator(newY, incrementY)
          },
          () => (pathIsClear = false),
        )
      }
    }

    // pass in the axis and whether to increment / decrement, as well as a distance limit
    const walkStraightPath = (axisIn: 'x' | 'y', direction: 1 | -1, limit: 1 | 2 | 7, canKill = true) => {
      let pathIsClear = true
      const isX = axisIn === 'x'
      const axis = isX ? x : y

      // newVar is the shifted coordinate
      let newVar = operator(axis, direction)
      let squaresTravelled = 0

      // while no piece is in the way, and we are still on the board
      while (pathIsClear && squaresTravelled < limit) {
        squaresTravelled++
        const newX = isX ? newVar : x
        const newY = !isX ? newVar : y

        assessSquare(
          newX,
          newY,
          false,
          canKill,
          () => (newVar = operator(newVar, direction)),
          () => (pathIsClear = false),
        )
      }
    }

    function walkAllDiagonals(distance: 1 | 7) {
      walkDiagonalPath(1, 1, distance)
      walkDiagonalPath(1, -1, distance)
      walkDiagonalPath(-1, 1, distance)
      walkDiagonalPath(-1, -1, distance)
    }

    function walkAllStraights(distance: 1 | 2 | 7) {
      walkStraightPath('x', 1, distance)
      walkStraightPath('x', -1, distance)
      walkStraightPath('y', 1, distance)
      walkStraightPath('y', -1, distance)
    }

    // calculate moves based on piece type
    switch (piece.type) {
      case PieceType.King:
        // King can walk in any direction for one square
        walkAllStraights(1)
        walkAllDiagonals(1)

        break
      case PieceType.Queen:
        // Queen can walk in any direction for an unlimited number of squares
        walkAllDiagonals(7)
        walkAllStraights(7)

        break
      case PieceType.Bishop:
        // Bishop can walk diagonally for any number of squares
        walkAllDiagonals(7)

        break
      case PieceType.Knight:
        performKnightJump(1, 2)
        performKnightJump(1, -2)
        performKnightJump(2, 1)
        performKnightJump(2, -1)
        performKnightJump(-1, -2)
        performKnightJump(-1, 2)
        performKnightJump(-2, 1)
        performKnightJump(-2, -1)

        break
      case PieceType.Rook:
        // Rook can walk in a straight line for an unlimited number of squares
        walkAllStraights(7)
        // Rook can also castle

        // am I in my original position?

        // and is the King in his original position?

        // is the King in check?

        // can the king move two squares towards me?

        break
      case PieceType.Pawn: {
        // Pawn can move two squares in front if not attacking
        walkStraightPath('x', 1, 2, false)
        // ... and can kill on its two forward diagonals
        walkDiagonalPath(1, 1, 1, true)
        walkDiagonalPath(1, -1, 1, true)

        break
      }
    }

    return validMoves
  }

  /**
   * Augment the state object by rotating the player
   */
  const stateWithNewPlayer: (state: State) => State = (state: State) => ({
    ...state,
    currentPlayer: state.currentPlayer === Black ? White : Black,
  })

  switch (action.type) {
    case 'start': {
      let newBoard = setupBoard()
      console.log('newBoard', newBoard)
      return { ...state, pieces: newBoard, currentPlayer: White }
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
            return stateWithNewPlayer({
              ...state,
              pieces: newPieces,
              validMoves: resetArray(),
            })
          } else {
            if (pieceInDestination.color !== activePiece.color) {
              activePiece.x = destX
              activePiece.y = destY

              // now move the piece
              let newPieces = state.pieces.slice()
              newPieces[destX][destY] = activePiece
              newPieces[x][y] = undefined

              // add the old piece to the graveyard
              return stateWithNewPlayer({
                ...state,
                pieces: newPieces,
                validMoves: resetArray(),
                graveyard: [...state.graveyard, pieceInDestination],
              })
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

export const Chess = () => {
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

  return (
    <AnimateSharedLayout>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
        <div className="p-d-flex p-flex-column p-align-center">
          <div className="p-mb-2">
            <h1>Chess Game</h1>
          </div>
          <div className="p-mb-2">
            <Board {...state} />
          </div>
          <div className="p-mb-2">
            <Button onClick={() => dispatch({ type: 'start' })}>Reset</Button>
          </div>
        </div>

        <div className="p-d-flex p-flex-column p-align-center">
          <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }}>
            I am in a div
          </motion.div>
          <p>
            <strong>Current Player:</strong> {state.currentPlayer}
          </p>
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
                          [{index}, {sIndex}]{'  '}
                        </>
                      )
                  })}
                </>
              )
            })}
          </div>
          <p>
            <strong>Graveyard:</strong>
          </p>
          <div>
            {state.graveyard.map((item, index) => {
              return (
                <>
                  [{item.color} {item.type}]{'  '}
                </>
              )
            })}
          </div>
        </div>
      </DndContext>
    </AnimateSharedLayout>
  )
}
