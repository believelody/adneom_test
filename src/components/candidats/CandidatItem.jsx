import React from 'react'
import { Table, Pane, Button, IconButton } from 'evergreen-ui'
import { useAppHooks } from '../../context'
import isMobile from '../../utils/isMobile.util'

const CandidatItem = ({ candidat }) => {
    const { useModal } = useAppHooks()
    const [modalState, dispatchModal] = useModal

    const sendEmail = e => {}
    const deleteCandidat = e => {}

    return (
        <Table.Row height={70}>
            <Table.TextCell>{candidat.name}</Table.TextCell>
            <Table.TextCell>{candidat.email}</Table.TextCell>
            <Table.TextCell>{candidat.language}</Table.TextCell>
            <Table.TextCell>{candidat.score}</Table.TextCell>
            <Table.TextCell>{candidat.time}</Table.TextCell>
            <Table.TextCell>
                {
                    isMobile() ?
                    <Pane>
                        <IconButton onClick={sendEmail} icon='enveloppe' />
                        <IconButton intent='danger' onClick={deleteCandidat} icon='trash' />
                    </Pane> :
                    <Pane display='flex' flexDirection='column'>
                        <Button width={110} onClick={sendEmail}>Send Email</Button>
                        <Button width={110} intent='danger' onClick={deleteCandidat}>Delete Candidat</Button>
                    </Pane>
                }
            </Table.TextCell>
        </Table.Row>
    )
}

export default CandidatItem
