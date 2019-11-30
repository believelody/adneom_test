import React, {useEffect, useState} from 'react'
import uuid from 'uuid'
import { Pane, Text, Select, Button, Card, toaster } from 'evergreen-ui'
import CandidatList from '../components/candidats/CandidatList'
import { useAppHooks } from '../context'
import { OPEN_MODAL_CHILDREN } from '../reducers/modalReducer'
import Label from '../components/label/Label'
import FieldComponent from '../components/fields/FieldComponent'
import FieldSelect from '../components/fields/FieldSelect'
import { setCandidats, getCandidats } from '../utils/candidat.util'
import { ADD_ADMIN, RESET_ERROR, ERROR_AUTH } from '../reducers/authReducer'
import { SET_LOADING, RESET_LOADING } from '../reducers/loadingReducer'
import isMobileUtil from '../utils/isMobile.util'
import { setAdmin, getAdmin } from '../utils/admin.util'
import AddAdminModal from '../components/admin/AddAdminModal'
import AdminGenerateIDModal from '../components/admin/AdminGenerateIDModal'

const AdminPage = () => {
    const { useAuth, useModal } = useAppHooks()
    const [{admins}, dispatchAuth] = useAuth
    const [modalState, dispatchModal] = useModal
    const ADMINS = admins.map(admin => ({ id: admin.email, value: admin.email, name: admin.name }))
    
    const [selectAdmin, setSelectedAdmin] = useState(admins.length > 0 ? ADMINS[0].value : 'La liste est vide')

    const handleSelect = e => {
        setSelectedAdmin(e.target.value)
    }

    const generateUrlModal = e => {
        dispatchModal({
            type: OPEN_MODAL_CHILDREN,
            payload: {
                children: <AdminGenerateIDModal />,
                title: "Générez une URL",
                labelConfirm: 'Fermer la fenêtre'
            }
        })
    }

    const addAdminModal = e => {
        dispatchModal({
            type: OPEN_MODAL_CHILDREN,
            payload: {
                children: <AddAdminModal />,
                title: "Ajouter un admin",
                labelConfirm: 'Fermer la fenêtre'
            }
        })
    }

    return (
        <Card marginY='5%' paddingBottom='3%' paddingTop='2%' paddingX='2%' marginX={isMobileUtil() ? 0 : '20%'} backgroundColor='#f5f6fa'>
            <Pane display='flex' alignItems='center' justifyContent='space-between'>
                <Button onClick={addAdminModal}>Ajouter un admin</Button>
                <FieldSelect
                    options={ADMINS}
                    label="Sélectionner un RH"
                    value={selectAdmin}
                    handleSelect={handleSelect}
                />
                <Button disabled={ADMINS.length === 0} onClick={generateUrlModal}>Générer une URL</Button>
            </Pane>
            <Pane textAlign='center' paddingY={20}>
                <Text>
                    Voici les statistiques et résultats des différents candidats qui ont effectués le test
                </Text>
            </Pane>
            <CandidatList />
        </Card>
    )
}

export default AdminPage
