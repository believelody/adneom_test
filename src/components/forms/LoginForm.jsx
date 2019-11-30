import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Pane, Card, Text, Button, Alert } from 'evergreen-ui'
import api from '../../api'
import FieldComponent from '../fields/FieldComponent'
import Label from '../label/Label'
import ErrorAlert from '../alerts/ErrorAlert'
import { useAppHooks } from '../../context'
import { SUCCESS_ADMIN, ERROR_AUTH, RESET_ERROR } from '../../reducers/authReducer'
import { SET_LOADING, RESET_LOADING } from '../../reducers/loadingReducer'
import { setIsAdmin } from '../../utils/admin.util'
// import { setToken } from '../../utils/token.utils'

const LoginForm = () => {
  const { useAuth, useLoading, history } = useAppHooks()
  const [{errors, isAdmin}, dispatchAuth] = useAuth
  const [{loading}, dispatchLoading] = useLoading

  // const [username, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [formState, setState] = useState({})

  const handleChange = ({target}) => setState({ ...formState, [target.name]: target.value})

  // const handleEmail = e => setEmail(e.target.value)
  // const handlePassword = e => setPassword(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    dispatchAuth({ type: RESET_ERROR })
    if (!formState.username) {
      dispatchAuth({ type: ERROR_AUTH, payload: {username: "Le nom d'utilisateur est requis"} })
    }
    if (!formState.password) {
      dispatchAuth({ type: ERROR_AUTH, payload: {password: 'Le mot de passe est requis'} })
    }
    dispatchLoading({ type: SET_LOADING, payload: {msg: 'Un moment svp...'} })
    setTimeout(() => {
      if (formState.username === process.env.REACT_APP_USERNAME_ADMIN && formState.password === process.env.REACT_APP_PWD_ADMIN) {
        dispatchAuth({ type: SUCCESS_ADMIN })
        setIsAdmin()
      }

      dispatchLoading({ type: RESET_LOADING })
    }, 2000);
/*     try {
      const res = await api.user.login(username, password)
      dispatchAuth({
          type: SUCCESS_AUTH,
          payload: {
              user: { _id: res.user._id, name: res.user.username, username: res.user.username }
          }
      })
      setToken(res.jwt)
      setUser({ _id: res.user._id, name: res.user.username, username: res.user.username })
      setEmail('')
      setPassword('')
      history.push('/profile')
    } catch (e) {
      dispatchAuth({ type: ERROR_AUTH, payload: {authFailed: e.message} })
    } */
  }

  useEffect(() => {}, [errors])

  return (
    !isAdmin ?
    <Card
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      elevation={2}
      width='60%'
    >
      <Pane borderBottom width='100%' paddingY={5} textAlign='center'>
        <Text size={500}>Connectez-vous à votre espace admin</Text>
      </Pane>
      <Pane textAlign='center' marginY={20}>
        <form onSubmit={handleSubmit}>
          <FieldComponent
            label={<Label name='Username *' />}
            name='username'
            placeholder="Entrez votre nom d'utilisateur"
            handleChange={handleChange}
            error={errors && errors.username}
          />
          <FieldComponent
            label={<Label name='Mot de passe *' />}
            name='password'
            type='password'
            placeholder='Entrez votre mot de passe'
            hint='It must contain at least 6 characters, 1 numerical'
            handleChange={handleChange}
            error={errors && errors.password}
          />
          {
            errors && errors.authFailed &&
            <ErrorAlert label='authFailed' errors={errors} />
          }
          <Button appearance='primary'>Se connecter</Button>
        </form>
      </Pane>
      {/* <NavLink to='/create-account'>
        <Button appearance='minimal' intent='success'>Pas de compte? Créez le ici!</Button>
      </NavLink> */}
      <NavLink to='/forgot-password'>
        <Button appearance='minimal' intent='warning'>Mot de passe oublié? Cliquez ici!</Button>
      </NavLink>
    </Card> :
    <Redirect to='/admin' />
  )
}

export default LoginForm
