import React from 'react'
import styles from './styles.module.css'

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpened: boolean
  modalClosed: () => void
}

export const Modal = (props: ModalProps) => {
  const backdropRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const keyListener = function (this: HTMLElement, e: KeyboardEvent) {
      if (e.key === 'Escape') {
        props.modalClosed()
      }
    }

    document.body.addEventListener('keydown', keyListener)

    return () => document.body.removeEventListener('keydown', keyListener)
  }, [props])

  if (!props.isOpened) {
    return null
  }

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={props.modalClosed}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        {props.children}
      </div>
    </div>
  )
}
