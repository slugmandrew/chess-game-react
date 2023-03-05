import React, { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { AnimatePresence, motion } from 'framer-motion'

export const Draggable: FC<{ id: string }> = ({ id, children }) => {
  const { setNodeRef, listeners, attributes, transform, active, isDragging } = useDraggable({ id: id })

  const initialStyles = {
    x: 0,
    y: 0,
    scale: 1,
  }

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
          position: 'absolute',
          cursor: 'pointer',
        }}>
        <AnimatePresence>
          <motion.div
            key={id}
            animate={
              transform
                ? {
                    x: transform.x,
                    y: transform.y,
                    scale: isDragging ? 1.2 : 1,
                    skew: isDragging ? 5 : 0,
                    zIndex: isDragging ? 1 : 0,
                  }
                : initialStyles
            }
            initial={false}
            exit={{ translateX: 200, translateY: 500 }}
            ref={setNodeRef}
            {...listeners}
            {...attributes}>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
