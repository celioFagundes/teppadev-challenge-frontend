import { useFormik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import styles from './registration.module.css'
import { Input } from '../../components/Inputs'
import { Button } from '../../components/Buttons'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required('Please, enter your email'),
  password: Yup.string().required('Please, enter your password'),
})
function SignIn() {
  const auth = useContext(AuthContext)
  const form = useFormik({
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async values => {
      console.log('chamou')
      auth && auth.userSignIn.signIn(values.email, values.password)
    },
  })
  if (auth && auth.user && auth.loading !== null) {
    return <Navigate to='/' />
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sign in with your account</h1>
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
          {auth && auth.userSignIn.signInStatus.success === false && (
            <p className={styles.error_message}>{auth.userSignIn.signInStatus.message}</p>
          )}
          <Button type='submit'>Sign In</Button>
          <Link to='/registration' className={styles.sign_in}>
            Doens't have an account? Register here
          </Link>
        </form>
      </div>
    </div>
  )
}
export default SignIn
