import React, { useContext } from 'react'

import { FormContext, IFormContext } from '../../../contexts/formContext'
import { Button } from '../../Buttons'
import { Input } from '../../Inputs'

import styles from './name_genre.module.css'

function NameGenre() {
  const { form, handleNextStep, handleNextStepIsDisable } = useContext(FormContext) as IFormContext
  const { values, errors } = form

  return (
    <div className={styles.step_media_type}>
      <div>
        <Input
          id='name-input'
          label='Name'
          name='name'
          value={values.name}
          placeholder='Enter a name'
          errorMessage={errors.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        <Input
          id='genre-input'
          label='Genre'
          name='genre'
          value={values.genre}
          placeholder='Enter a genre'
          errorMessage={errors.genre}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
      </div>

      <div className={styles.step_buttons}>
        <Button onClick={() => handleNextStep(0)} outline>
          Previous
        </Button>
        <Button onClick={() => handleNextStep(2)} disabled={handleNextStepIsDisable(2)}>
          Next
        </Button>
      </div>
    </div>
  )
}

export { NameGenre }
