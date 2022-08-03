import { useContext } from 'react'
import styles from './create.module.css'
import { LoadingSpinner } from '../../components/LoadingSpinner/loadingSpinner'
import { FormContext, IFormContext } from '../../contexts/formContext'
import { MediaType, NameGenre, Additional, MediaStatus } from '../../components/Form/'

const formSteps = [
  { step_id: 'media_type', step_title: 'Media Type' },
  { step_id: 'media_identification', step_title: 'Name and Genre' },
  { step_id: 'media_additional', step_title: 'Additional information' },
  { step_id: 'media_status', step_title: 'Media status' },
]
function CreateForm() {
  const { form, activeStepIndex, createMutation } = useContext(FormContext) as IFormContext

  return (
    <div>
      <div className={styles.content}>
        <h1 className={styles.step_title}>{formSteps[activeStepIndex].step_title}</h1>
        <form onSubmit= { form.handleSubmit}className={styles.form}>
          {activeStepIndex === 0 && <MediaType />}
          {activeStepIndex === 1 && <NameGenre />}
          {activeStepIndex === 2 && <Additional />}
          {activeStepIndex === 3 && <MediaStatus />}
        </form>
      </div>
      {createMutation.isError && (
        <p className={styles.error_message}>
          {createMutation.error instanceof Error && createMutation.error.message}
        </p>
      )}
      {createMutation.isLoading && <LoadingSpinner />}
    </div>
  )
}
export default CreateForm
