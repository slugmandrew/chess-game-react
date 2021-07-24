import { PieceType } from './components/PieceType'
import { PieceColor } from './components/PieceColor'
import { PieceProps } from './components/Piece'

const { Knight, Pawn, Bishop, Rook, Queen, King } = PieceType
const { Black, White } = PieceColor

// Black Team
const BlackRook1: PieceProps = { id: 'BRK1', color: Black, type: Rook, x: 0, y: 0 }
const BlackKnight1: PieceProps = { id: 'BKT1', color: Black, type: Knight, x: 0, y: 1 }
const BlackBishop1: PieceProps = { id: 'BBP1', color: Black, type: Bishop, x: 0, y: 2 }
const BlackQueen: PieceProps = { id: 'BQN', color: Black, type: Queen, x: 0, y: 3 }
const BlackKing: PieceProps = { id: 'BKG', color: Black, type: King, x: 0, y: 4 }
const BlackBishop2: PieceProps = { id: 'BBP2', color: Black, type: Bishop, x: 0, y: 5 }
const BlackKnight2: PieceProps = { id: 'BKT2', color: Black, type: Knight, x: 0, y: 6 }
const BlackRook2: PieceProps = { id: 'BRK2', color: Black, type: Rook, x: 0, y: 7 }
const BlackPawn1: PieceProps = { id: 'BP1', color: Black, type: Pawn, x: 1, y: 0 }
const BlackPawn2: PieceProps = { id: 'BP2', color: Black, type: Pawn, x: 1, y: 1 }
const BlackPawn3: PieceProps = { id: 'BP3', color: Black, type: Pawn, x: 1, y: 2 }
const BlackPawn4: PieceProps = { id: 'BP4', color: Black, type: Pawn, x: 1, y: 3 }
const BlackPawn5: PieceProps = { id: 'BP5', color: Black, type: Pawn, x: 1, y: 4 }
const BlackPawn6: PieceProps = { id: 'BP6', color: Black, type: Pawn, x: 1, y: 5 }
const BlackPawn7: PieceProps = { id: 'BP7', color: Black, type: Pawn, x: 1, y: 6 }
const BlackPawn8: PieceProps = { id: 'BP8', color: Black, type: Pawn, x: 1, y: 7 }

// White Team
const WhitePawn1: PieceProps = { id: 'WP1', color: White, type: Pawn, x: 6, y: 0 }
const WhitePawn2: PieceProps = { id: 'WP2', color: White, type: Pawn, x: 6, y: 1 }
const WhitePawn3: PieceProps = { id: 'WP3', color: White, type: Pawn, x: 6, y: 2 }
const WhitePawn4: PieceProps = { id: 'WP4', color: White, type: Pawn, x: 6, y: 3 }
const WhitePawn5: PieceProps = { id: 'WP5', color: White, type: Pawn, x: 6, y: 4 }
const WhitePawn6: PieceProps = { id: 'WP6', color: White, type: Pawn, x: 6, y: 5 }
const WhitePawn7: PieceProps = { id: 'WP7', color: White, type: Pawn, x: 6, y: 6 }
const WhitePawn8: PieceProps = { id: 'WP8', color: White, type: Pawn, x: 6, y: 7 }

const WhiteRook1: PieceProps = { id: 'WRK1', color: White, type: Rook, x: 7, y: 0 }
const WhiteKnight1: PieceProps = { id: 'WKT1', color: White, type: Knight, x: 7, y: 1 }
const WhiteBishop1: PieceProps = { id: 'WBP1', color: White, type: Bishop, x: 7, y: 2 }
const WhiteQueen: PieceProps = { id: 'WQN', color: White, type: Queen, x: 7, y: 3 }
const WhiteKing: PieceProps = { id: 'WKG', color: White, type: King, x: 7, y: 4 }
const WhiteBishop2: PieceProps = { id: 'WBP2', color: White, type: Bishop, x: 4, y: 3 }
const WhiteKnight2: PieceProps = { id: 'WKT2', color: White, type: Knight, x: 7, y: 6 }
const WhiteRook2: PieceProps = { id: 'WRK2', color: White, type: Rook, x: 7, y: 7 }

export const piecesList = [
  BlackRook1,
  BlackKnight1,
  BlackBishop1,
  BlackQueen,
  BlackKing,
  BlackBishop2,
  BlackKnight2,
  BlackRook2,
  BlackPawn1,
  BlackPawn2,
  BlackPawn3,
  BlackPawn4,
  BlackPawn5,
  BlackPawn6,
  BlackPawn7,
  BlackPawn8,
  WhiteRook1,
  WhiteKnight1,
  WhiteBishop1,
  WhiteKing,
  WhiteQueen,
  WhiteBishop2,
  WhiteKnight2,
  WhiteRook2,
  WhitePawn1,
  WhitePawn2,
  WhitePawn3,
  WhitePawn4,
  WhitePawn5,
  WhitePawn6,
  WhitePawn7,
  WhitePawn8,
]
