import React from 'react'
import { Pane, Text, Dialog, Button } from 'evergreen-ui'
import { useAppHooks } from '../../context'
import { SET_LOADING, RESET_LOADING } from '../../reducers/loadingReducer'
import { CLOSE_MODAL } from '../../reducers/modalReducer'

const Modal = () => {
    const { useModal } = useAppHooks()
    const [{ isOpened, title, msg, status, action, labelConfirm, children }, dispatchModal] = useModal

    const closeModal = () => {
      if (action) action()
      dispatchModal({ type: CLOSE_MODAL })
    }

    return (
        <Pane>
            <Dialog
                isShown={isOpened}
                title={title}
                onCloseComplete={() => dispatchModal({ type: CLOSE_MODAL })}
                onConfirm={closeModal}
                intent={status}
                confirmLabel={labelConfirm ? labelConfirm : 'Delete'}
            >
                {msg ? msg : 'Please confirm your action'}
                {children}
            </Dialog>
        </Pane>
    )
}

export default Modal
