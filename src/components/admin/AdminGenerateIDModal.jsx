import React, { useState } from 'react'
import uuid from 'uuid'
import { useAppHooks } from '../../context'
import { getCandidats, setCandidats } from '../../utils/candidat.util'
import { Card, Pane, Button } from 'evergreen-ui'
import FieldSelect from '../fields/FieldSelect'
import FieldComponent from '../fields/FieldComponent'

const AdminGenerateIDModal = () => {
    const { useAuth } = useAppHooks()
    const [{ admins }, dispatchAuth] = useAuth
    const ADMINS = admins.map(admin => ({ id: admin.email, value: admin.email, name: admin.name }))

    const [url, setUrl] = useState('')
    const [selectAdmin, setSelectedAdmin] = useState(admins.length > 0 ? ADMINS[0].value : 'La liste est vide')

    const handleSelect = e => {
        setSelectedAdmin(e.target.value)
    }

    const generateUrl = e => {
        let candidatId = uuid()
        let candidats = getCandidats() || []
        setUrl(`http://localhost:3000/${candidatId}/landing`)
        setCandidats([...candidats, { id: candidatId, contact: selectAdmin }])
    }

    return (
        <Card>
            <Pane>
                <FieldSelect
                    options={ADMINS}
                    label="Sélectionner le contact"
                    value={selectAdmin}
                    handleSelect={handleSelect}
                />
                <FieldComponent
                    label="URL généré"
                    description="Appuyer sur le bouton ci-dessous et copier l'url qui s'affichera"
                    value={url}
                    readOnly
                />
                <Button onClick={generateUrl}>Générer URL</Button>
            </Pane>
        </Card>
    )
}

export default AdminGenerateIDModal