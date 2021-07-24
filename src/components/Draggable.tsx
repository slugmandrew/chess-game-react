import React, { FC, PropsWithChildren } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export const Draggable: FC<{ id: string }> = ({ id, children }) => {
  const { setNodeRef, listeners, attributes, transform, active } = useDraggable({ id: id })
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  )
}
