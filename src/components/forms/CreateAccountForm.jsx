import React, { useState, useEffect } from 'react'
import uuid from 'uuid'
import { NavLink, Redirect } from 'react-router-dom'
import { Pane, Card, Text, Button, Alert } from 'evergreen-ui'
import FieldComponent from '../fields/FieldComponent'
import Label from '../label/Label'
import ErrorAlert from '../alerts/ErrorAlert'
import api from '../../api'
import { useAppHooks } from '../../context'
import { SUCCESS_AUTH, ERROR_AUTH, RESET_ERROR } from '../../reducers/authReducer'
import { SET_LOADING, RESET_LOADING } from '../../reducers/loadingReducer'
import { setAdmin } from '../../utils/admin.util'

const CreateAccountForm = () => {
  const { useAuth, useLoading } = useAppHooks()
  const [{errors, isConnected}, dispatchAuth] = useAuth
  const [loadingState, dispatchLoading] = useLoading

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleName = e => setName(e.target.value)
  const handleEmail = e => setEmail(e.target.value)
  const handleConfirmEmail = e => setConfirmEmail(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const handleConfirmPassword = e => setConfirmPassword(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    dispatchAuth({ type: RESET_ERROR })
    if (!name) {
      dispatchAuth({ type: ERROR_AUTH, payload: {name: 'Username is required'}})
    }
    if (!email) {
      dispatchAuth({ type: ERROR_AUTH, payload: {email: 'Email is required'}})
    }
    if (!confirmEmail) {
      dispatchAuth({ type: ERROR_AUTH, payload: {confirmEmail: 'This field is required'}})
    }
    if (!password) {
      dispatchAuth({ type: ERROR_AUTH, payload: {password: 'Password is required'}})
    }
    if (!confirmPassword) {
      dispatchAuth({ type: ERROR_AUTH, payload: {confirmPassword: 'This field is required'}})
    }
    if (email !== confirmEmail) {
      dispatchAuth({ type: ERROR_AUTH, payload: {noMatch: 'Email and email confirm must be same'} })
    }
    if (password !== confirmPassword) {
      dispatchAuth({ type: ERROR_AUTH, payload: {noMatch: 'Password and password confirm must be same'} })
    }
    dispatchLoading({ type: SET_LOADING })

    let id = uuid()
    
    dispatchAuth({
      type: SUCCESS_AUTH,
      payload: {
        user: { id, name, email }
      }
    })
    setAdmin({ id, name, email })
    dispatchLoading({ type: RESET_LOADING })      
    /* try {
      const res = await api.user.register(name, email, password)

      let code = randomstring.generate({
        length: 8,
        charset: 'alphanumeric'
      })
      await api.profile.createProfile(res.user._id, res.user.name, code, false)
      dispatchAuth({
          type: SUCCESS_AUTH,
          payload: {
              user: { _id: res.user._id, name: res.user.name, email: res.user.email }
          }
      })
      setToken(res.jwt)
      setUser({ _id: res.user._id, name: res.user.name, email: res.user.email })
      setEmail('')
      setPassword('')

      await api.user.confirmEmail({
        to: res.user.email,
        subject: `Confirm your email`,
        text: `Welcome ${res.user.name}, please confirm your email with this code: ${code}. Copy and paste it your register form. Enjoy your shopping in our store.`,
        html: `<p>
          Welcome ${res.user.name}, please confirm your email with this code: <b>${code}</b>. Copy and paste it your register form. Enjoy your shopping in our store.
        </p>`
      })
      dispatchToast({ type: SET_TOAST, payload: { msg: `Hello ${res.user.name}, we just send you a confirm email.` } })
    } catch (e) {
      console.log(e.message)
      dispatchAuth({ type: ERROR_AUTH, payload: {authFailed: e.message} })
    } */
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
    >
      <Pane borderBottom width='100%' paddingY={5} textAlign='center'>
        <Text size={500}>Create a new account</Text>
      </Pane>
      <Pane textAlign='center' marginY={20}>
        {
          !isConnected &&
          <form onSubmit={handleSubmit}>
            <FieldComponent
              label={<Label name='Name *' />}
              name='name'
              placeholder='enter a name here'
              handleChange={handleName}
              error={errors && errors.name}
            />
            <FieldComponent
              label={<Label name='Email *' />}
              name='email'
              type='email'
              placeholder='ex: name@mail.com'
              handleChange={handleEmail}
              error={errors && errors.email}
            />
            <FieldComponent
              label={<Label name='Email Confirm *' />}
              name='confirmEmail'
              type='email'
              placeholder='must be same than email field'
              handleChange={handleConfirmEmail}
              error={errors && errors.confirmEmail}
            />
            <FieldComponent
              label={<Label name='Password *' />}
              name='password'
              type='password'
              placeholder='enter your password here'
              hint='It must contain at least 6 characters, 1 numerical'
              handleChange={handlePassword}
              error={errors && errors.password}
            />
            <FieldComponent
              label={<Label name='Password Confirm *' />}
              name='confirmPassword'
              type='password'
              placeholder='must be same than password field'
              handleChange={handleConfirmPassword}
              error={errors && errors.confirmPassword}
            />
            {
              errors && errors.authFailed &&
              <ErrorAlert label='authFailed' errors={errors} />
            }
            {
              errors && errors.noMatch &&
              <ErrorAlert label='noMatch' errors={errors} />
            }
            <Button appearance='primary' intent='success'>Create an Account</Button>
          </form>
        }
      </Pane>
      <NavLink to='/login'>
        <Button appearance='minimal'>Already an account? Connect here!</Button>
      </NavLink>
    </Card> :
    <Redirect to='/admin' />
  )
}

export default CreateAccountForm
