import React, { useEffect } from 'react'
import { Pane, Table, Card } from 'evergreen-ui'
import { useAppHooks } from '../../context'
import Label from '../label/Label'
import CandidatItem from './CandidatItem'
import isMobileUtil from '../../utils/isMobile.util'

const CandidatList = () => {
    const { useCandidat } = useAppHooks()
    const [{candidats}, dispatchCandidat] = useCandidat

    useEffect(() => {}, [])

    console.log(candidats)

    return (
        <Card elevation={1}>
            {
                candidats.length > 0 ?
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Nom & Prénom</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Contact</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Langage choisi</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Score</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Temps</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            candidats.map(candidat => <CandidatItem key={candidat.id} candidat={candidat} />)
                        }
                    </Table.Body>
                </Table> :
                <Label name='Sorry there is no candidat' />
            } 
        </Card>
    )
}

export default CandidatList
