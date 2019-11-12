import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Pane, Card, Text, Button } from 'evergreen-ui'
import uuid from 'uuid'
// import api from '../../api'
import FieldComponent from '../fields/FieldComponent'
import FieldSelect from '../fields/FieldSelect'
import Label from '../label/Label'
import ErrorAlert from '../alerts/ErrorAlert'
import { useAppHooks } from '../../context'
import { SUCCESS_AUTH, ERROR_AUTH, RESET_ERROR } from '../../reducers/authReducer'
import { OPEN_MODAL } from '../../reducers/modalReducer'
// import { setToken } from '../../utils/token.utils'
import { setUser } from '../../utils/user.util'

const MSG = `
  Chez Adneom, nous recherchons toujours la perle rare. C'est pourquoi nous vous proposons ce jeu ludique. Juste 10min de votre temps, pas plus, PROMIS!
  Le questionnaire sera relatif au langage que vous avez choisi.
  Prêt?
`

const OPTIONS = [
    {id: 0, value: 'java', name: 'Java'},
    {id: 1, value: 'php', name: 'PHP'},
    {id: 2, value: 'javascript', name: 'Javascript'},
]

const RegistrationForm = () => {
    const { useAuth, useModal, usePage, history } = useAppHooks()
    const [{ errors, isConnected }, dispatchAuth] = useAuth
    const [modalState, dispatchModal] = useModal
    const [{pageLoaded}, dispatcthPage] = usePage

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [language, setLanguage] = useState(OPTIONS[0].value)
    const [userId, setUserId] = useState()

    const handleName = e => setName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleLanguage = e => setLanguage(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        dispatchAuth({ type: RESET_ERROR })
        if (!name) {
            dispatchAuth({ type: ERROR_AUTH, payload: { name: 'Le champ Nom est obligatoire' } })
        }
        else if (!email) {
            dispatchAuth({ type: ERROR_AUTH, payload: { email: 'Le champ Email est obligatoire' } })
        }
        else if (!language) {
            dispatchAuth({ type: ERROR_AUTH, payload: { language: 'Le champ Langage est obligatoire' } })
        }
        else {
            let id = uuid()
            setUserId(id)
          dispatchModal({
            type: OPEN_MODAL,
            payload: {
              title: `Bienvenue ${name}`,
              msg: MSG,
              labelConfirm: 'Accéder au questionnaire',
              action: () => {
                let user = { id, name, email, language }
                dispatchAuth({ type: SUCCESS_AUTH, payload: {user} })
                setUser(user)
              }
            }
          })
        }
    }

    return (
        !isConnected ?
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
                <Text size={500}>Enregistrez-vous sur ce formulaire et démarrer le test</Text>
            </Pane>
            <Pane textAlign='center' marginY={20}>
                <form onSubmit={handleSubmit}>
                    <FieldComponent
                        label={<Label name='Nom *' />}
                        name='name'
                        placeholder='entrez votre nom et prénom'
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
                        options={OPTIONS}
                        value={language}
                    />
                    {
                        errors && errors.authFailed &&
                        <ErrorAlert label='authFailed' errors={errors} />
                    }
                    <Button appearance='primary'>Commencez</Button>
                </form>
            </Pane>
        </Card> :
        <Redirect to={`/users/${userId}`} />
    )
}

export default RegistrationForm
