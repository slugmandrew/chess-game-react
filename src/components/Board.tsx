import React, { useReducer } from "react";
import { Square } from "./Square";
import styled from "styled-components";
import { PieceType } from "./PieceType";
import { Piece, PieceProps } from "./Piece";
import { PieceColor } from "./PieceColor";
import { Action } from "./Action";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

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
  currentPlayer: 'white'
}
type State = {
  pieces: Array<Array<PieceProps | undefined>>,
  currentPlayer: 'black' | 'white'
}

const reducer = (state: State, action: Action): State => {

  switch (action.type) {
    case "start":
      return state
    case "move":

      console.log("PIECE LOCATION", action.pieceId)
      console.log("DESTINATION", action.destinationId)

      let [pieceX, pieceY]: number[] = action.pieceId.split("-").map(s => parseInt(s))
      console.log("pieceX", pieceX)
      console.log("pieceY", pieceY)
      let pieceBeingMoved = state.pieces[pieceX][pieceY]
      console.log("Piece being moved", pieceBeingMoved)

      if (action.destinationId) {
        let [destX, destY]: number[] = action.destinationId?.split("-").map(s => parseInt(s))
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
      }

      return state // default return same state

    case "reset":
      return state

  }

};

const keygen = (x: number, y: number, str: string) => {
  return `${str}-${(x + (y * 8))}`;
}


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 800px;
`


export const Board = () => {

  const [state, dispatch] = useReducer(reducer, initialState)


  function handleDragStart() {

  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log("Active?", active)
    console.log("Over?", over)

    // dispatch({
    //   type: 'move',
    //   pieceId: event.,
    //   destinationId: destination?.droppableId
    // })

  }

  function handleDragCancel() {

  }

  const renderSquare = (x: number, y: number) => {
    const black = (x + y) % 2 === 1 // determine the colour of this square
    const piece = state.pieces[x][y] // grab the piece
    return (
      <Square color={black ? 'black' : 'white'} key={keygen(x, y, "square")}>
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
    > <Wrapper>
      {squares}
    </Wrapper>

    </DndContext>
  )
}
