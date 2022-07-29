import { useFormik } from 'formik'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import * as Yup from 'yup'
import { Navigate } from 'react-router-dom'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().min(8),
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
      auth && auth.userSignIn.signIn(form.values.email, form.values.password)
    },
  })
  if (auth && auth.user !== null) {
    return <Navigate to='/' />
  }
  return (
    <div>
      <form
        onSubmit={form.handleSubmit}
      >
        <input
          placeholder='Enter your email'
          onChange={form.handleChange}
          value={form.values.email}
          name='email'
        />
        <input
          placeholder='Enter your password'
          onChange={form.handleChange}
          value={form.values.password}
          name='password'
          type='password'
        />
        <div >
          <button type='submit'>Sign in</button>
        </div>
      </form>
    </div>
  )
}
export default SignIn
