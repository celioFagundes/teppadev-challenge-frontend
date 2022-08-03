import React, { useContext } from 'react'
import { FieldArray, FormikProvider } from 'formik'
import { FormContext, IFormContext } from '../../../contexts/formContext'
import { Button } from '../../Buttons'
import { Input } from '../../Inputs'
import styles from './additional.module.css'

function Additional() {
  const { form, handleErrorMessage, handleNextStep, handleNextStepIsDisable } = useContext(
    FormContext
  ) as IFormContext
  const { values } = form

  return (
    <div className={styles.step_media_type}>
      <FormikProvider value={form}>
        <FieldArray
          name='additional'
          render={arrayHelpers => {
            return (
              <div>
                <Button
                  onClick={() =>
                    arrayHelpers.push({
                      name: '',
                      value: '',
                    })
                  }
                >
                  Add new information
                </Button>
                {values.additional.map((info, index) => (
                  <div key={index}>
                    <div className={styles.info_inputs_wrapper}>
                      <Input
                        id={`additional.${index}.name`}
                        label='Name'
                        value={values.additional[index].name}
                        name={`additional.${index}.name`}
                        placeholder='Enter the info name'
                        errorMessage={handleErrorMessage(index, 'name')}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <Input
                        id={`additional.${index}.value`}
                        label='Value'
                        value={values.additional[index].value}
                        name={`additional.${index}.value`}
                        placeholder='Enter a information'
                        errorMessage={handleErrorMessage(index, 'value')}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <button
                        type='button'
                        onClick={() => arrayHelpers.remove(index)}
                        className={styles.info_delete_button}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          }}
        />
        <div className={styles.step_buttons}>
          <Button onClick={() => handleNextStep(1)} outline>
            Previous
          </Button>
          <Button onClick={() => handleNextStep(3)} disabled={handleNextStepIsDisable(3)}>
            Next
          </Button>
        </div>
      </FormikProvider>
    </div>
  )
}

export { Additional }
