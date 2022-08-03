import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import React, { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import { FormContext, IFormContext } from '../../../contexts/formContext'
import { Button } from '../../Buttons'
import { CheckboxInput } from '../../Inputs'
import styles from './media_type.module.css'

function MediaType() {
  const { form, handleMediaType, handleNextStep, handleNextStepIsDisable } = useContext(
    FormContext
  ) as IFormContext
  const { values, errors } = form

  return (
    <div className={styles.step_media_type}>
      <div>
        <CheckboxInput
          id='games-checkbox'
          text='Games'
          name='media_type'
          checked={values.media_type === 'Games'}
          onChange={() => handleMediaType('Games')}
        />
        <CheckboxInput
          id='movies-checkbox'
          text='Movies'
          name='media_type'
          checked={values.media_type === 'Movies'}
          onChange={() => handleMediaType('Movies')}
        />
        <CheckboxInput
          id='series-checkbox'
          text='Series'
          name='media_type'
          checked={values.media_type === 'Series'}
          onChange={() => handleMediaType('Series')}
        />
        {values.media_type === '' && <p className={styles.error_message}>{errors.media_type}</p>}
      </div>

      <Button onClick={() => handleNextStep(1)} disabled={handleNextStepIsDisable(1)}>
        Next
      </Button>
    </div>
  )
}

export { MediaType }
