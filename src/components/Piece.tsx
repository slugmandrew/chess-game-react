import React, { FC } from "react";
import { PieceType } from "./PieceType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook, faMehBlank } from "@fortawesome/free-solid-svg-icons";
import { PieceColor } from "./PieceColor";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

export interface PieceProps {
  id: string
  color: PieceColor
  type: PieceType
  x: number
  y: number
}

export const iconLookup = (type: PieceType): IconProp => {
  const { Knight, Pawn, Bishop, Rook, Queen, King } = PieceType;
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


export const Piece: FC<PieceProps> = ({ id, type, color, x, y }) => {

  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: id,
    data: {
      type: type,
      color: color,
      x: x,
      y: y
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <FontAwesomeIcon icon={iconLookup(type)} color={color} size={"3x"} />
    </div>
  )

}
