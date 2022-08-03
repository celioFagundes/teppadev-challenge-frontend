import React, { useContext } from 'react'
import { FormContext, IFormContext } from '../../../contexts/formContext'
import { Button } from '../../Buttons'
import { CheckboxInput } from '../../Inputs'
import styles from './media_status.module.css'

function MediaStatus() {
  const { form, handleNextStep, handleNextStepIsDisable } = useContext(FormContext) as IFormContext
  const { values, errors } = form

  return (
    <div className={styles.step_media_type}>
      <div>
        <CheckboxInput
          id='status-1-checkbox'
          text={values.media_type === 'Games' ? 'To play' : 'To watch'}
          name='status'
          checked={values.status === 'To play' || values.status === 'To watch'}
          onChange={() =>
            form.setFieldValue('status', values.media_type === 'Games' ? 'To play' : 'To watch')
          }
        />
        <CheckboxInput
          id='status-2-checkbox'
          text={values.media_type === 'Games' ? 'Playing' : 'Watching'}
          name='status'
          checked={values.status === 'Playing' || values.status === 'Watching'}
          onChange={() =>
            form.setFieldValue('status', values.media_type === 'Games' ? 'Playing' : 'Watching')
          }
        />
        <CheckboxInput
          id='status-3-checkbox'
          text={values.media_type === 'Games' ? 'Played' : 'Watched'}
          name='status'
          checked={values.status === 'Played' || values.status === 'Watched'}
          onChange={() =>
            form.setFieldValue('status', values.media_type === 'Games' ? 'Played' : 'Watched')
          }
        />
        {values.status === '' && <p className={styles.error_message}>{errors.status}</p>}
      </div>

      <div className={styles.step_buttons}>
        <Button onClick={() => handleNextStep(2)} outline>
          Previous
        </Button>
        <Button type='submit' disabled={handleNextStepIsDisable(4)}>
          Finish
        </Button>
      </div>
    </div>
  )
}

export { MediaStatus }
