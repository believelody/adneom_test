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

const AddAdminModal = () => {
    const { useAuth, useLoading } = useAppHooks()
    const [{errors}, dispatchAuth] = useAuth
    const [loadingState, dispatchLoading] = useLoading

    const [formState, setState] = useState({})

    const handleChange = ({ target }) => setState({ ...formState, [target.name]: target.value })

    const handleSubmit = e => {
        e.preventDefault()
        dispatchAuth({ type: RESET_ERROR })
        if (!formState.name) {
            dispatchAuth({ type: ERROR_AUTH, payload: { name: "Le nom est requis" } })
        }
        if (!formState.email) {
            dispatchAuth({ type: ERROR_AUTH, payload: { email: "L'email est requis" } })
        }
        if (!formState.password) {
            dispatchAuth({ type: ERROR_AUTH, payload: { password: 'Le mot de passe est requis' } })
        }
        dispatchLoading({ type: SET_LOADING, payload: { msg: 'Un moment svp...' } })
        setTimeout(() => {
            if (formState.password === process.env.REACT_APP_PWD_ADMIN) {
                let admins = getAdmin() || []
                dispatchAuth({
                    type: ADD_ADMIN,
                    payload: {
                        admin: {
                            name: formState.name,
                            email: formState.email
                        }
                    } 
                })
                setAdmin([...admins, {name: formState.name, email: formState.email}])
                toaster.success(`${formState.name} a bien été ajouté dans la liste d'admins`)
            }
            else {
                dispatchAuth({ type: ERROR_AUTH, payload: {password: "Le mot de passe est incorrect"}})
            }
            dispatchLoading({ type: RESET_LOADING })
        }, 2000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldComponent
                label={<Label name="Nom de l'admin *" />}
                name='name'
                handleChange={handleChange}
                placeholder='Entrez le nom du nouvel admin'
                error={errors && errors.nom}
            />
            <FieldComponent
                label={<Label name="Email de l'admin *" />}
                name='email'
                type='email'
                handleChange={handleChange}
                placeholder="Entrez l'email du nouvel admin"
                error={errors && errors.email}
            />
            <FieldComponent
                label={<Label name='Mot de passe *' />}
                name='password'
                description="Entrez le mot de passe pour confirmez votre action"
                type='password'
                handleChange={handleChange}
                placeholder='Entrez votre mot de passe'
                error={errors && errors.password}
            />
            <Button>Ajouter</Button>
        </form>
    )
}

const AdminGenerateIDModal = () => {
    const { useAuth } = useAppHooks()
    const [{ admins }, dispatchAuth] = useAuth
    const ADMINS = admins.map(admin => ({ id: admin.email, value: admin.email, name: admin.name }))

    const [url, setUrl] = useState('')
    const [selectAdmin, setSelectedAdmin] = useState(admins.length > 0 ? ADMINS[0].value : 'La liste est vide')

    const handleSelect = e => {
        console.log(e.target.value)
        setSelectedAdmin(e.target.value)
    }

    const generateUrl = e => {
        console.log(selectAdmin)
        let candidatId = uuid()
        let candidats = getCandidats() || []
        setUrl(`http://localhost:3000/${candidatId}/landing`)
        setCandidats([...candidats, { id: candidatId, contact: selectAdmin }])
    }

    console.log(selectAdmin)

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

const AdminPage = () => {
    const { useAuth, useModal } = useAppHooks()
    const [{admins}, dispatchAuth] = useAuth
    const [modalState, dispatchModal] = useModal
    const ADMINS = admins.map(admin => ({ id: admin.email, value: admin.email, name: admin.name }))
    
    const [selectAdmin, setSelectedAdmin] = useState(admins.length > 0 ? ADMINS[0].value : 'La liste est vide')

    const handleSelect = e => {
        console.log(e.target.value)
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
        <Pane marginY='5%' marginX={isMobileUtil() ? 0 : '20%'}>
            <Pane display='flex' alignItems='center' justifyContent='space-between'>
                <Button onClick={addAdminModal}>Ajouter un admin</Button>
                <FieldSelect
                    options={ADMINS}
                    label="Sélectionner un RH"
                    value={selectAdmin}
                    handleSelect={handleSelect}
                />
                <Button onClick={generateUrlModal}>Générer une URL</Button>
            </Pane>
            <Pane textAlign='center' paddingY={20}>
                <Text>
                    Voici les statistiques et résultats des différents candidats qui ont effectués le test
                </Text>
            </Pane>
            <CandidatList />
        </Pane>
    )
}

export default AdminPage
