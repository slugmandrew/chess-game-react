import React, { useReducer } from "react";
import { Square } from "./Square";
import styled from "styled-components";
import { PieceType } from "./PieceType";
import { Piece, PieceProps, PieceWithPositionProps } from "./Piece";
import { PieceColor } from "./PieceColor";
import { Active, DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Col, Container, Row } from "reactstrap";

const { Knight, Pawn, Bishop, Rook, Queen, King } = PieceType;
const { Black, White } = PieceColor;

// Black Team
const BlackRook1: PieceProps = { id: "BRK1", color: Black, type: Rook }
const BlackRook2: PieceProps = { id: "BRK2", color: Black, type: Rook }
const BlackKnight1: PieceProps = { id: "BKT1", color: Black, type: Knight }
const BlackKnight2: PieceProps = { id: "BKT2", color: Black, type: Knight }
const BlackBishop1: PieceProps = { id: "BBP1", color: Black, type: Bishop }
const BlackBishop2: PieceProps = { id: "BBP2", color: Black, type: Bishop }
const BlackKing: PieceProps = { id: "BKG", color: Black, type: King }
const BlackQueen: PieceProps = { id: "BQN", color: Black, type: Queen }
const BlackPawn1: PieceProps = { id: "BP1", color: Black, type: Pawn }
const BlackPawn2: PieceProps = { id: "BP2", color: Black, type: Pawn }
const BlackPawn3: PieceProps = { id: "BP3", color: Black, type: Pawn }
const BlackPawn4: PieceProps = { id: "BP4", color: Black, type: Pawn }
const BlackPawn5: PieceProps = { id: "BP5", color: Black, type: Pawn }
const BlackPawn6: PieceProps = { id: "BP6", color: Black, type: Pawn }
const BlackPawn7: PieceProps = { id: "BP7", color: Black, type: Pawn }
const BlackPawn8: PieceProps = { id: "BP8", color: Black, type: Pawn }

// White Team
const WhiteRook1: PieceProps = { id: "WRK1", color: White, type: Rook }
const WhiteRook2: PieceProps = { id: "WRK2", color: White, type: Rook }
const WhiteKnight1: PieceProps = { id: "WKT1", color: White, type: Knight }
const WhiteKnight2: PieceProps = { id: "WKT2", color: White, type: Knight }
const WhiteBishop1: PieceProps = { id: "WBP1", color: White, type: Bishop }
const WhiteBishop2: PieceProps = { id: "WBP2", color: White, type: Bishop }
const WhiteKing: PieceProps = { id: "WKG", color: White, type: King }
const WhiteQueen: PieceProps = { id: "WQN", color: White, type: Queen }
const WhitePawn1: PieceProps = { id: "WP1", color: White, type: Pawn }
const WhitePawn2: PieceProps = { id: "WP2", color: White, type: Pawn }
const WhitePawn3: PieceProps = { id: "WP3", color: White, type: Pawn }
const WhitePawn4: PieceProps = { id: "WP4", color: White, type: Pawn }
const WhitePawn5: PieceProps = { id: "WP5", color: White, type: Pawn }
const WhitePawn6: PieceProps = { id: "WP6", color: White, type: Pawn }
const WhitePawn7: PieceProps = { id: "WP7", color: White, type: Pawn }
const WhitePawn8: PieceProps = { id: "WP8", color: White, type: Pawn }

type Action =
  | { type: 'start' }
  | { type: 'move', pieceX: number, pieceY: number, destX: number, destY: number }
  | { type: 'reset' }
  | { type: "setActivePiece", payload: Active }
  | { type: "clearActivePiece" }

type State = {
  pieces: Array<Array<PieceProps | undefined>>,
  currentPlayer: 'black' | 'white'
  movingPiece: PieceProps | null
}

const initialState: State = {
  pieces: [
    [BlackRook1, BlackKnight1, BlackBishop1, BlackQueen, BlackKing, BlackBishop2, BlackKnight2, BlackRook2],
    [BlackPawn1, BlackPawn2, BlackPawn3, BlackPawn4, BlackPawn5, BlackPawn6, BlackPawn7, BlackPawn8],
    [],
    [],
    [],
    [],
    [WhitePawn1, WhitePawn2, WhitePawn3, WhitePawn4, WhitePawn5, WhitePawn6, WhitePawn7, WhitePawn8],
    [WhiteRook1, WhiteKnight1, WhiteBishop1, WhiteQueen, WhiteKing, WhiteBishop2, WhiteKnight2, WhiteRook2],
  ],
  currentPlayer: 'white',
  movingPiece: null
}

const reducer = (state: State, action: Action): State => {

    switch (action.type) {
      case "start": {
        return state
      }
      case "move": {
        const { pieceX, pieceY, destX, destY } = action

        console.log("pieceX", pieceX)
        console.log("pieceY", pieceY)

        let pieceInDestination: PieceProps | undefined = state.pieces[destX][destY]
        console.log("Piece in destination", pieceInDestination)

        /// if we are moving to a blank square
        if (!pieceInDestination) {
          let newPieces = state.pieces.slice()
          newPieces[destX][destY] = state.pieces[pieceX][pieceY]
          newPieces[pieceX][pieceY] = undefined
          return {
            ...state,
            pieces: newPieces
          }
        }

        return state // default return same state}
      }
      case "reset": {
        return state
      }

      case "setActivePiece": {

        const pieceId = action.payload.id

        const piece = state.pieces.reduce<PieceProps | undefined>((acc, current) => {
          return acc ?? current.find((cell) => cell?.id === pieceId);
        }, undefined)

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

    dispatch({ type: "setActivePiece", payload: active })

  }


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log("Active?", active)
    console.log("Over?", over)

    if (over) {
      dispatch({
        type: 'start'
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
      <Square color={black ? 'black' : 'white'} id={keygen(x, y, "square")}>
        {piece ? <Piece x={x} y={y} {...piece} /> : <></>}
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

      <Container>
        <Row>
          <Col>
            <BoardWrapper>
              {squares}
            </BoardWrapper>
          </Col>
        </Row>
        <Row>
          <Col>
            <p><strong>Moving Piece:</strong> {state.movingPiece ? state.movingPiece?.id : "None"}</p>
          </Col>
        </Row>
      </Container>


    </DndContext>
  )
}
