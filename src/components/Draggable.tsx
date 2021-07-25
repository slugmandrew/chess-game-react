import React, { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { AnimatePresence, motion } from 'framer-motion'

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
        }}>
        <AnimatePresence>
          <motion.div
            key={id}
            animate={{ scale: [1, 1.4, 1], rotate: [0, 360] }}
            initial={true}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
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
