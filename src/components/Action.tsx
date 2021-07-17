export type Action =
  | { type: 'start' }
  | { type: 'move', pieceX: number, pieceY: number, destX: number, destY: number }
  | { type: 'reset' }
