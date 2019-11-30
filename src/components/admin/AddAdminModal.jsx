import React, { useState } from 'react'
import { toaster, Button } from 'evergreen-ui'
import { useAppHooks } from "../../context"
import { getAdmin, setAdmin } from '../../utils/admin.util'
import { ADD_ADMIN, ERROR_AUTH, RESET_ERROR } from '../../reducers/authReducer'
import { RESET_LOADING, SET_LOADING } from '../../reducers/loadingReducer'
import FieldComponent from '../fields/FieldComponent'
import Label from '../label/Label'

const AddAdminModal = () => {
    const { useAuth, useLoading } = useAppHooks()
    const [{ errors }, dispatchAuth] = useAuth
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
                setAdmin([...admins, { name: formState.name, email: formState.email }])
                toaster.success(`${formState.name} a bien été ajouté dans la liste d'admins`)
            }
            else {
                dispatchAuth({ type: ERROR_AUTH, payload: { password: "Le mot de passe est incorrect" } })
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

export default AddAdminModal