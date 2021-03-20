import React, {useReducer} from "react";
import {Square} from "./Square";
import styled from "styled-components";
import {PieceType} from "./PieceType";
import {Piece, PieceProps} from "./Piece";
import {PieceColor} from "./PieceColor";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {Action} from "./Action";

const {Knight, Pawn, Bishop, Rook, Queen, King} = PieceType;
const {Black, White} = PieceColor;

// Black Team
const BlackRook: PieceProps = {color: Black, type: Rook}
const BlackKnight: PieceProps = {color: Black, type: Knight}
const BlackBishop: PieceProps = {color: Black, type: Bishop}
const BlackKing: PieceProps = {color: Black, type: King}
const BlackQueen: PieceProps = {color: Black, type: Queen}
const BlackPawn: PieceProps = {color: Black, type: Pawn}

// White Team
const WhiteRook: PieceProps = {color: White, type: Rook}
const WhiteKnight: PieceProps = {color: White, type: Knight}
const WhiteBishop: PieceProps = {color: White, type: Bishop}
const WhiteKing: PieceProps = {color: White, type: King}
const WhiteQueen: PieceProps = {color: White, type: Queen}
const WhitePawn: PieceProps = {color: White, type: Pawn}


const initialState: State = {
  pieces: [
    [BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook],
    [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],
    [],
    [],
    [],
    [],
    [WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],
    [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook],
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


  const renderSquare = (x: number, y: number) => {
    const black = (x + y) % 2 === 1
    const piece = state.pieces[x][y]
    return (
        <Droppable key={keygen(x, y, "square")} droppableId={`${x}-${y}`}>
          {(dropProvider, dropSnapshot) => {
            return (
                <div ref={dropProvider.innerRef}
                     {...dropProvider.droppableProps}>
                  <Square color={black ? 'black' : 'white'}>
                    {piece ?
                     <Draggable draggableId={`${piece.color}-${piece.type}-${y}`} index={0}>
                       {(dragProvider => (

                           <div ref={dragProvider.innerRef}
                                {...dragProvider.draggableProps}
                                {...dragProvider.dragHandleProps}>
                             <Piece {...piece} />
                           </div>
                       ))}
                     </Draggable>
                           : <></>}
                    {dropProvider.placeholder}
                  </Square>
                </div>

            )
          }}
        </Droppable>
    )
  }

  const squares = []
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      squares.push(renderSquare(x, y))
    }
  }

  const performDrag = (result: DropResult) => {
    const {draggableId, destination, reason, source} = result;

    console.log("ID", draggableId)
    console.log("dest", destination?.droppableId)
    console.log("source", source.droppableId)
    console.log("reason", reason)

    dispatch({
      type: 'move',
      pieceId: source.droppableId,
      destinationId: destination?.droppableId
    })


  };


  return (
      <DragDropContext onDragEnd={performDrag}>
        <Wrapper>
          {squares}
        </Wrapper>
      </DragDropContext>

  )
}
