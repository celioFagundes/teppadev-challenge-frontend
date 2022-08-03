import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AuthContext } from '../../contexts/auth'
import { useMutation } from '@tanstack/react-query'
import { IRegistration } from '../../types/types'
import { register } from '../../lib/api'
import { Input } from '../../components/Inputs'

import styles from './registration.module.css'
import { Button } from '../../components/Buttons'
import { LoadingSpinner } from '../../components/LoadingSpinner/loadingSpinner'

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email().required('Please, enter your email'),
  password: Yup.string().min(8).required('Please, enter your password'),
})

interface IRegisterResponse {
  success: boolean
  message: string
}
function Registration() {
  const auth = useContext(AuthContext)
  const registrationMutation = useMutation<IRegisterResponse, unknown, IRegistration>(values =>
    register('/auth/register', values)
  )
  const form = useFormik({
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      registrationMutation.reset()
      registrationMutation.mutate(values)
    },
  })
  if (auth && auth.user !== null) {
    return <Navigate to='/' />
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>Register an account</h1>
        <form onSubmit={form.handleSubmit} className={styles.form}>
          <Input
            id='email'
            label='Email'
            value={form.values.email}
            name='email'
            errorMessage={form.errors.email}
            placeholder='Enter your email'
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            name='password'
            value={form.values.password}
            placeholder='Enter your password'
            errorMessage={form.errors.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {registrationMutation.isLoading && <LoadingSpinner />}
          {registrationMutation.isSuccess && registrationMutation.data.success && (
            <div>
              <p className={styles.success_message}>{registrationMutation.data.message}</p>
              <Link to='/signin' className={styles.sign_in}>
                Sign in with your account
              </Link>
            </div>
          )}
          {registrationMutation.isSuccess && !registrationMutation.data.success && (
            <p className={styles.success_message}>{registrationMutation.data.message}</p>
          )}
          {registrationMutation.isError && (
            <p className={styles.error_message}>
              {registrationMutation.error instanceof Error && registrationMutation.error.message}
            </p>
          )}
          <Button type='submit' onClick={() => registrationMutation.reset()}>
            Register
          </Button>
          <Link to='/signin' className={styles.sign_in}>
            Already have an account?.Sign in
          </Link>
        </form>
      </div>
    </div>
  )
}
export default Registration
