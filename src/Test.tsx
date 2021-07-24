import { Square } from './components/Square'
import { Piece } from './components/Piece'
import { PieceType } from './components/PieceType'
import { PieceColor } from './components/PieceColor'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Droppable } from './components/Droppable'
import { Draggable } from './components/Draggable'

export const Test = () => {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    console.log('Active?', active)
    console.log('Over?', over)
  }

  return (
    <>
      <h1>Test Page</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <Square key={'mykey'} color={'black'} id={'mykey123'} x={0} y={0} validMove={false} />

        <Draggable>Drag me</Draggable>

        <Droppable>{'Drop here'}</Droppable>

        <Piece key={'piecekey'} id={'pieceId'} color={PieceColor.Black} type={PieceType.Pawn} x={0} y={0} />
      </DndContext>
    </>
  )
}
