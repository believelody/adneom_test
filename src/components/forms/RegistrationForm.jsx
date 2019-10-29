import React, { useState, useEffect } from 'react'
import { Pane, Card, Text, Button } from 'evergreen-ui'
// import api from '../../api'
import FieldComponent from '../fields/FieldComponent'
import FieldSelect from '../fields/FieldSelect'
import Label from '../label/Label'
import ErrorAlert from '../alerts/ErrorAlert'
import { useAppHooks } from '../../context'
import { SUCCESS_AUTH, ERROR_AUTH, RESET_ERROR } from '../../reducers/authReducer'
import { SET_LOADING, RESET_LOADING } from '../../reducers/loadingReducer'
// import { setToken } from '../../utils/token.utils'
// import { setUser } from '../../utils/user.utils'

const RegistrationForm = () => {
    const { useAuth, useLoading, history } = useAppHooks()
    const [{ errors }, dispatchAuth] = useAuth
    const [{ loading }, dispatchLoading] = useLoading
    // const [toastState, dispatchToast] = useToast

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [language, setLanguage] = useState('')

    const handleName = e => setName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleLanguage = e => setLanguage(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        dispatchAuth({ type: RESET_ERROR })
        if (!name) {
            dispatchAuth({ type: ERROR_AUTH, payload: { password: 'Le champ Nom est obligatoire' } })
        }
        if (!email) {
            dispatchAuth({ type: ERROR_AUTH, payload: { email: 'Le champ Email est obligatoire' } })
        }
        if (!language) {
            dispatchAuth({ type: ERROR_AUTH, payload: { email: 'Le champ Langage est obligatoire' } })
        }
        dispatchLoading({ type: SET_LOADING, payload: { msg: 'Patientez un instant svp...' } })
        setTimeout(() => {
            console.log(name, email, language)
        }, 3000)
        // try {

        // } catch (e) {
        //     dispatchAuth({ type: ERROR_AUTH, payload: { authFailed: e.message } })
        //     console.log(e)
        // }
        dispatchLoading({ type: RESET_LOADING })
    }

    // useEffect(() => { }, [errors])

    return (
        <Card
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            elevation={2}
            width='60%'
            margin='auto'
        >
            <Pane borderBottom width='100%' paddingY={5} textAlign='center'>
                <Text size={500}>Connect to your account</Text>
            </Pane>
            <Pane textAlign='center' marginY={20}>
                <form onSubmit={handleSubmit}>
                    <FieldComponent
                        label={<Label name='Nom *' />}
                        name='name'
                        placeholder='ex: username@mail.com'
                        handleChange={handleName}
                        error={errors && errors.name}
                    />
                    <FieldComponent
                        label={<Label name='Email *' />}
                        name='email'
                        type='email'
                        placeholder='ex: username@mail.com'
                        handleChange={handleEmail}
                        error={errors && errors.email}
                    />
                    <FieldSelect
                        label={<Label name='Langages *' />}
                        description='Choisissez votre langage de prédilection'
                        handleSelect={handleLanguage}
                        options={[
                            {id: 0, value: 'java', name: 'Java'},
                            {id: 1, value: 'php', name: 'PHP'},
                            {id: 2, value: 'javascript', name: 'Javascript'},
                        ]}
                        error={errors && errors.language}
                    />
                    {
                        errors && errors.authFailed &&
                        <ErrorAlert label='authFailed' errors={errors} />
                    }
                    <Button appearance='primary'>Commencez</Button>
                </form>
            </Pane>
        </Card>
    )
}

export default RegistrationForm