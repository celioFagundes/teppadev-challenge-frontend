import React, { useContext } from 'react'
import {  Navigate } from 'react-router-dom'
import Layout from '../../components/Layout/layout'
import { AuthContext } from '../../contexts/auth'
import EditForm from './EditForm'
import { ButtonLink } from '../../components/Buttons'
import { Stepper } from '../../components/Form'
import FormProvider from '../../contexts/formContext'
import styles from './edit.module.css'


function EditPage() {
  const auth = useContext(AuthContext)
  if (auth && auth.loading && auth.user === null) {
    return <Navigate to='/signin' />
  }
  return (
    <Layout>
      <ButtonLink toUrl='/' toText='Home'/>
      <FormProvider>
        <div className={styles.wrapper}>
          <Stepper />
          <EditForm />
        </div>
      </FormProvider>
    </Layout>
  )
}
export default EditPage
