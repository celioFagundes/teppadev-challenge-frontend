import { useContext, useEffect } from 'react'
import styles from './edit.module.css'
import { LoadingSpinner } from '../../components/LoadingSpinner/loadingSpinner'
import { FormContext, IFormContext } from '../../contexts/formContext'
import { MediaType, NameGenre, Additional, MediaStatus } from '../../components/Form/'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchData, updateData } from '../../lib/api'
import { IMedia, IMediaInput } from '../../types/types'

const formSteps = [
  { step_id: 'media_type', step_title: 'Media Type' },
  { step_id: 'media_identification', step_title: 'Name and Genre' },
  { step_id: 'media_additional', step_title: 'Additional information' },
  { step_id: 'media_status', step_title: 'Media status' },
]
function EditForm() {
  const params = useParams()
  const { form, activeStepIndex, updateMutation } = useContext(FormContext) as IFormContext
  const { isLoading, isError, data, error } = useQuery<IMedia, Error>(['media'], () =>
    fetchData(`/medias/${params.id}`)
  )
  useEffect(() => {
    if (data) {
      form.setFieldValue('media_type', data.media_type)
      form.setFieldValue('name', data.name)
      form.setFieldValue('genre', data.genre)
      form.setFieldValue('additional', data.additional)
      form.setFieldValue('status', data.status)
      form.validateForm(data)
    }
  }, [data])
  if(isLoading){
    return <LoadingSpinner/>
  }
  
  return (
    <div>
      <div className={styles.content}>
        <h1 className={styles.step_title}>{formSteps[activeStepIndex].step_title}</h1>
        <form onSubmit={form.handleSubmit} className={styles.form}>
          {activeStepIndex === 0 && <MediaType />}
          {activeStepIndex === 1 && <NameGenre />}
          {activeStepIndex === 2 && <Additional />}
          {activeStepIndex === 3 && <MediaStatus />}
        </form>
      </div>
      {updateMutation.isLoading && <LoadingSpinner />}
    </div>
  )
}
export default EditForm
