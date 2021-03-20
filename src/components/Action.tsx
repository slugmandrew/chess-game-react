export type Action = {

  type: 'start' | 'move' | 'reset',
  pieceId: string,
  destinationId?: string

}
