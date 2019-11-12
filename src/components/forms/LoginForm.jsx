import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Pane, Card, Text, Button, Alert } from 'evergreen-ui'
import api from '../../api'
import FieldComponent from '../fields/FieldComponent'
import Label from '../label/Label'
import ErrorAlert from '../alerts/ErrorAlert'
import { useAppHooks } from '../../context'
import { SUCCESS_AUTH, ERROR_AUTH, RESET_ERROR } from '../../reducers/authReducer'
import { SET_LOADING, RESET_LOADING } from '../../reducers/loadingReducer'
import { getAdmin } from '../../utils/admin.util'
// import { setToken } from '../../utils/token.utils'

const LoginForm = () => {
  const { useAuth, useLoading, history } = useAppHooks()
  const [{errors}, dispatchAuth] = useAuth
  const [{loading}, dispatchLoading] = useLoading

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [formState, setState] = useState({})

  const handleChange = ({target}) => setState({ ...formState, [target.name]: target.value})

  // const handleEmail = e => setEmail(e.target.value)
  // const handlePassword = e => setPassword(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    dispatchAuth({ type: RESET_ERROR })
    if (!formState.email) {
      dispatchAuth({ type: ERROR_AUTH, payload: {email: 'Email is required'} })
    }
    if (!formState.password) {
      dispatchAuth({ type: ERROR_AUTH, payload: {password: 'Password is required'} })
    }
    dispatchLoading({ type: SET_LOADING, payload: {msg: 'Please wait a while...'} })
    setTimeout(() => {
      if (getAdmin()) {
        let user = getAdmin()
        if (formState.email === user.email) {
          dispatchAuth({ type: SUCCESS_AUTH, payload: {user} })
        }
      }
    }, 2000);
/*     try {
      const res = await api.user.login(email, password)
      dispatchAuth({
          type: SUCCESS_AUTH,
          payload: {
              user: { _id: res.user._id, name: res.user.username, email: res.user.email }
          }
      })
      setToken(res.jwt)
      setUser({ _id: res.user._id, name: res.user.username, email: res.user.email })
      setEmail('')
      setPassword('')
      history.push('/profile')
    } catch (e) {
      dispatchAuth({ type: ERROR_AUTH, payload: {authFailed: e.message} })
    } */
    dispatchLoading({ type: RESET_LOADING })
  }

  useEffect(() => {}, [errors])

  return (
    <Card
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      elevation={2}
      width='60%'
    >
      <Pane borderBottom width='100%' paddingY={5} textAlign='center'>
        <Text size={500}>Connectez-vous à votre compte</Text>
      </Pane>
      <Pane textAlign='center' marginY={20}>
        <form onSubmit={handleSubmit}>
          <FieldComponent
            label={<Label name='Email *' />}
            name='email'
            type='email'
            placeholder='ex: username@mail.com'
            handleChange={handleChange}
            error={errors && errors.email}
          />
          <FieldComponent
            label={<Label name='Password *' />}
            name='password'
            type='password'
            placeholder='enter your password here'
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
      <NavLink to='/create-account'>
        <Button appearance='minimal' intent='success'>Pas de compte? Créez le ici!</Button>
      </NavLink>
      <NavLink to='/forgot-password'>
        <Button appearance='minimal' intent='warning'>Mot de passe oublié? Créez le ici!</Button>
      </NavLink>
    </Card>
  )
}

export default LoginForm
