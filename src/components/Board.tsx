import React from "react";
import {Square} from "./Square";
import styled from "styled-components";
import {PieceType} from "./PieceType";
import {iconLookup, Piece, PieceProps} from "./Piece";
import {PieceColor} from "./PieceColor";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const {Knight, Pawn, Bishop, Rook, Queen, King} = PieceType;
const {Black, White} = PieceColor;


const BlackRook: PieceProps = {color: Black, type: Rook}
const BlackKnight: PieceProps = {color: Black, type: Knight}
const BlackBishop: PieceProps = {color: Black, type: Bishop}
const BlackKing: PieceProps = {color: Black, type: King}
const BlackQueen: PieceProps = {color: Black, type: Queen}
const BlackPawn: PieceProps = {color: Black, type: Pawn}

const WhiteRook: PieceProps = {color: White, type: Rook}
const WhiteKnight: PieceProps = {color: White, type: Knight}
const WhiteBishop: PieceProps = {color: White, type: Bishop}
const WhiteKing: PieceProps = {color: White, type: King}
const WhiteQueen: PieceProps = {color: White, type: Queen}
const WhitePawn: PieceProps = {color: White, type: Pawn}


const initialSetup: Array<Array<PieceProps>> = [
  [BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook],
  [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],
  [],
  [],
  [],
  [],
  [WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],
  [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook],
]

const keygen = (x: number, y: number, str: string) => {
  return `${str}-${(x + (y * 8))}`;
}


const renderSquare = (x: number, y: number) => {
      const black = (x + y) % 2 === 1
      const piece = initialSetup[x][y]
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
;


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 800px;
`

const performDrag = (result: DropResult) => {
  console.log("ID", result.draggableId)
  console.log("dest", result.destination)
};

export const Board = () => {

  const squares = []

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {

      squares.push(renderSquare(x, y))

    }
  }

  return (
      <DragDropContext onDragEnd={performDrag}>
        <Wrapper>
          {squares}
        </Wrapper>
      </DragDropContext>

  )
}
