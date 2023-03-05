import { PieceProps } from "./components/Piece"
import { PieceColor } from "./components/PieceColor"

export type Game = {
  pieces: PieceProps[]
  currentTurn: PieceColor
  timeSeconds?: number
  winner?: PieceColor
}
