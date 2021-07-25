import React, { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export const Draggable: FC<{ id: string }> = ({ id, children }) => {
  const { setNodeRef, listeners, attributes, transform, active, isDragging } = useDraggable({ id: id })
  return (
    <>
      <div
        style={{
          opacity: 0.6,
          position: 'absolute',
        }}>
        {children}
      </div>
      <div
        style={{
          transform: CSS.Translate.toString(transform),
          position: 'absolute',
        }}
        ref={setNodeRef}
        {...listeners}
        {...attributes}>
        {children}
      </div>
    </>
  )
}
