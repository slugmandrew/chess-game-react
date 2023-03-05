import React from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { Board } from './Board'
import { Button, Grid } from '@mantine/core'
import { useChessStore } from '../Store'

export const Chess = () => {
  const { pieces, start, move, clearActivePiece, setActivePiece, movingPiece, validMoves, graveyard, currentPlayer } = useChessStore((state) => ({
    pieces: state.pieces,
    start: state.start,
    move: state.move,
    clearActivePiece: state.clearActivePiece,
    setActivePiece: state.setActivePiece,
    movingPiece: state.movingPiece,
    validMoves: state.validMoves,
    graveyard: state.graveyard,
    currentPlayer: state.currentPlayer,
  }))

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActivePiece(active)
    console.log('Start (active)', active)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    console.log('Active?', active)
    console.log('Over?', over)

    if (over) {
      move(active, over)
    }
    clearActivePiece()
  }

  function handleDragCancel() {}

  return (
    <AnimateSharedLayout>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
        <Grid justify="center">
          <Grid.Col span={2}>1</Grid.Col>
          <Grid.Col span={8}>
            <Board pieces={pieces} movingPiece={movingPiece} currentPlayer={currentPlayer} graveyard={graveyard} validMoves={validMoves} />
          </Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
          <Grid.Col span={12}>
            <Button onClick={start}>Reset</Button>

            <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }}>
              I am in a div
            </motion.div>
            <p>
              <strong>Current Player:</strong> {currentPlayer}
            </p>
            <p>
              <strong>Moving Piece:</strong> {movingPiece ? movingPiece?.id : 'None'}
            </p>
            <p>
              <strong>From X, Y:</strong> {movingPiece ? movingPiece?.x + ', ' + movingPiece.y : 'None'}
            </p>
            <p>
              <strong>Valid Moves:</strong>
            </p>
            <div>
              {validMoves.map((items, index) => (
                <div key={`${items}-${index}`}>
                  {items.map((subItem, sIndex) => {
                    if (subItem)
                      return (
                        <span key={`${subItem}-${sIndex}`}>
                          [{index}, {sIndex}]{'  '}
                        </span>
                      )
                  })}
                </div>
              ))}
            </div>
            <p>
              <strong>Graveyard:</strong>
            </p>
            <div>
              {graveyard.map((item, index) => {
                return (
                  <span key={`${item}-${index}`}>
                    [{item.color} {item.type}]{'  '}
                  </span>
                )
              })}
            </div>
          </Grid.Col>
        </Grid>
      </DndContext>
    </AnimateSharedLayout>
  )
}
