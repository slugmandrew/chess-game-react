import React, { useReducer } from "react";
import { Square } from "./Square";
import styled from "styled-components";
import { Piece, PieceProps } from "./Piece";
import { Active, DndContext, DragEndEvent, DragStartEvent, Over } from "@dnd-kit/core";
import { Col, Row } from "reactstrap";
import { piecesList } from "../Constants";


type Action =
  | { type: 'start' }
  | { type: 'move', payload: { active: Active, over: Over } }
  | { type: 'reset' }
  | { type: "setActivePiece", payload: { active: Active } }
  | { type: "clearActivePiece" }

type State = {
  pieces: Array<Array<PieceProps | undefined>>,
  currentPlayer: 'black' | 'white'
  movingPiece: PieceProps | null
}

function setupBoard(): PieceProps[][] {
  const pieces: PieceProps[][] = Array(8).fill(0).map(x => Array(8).fill(0))
  piecesList.forEach(piece => pieces[piece.x][piece.y] = piece)
  return pieces
}

const initialState: State = {
  pieces: setupBoard(),
  currentPlayer: 'white',
  movingPiece: null
}

const reducer = (state: State, action: Action): State => {

    const getPiece = (pieceId: string) => state.pieces.reduce<PieceProps | undefined>((acc, current) => {
      return acc ?? current.find((cell) => cell?.id === pieceId);
    }, undefined);

    switch (action.type) {
      case "start": {
        return state
      }
      case "move": {
        const { active, over } = action.payload


        const activePiece = getPiece(active.id)

        if (activePiece) {

          let { x, y } = activePiece

          console.log("Active Piece", activePiece)

          const split = over.id.split("-")

          console.log(split)

          const destX = parseInt(split[1])
          const destY = parseInt(split[2])

          const pieceInDestination: PieceProps | undefined = state.pieces[destX][destY]
          console.log("Piece in destination", pieceInDestination)


          // if we are moving to a blank square
          if (!pieceInDestination) {
            let newPieces = state.pieces.slice()
            newPieces[destX][destY] = state.pieces[x][y]
            newPieces[x][y] = undefined
            return {
              ...state,
              pieces: newPieces
            }
          }

        }


        return state // default return same state}
      }
      case "reset": {
        return state
      }

      case "setActivePiece": {

        const pieceId = action.payload.active.id

        const piece = getPiece(pieceId)

        if (piece)
          return { ...state, movingPiece: piece }
        else
          return state
      }
      case "clearActivePiece": {
        return { ...state, movingPiece: null }
      }

    }

  }
;

const keygen = (x: number, y: number, str: string) => {
  return `${str}-${(x + (y * 8))}`;
}

const keygen2 = (x: number, y: number, str: string) => {
  return `${str}-${x}-${y}`;
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

    console.log("Start (active)", active)

    dispatch({ type: "setActivePiece", payload: { active } })

  }


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log("Active?", active)
    console.log("Over?", over)

    if (over) {
      dispatch({
        type: 'move',
        payload: { active, over }
      })
    }

    dispatch({ type: "clearActivePiece" })

  }

  function handleDragCancel() {

  }

  const renderSquare = (x: number, y: number) => {
    const black = (x + y) % 2 === 1 // determine the colour of this square
    const piece = state.pieces[x][y] // grab the piece
    return (
      <Square color={black ? 'black' : 'white'} id={keygen2(x, y, "square")} x={x} y={y}>
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
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >

      <Row>
        <Col className={'d-flex justify-content-center'}>
          <BoardWrapper>
            {squares}
          </BoardWrapper>
        </Col>
      </Row>
      <Row>
        <Col>
          <p><strong>Moving Piece:</strong> {state.movingPiece ? state.movingPiece?.id : "None"}</p>
          <p><strong>From X, Y:</strong> {state.movingPiece ? state.movingPiece?.x + ", " + state.movingPiece.y : "None"}</p>
        </Col>
      </Row>


    </DndContext>
  )
}
