import React, {FC} from "react";
import {PieceType} from "./PieceType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faChessKing} from "@fortawesome/free-solid-svg-icons/faChessKing";
import {faChessQueen} from "@fortawesome/free-solid-svg-icons/faChessQueen";
import {faChessBishop} from "@fortawesome/free-solid-svg-icons/faChessBishop";
import {faChessKnight} from "@fortawesome/free-solid-svg-icons/faChessKnight";
import {faChessRook} from "@fortawesome/free-solid-svg-icons/faChessRook";
import {faChessPawn} from "@fortawesome/free-solid-svg-icons/faChessPawn";
import {faMehBlank} from "@fortawesome/free-solid-svg-icons";
import {PieceColor} from "./PieceColor";


export type PieceProps = {
  color: PieceColor
  type: PieceType
}


export const iconLookup = (type: PieceType): IconProp => {
  const {Knight, Pawn, Bishop, Rook, Queen, King} = PieceType;
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
    default:
      return faMehBlank
  }
}


export const Piece: FC<PieceProps> = ({type, color}) => {


  return (
      <FontAwesomeIcon icon={iconLookup(type)} color={color} size={"4x"}/>
  )

}
