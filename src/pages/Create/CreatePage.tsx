import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ButtonLink } from '../../components/Buttons'
import { Stepper } from '../../components/Form'
import Layout from '../../components/Layout/layout'
import { AuthContext } from '../../contexts/auth'
import FormProvider from '../../contexts/formContext'
import styles from './create.module.css'
import CreateForm from './CreateForm'

function CreatePage() {
  const auth = useContext(AuthContext)
  if (auth && auth.user && auth.loading === null) {
    return <Navigate to='/' />
  }
  return (
    <Layout>
      <ButtonLink toUrl='/' toText='Home' />
      <FormProvider>
        <div className={styles.wrapper}>
          <Stepper />
          <CreateForm />
        </div>
      </FormProvider>
    </Layout>
  )
}
export default CreatePage
