import React from "react";
import {Square} from "./Square";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faChessKing} from "@fortawesome/free-solid-svg-icons/faChessKing";
import {faChessQueen} from "@fortawesome/free-solid-svg-icons/faChessQueen";
import {faChessBishop} from "@fortawesome/free-solid-svg-icons/faChessBishop";
import {faChessKnight} from "@fortawesome/free-solid-svg-icons/faChessKnight";
import {faChessRook} from "@fortawesome/free-solid-svg-icons/faChessRook";
import {faChessPawn} from "@fortawesome/free-solid-svg-icons/faChessPawn";
import {faMehBlank} from "@fortawesome/free-solid-svg-icons";
import {PieceType} from "./PieceType";
import * as Opt from "fp-ts"

const iconLookup = (type: PieceType): IconProp => {
  const {Knight, Pawn, Bishop, Rook, Queen, King, Empty} = PieceType;
  switch (type) {
    case King:
      return faChessKing
    case Queen:
      return faChessQueen
    case Bishop:
      return faChessBishop
    case Knight:
      return faChessKnight
    case Rook:
      return faChessRook
    case Pawn:
      return faChessPawn
    case Empty:
      return faMehBlank
    default:
      return faMehBlank
  }
}

const initialSetup: Array<Array<PieceType>> =
    [
      [PieceType.Rook, PieceType.Knight, PieceType.Bishop, PieceType.Queen, PieceType.King, PieceType.Bishop, PieceType.Knight, PieceType.Rook],
      [PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn],
      [],
      [],
      [],
      [],
      [PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn, PieceType.Pawn],
      [PieceType.Rook, PieceType.Knight, PieceType.Bishop, PieceType.Queen, PieceType.King, PieceType.Bishop, PieceType.Knight, PieceType.Rook],
    ]


function renderSquare(x: number, y: number) {

  const black = (x + y) % 2 === 1
  const piece = initialSetup[x][y]

  return (
      <Square color={black ? 'black' : 'white'}>
        {piece ? <FontAwesomeIcon icon={iconLookup(piece)} size={"3x"}/>
               : <></>}
      </Square>
  )

}


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 800px;
`

export const Board = () => {

  const squares = []

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {

      squares.push(renderSquare(x, y))

    }
  }

  return (
      <Wrapper>
        {squares}
      </Wrapper>
  )
}
