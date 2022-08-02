import { FieldArray, FormikProvider, useFormik } from 'formik'
import Layout from '../../components/Layout/layout'
import * as Yup from 'yup'
import { useContext, useEffect, useState } from 'react'

import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import styles from './create.module.css'
import { BsArrowLeft } from 'react-icons/bs'
import { FaGamepad } from 'react-icons/fa'
import { BiMoviePlay, BiTv } from 'react-icons/bi'
import { IAdditionalInfo, IMedia } from '../../../types/types'
import { IMediaInput } from '../../../types/types'
import { AuthContext } from '../../contexts/auth'
import { createData, fetchData, updateData } from '../../lib/api'
import { CheckboxInput, Input } from '../../components/Inputs'
import { Button } from '../../components/Buttons'
import { useQuery } from '@tanstack/react-query'

const CreateSchema = Yup.object().shape({
  name: Yup.string().required('Please , enter a name'),
  media_type: Yup.string().required('Please , select the media type'),
  genre: Yup.string().required('Please , enter a genre'),
  status: Yup.string().required('Please , select a status'),
  additional: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Please, enter the info name'),
      value: Yup.string().required('Enter the info value'),
    })
  ),
})

const formSteps = [
  { step_id: 'media_type', step_title: 'Media Type' },
  { step_id: 'media_identification', step_title: 'Name and Genre' },
  { step_id: 'media_additional', step_title: 'Additional information' },
  { step_id: 'media_status', step_title: 'Media status' },
]
function Edit() {
  const [currentStep, setCurrentStep] = useState(0)
  const params = useParams()
  const { isLoading, isError, data, error } = useQuery<IMedia, Error>(['media'], () =>
    fetchData(`/medias/${params.id}`)
  )
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const form = useFormik<IMediaInput>({
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      name: '',
      media_type: '',
      genre: '',
      status: '',
      additional: [],
    },
    validationSchema: CreateSchema,
    onSubmit: async values => {
      const updated = await updateData(`/medias/${params.id}`, values)
      if (updated) {
        navigate('/')
      }
    },
  })
  if (auth && auth.user && auth.loading === null) {
    return <Navigate to='/' />
  }
  const handleMediaType = async (media_type: string) => {
    await form.validateForm(form.values)
    form.setFieldValue('media_type', media_type)
  }
  const handleNextStep = (nextStep: number) => {
    setCurrentStep(nextStep)
  }
  const handleNextStepIsDisable = (nextStep: number) => {
    if (nextStep === 1) {
      return form.errors.media_type ? true : false
    }
    if (nextStep === 2) {
      return form.errors.name || form.errors.genre ? true : false
    }
    if (nextStep === 3) {
      return form.errors.additional ? true : false
    }
    if (nextStep === 4) {
      return form.errors.status ? true : false
    }
  }
  const handleErrorMessage = (index: number, key: string) => {
    if (!form.errors.additional?.[index]) {
      return ''
    }
    if (key === 'name') {
      return (form.errors.additional[index] as IAdditionalInfo).name
    }
    return (form.errors.additional[index] as IAdditionalInfo).value
  }
  useEffect(() => {
    if (data) {
      form.setFieldValue('media_type', data.media_type)
      form.setFieldValue('name', data.name)
      form.setFieldValue('genre', data.genre)
      form.setFieldValue('additional', data.additional)
      form.setFieldValue('status', data.status)
    }
  }, [data])
  return (
    <Layout>
      <div className={styles.wrapper}>
        <Link to={'/'} className={styles.back}>
          <div className={styles.back_container}>
            <BsArrowLeft />
            <p>Home</p>
          </div>
        </Link>
        <div className={styles.content}>
          <h1 className={styles.step_title}>{formSteps[currentStep].step_title}</h1>
          <form onSubmit={form.handleSubmit} className={styles.form}>
            {currentStep === 0 && (
              <div className={styles.step_media_type}>
                <div>
                  <CheckboxInput
                    id='games-checkbox'
                    text='Games'
                    name='media_type'
                    checked={form.values.media_type === 'Games'}
                    onChange={() => handleMediaType('Games')}
                  />
                  <CheckboxInput
                    id='movies-checkbox'
                    text='Movies'
                    name='media_type'
                    checked={form.values.media_type === 'Movies'}
                    onChange={() => handleMediaType('Movies')}
                  />
                  <CheckboxInput
                    id='series-checkbox'
                    text='Series'
                    name='media_type'
                    checked={form.values.media_type === 'Series'}
                    onChange={() => handleMediaType('Series')}
                  />
                  {form.values.media_type === '' && (
                    <p className={styles.error_message}>{form.errors.media_type}</p>
                  )}
                </div>

                <Button onClick={() => handleNextStep(1)} disabled={handleNextStepIsDisable(1)}>
                  Next
                </Button>
              </div>
            )}
            {currentStep === 1 && (
              <div className={styles.step_media_type}>
                <div>
                  <Input
                    id='name-input'
                    label='Name'
                    name='name'
                    value={form.values.name}
                    placeholder='Enter a name'
                    errorMessage={form.errors.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <Input
                    id='genre-input'
                    label='Genre'
                    name='genre'
                    value={form.values.genre}
                    placeholder='Enter a genre'
                    errorMessage={form.errors.genre}
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
            )}
            {currentStep === 2 && (
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
                          {form.values.additional.map((info, index) => (
                            <div key={index}>
                              <div className={styles.info_inputs_wrapper}>
                                <Input
                                  id={`additional.${index}.name`}
                                  label='Name'
                                  value={form.values.additional[index].name}
                                  name={`additional.${index}.name`}
                                  placeholder='Enter the info name'
                                  errorMessage={handleErrorMessage(index, 'name')}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                />
                                <Input
                                  id={`additional.${index}.value`}
                                  label='Value'
                                  value={form.values.additional[index].value}
                                  name={`additional.${index}.value`}
                                  placeholder='Enter a information'
                                  errorMessage={handleErrorMessage(index, 'value')}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                />
                                <button
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
            )}
            {currentStep === 3 && (
              <div className={styles.step_media_type}>
                <div>
                  <CheckboxInput
                    id='status-1-checkbox'
                    text={form.values.media_type === 'Games' ? 'To play' : 'To watch'}
                    name='status'
                    checked={form.values.status === 'To play' || form.values.status === 'To watch'}
                    onChange={() =>
                      form.setFieldValue(
                        'status',
                        form.values.media_type === 'Games' ? 'To play' : 'To watch'
                      )
                    }
                  />
                  <CheckboxInput
                    id='status-2-checkbox'
                    text={form.values.media_type === 'Games' ? 'Playing' : 'Watching'}
                    name='status'
                    checked={form.values.status === 'Playing' || form.values.status === 'Watching'}
                    onChange={() =>
                      form.setFieldValue(
                        'status',
                        form.values.media_type === 'Games' ? 'Playing' : 'Watching'
                      )
                    }
                  />
                  <CheckboxInput
                    id='status-3-checkbox'
                    text={form.values.media_type === 'Games' ? 'Played' : 'Watched'}
                    name='status'
                    checked={form.values.status === 'Played' || form.values.status === 'Watched'}
                    onChange={() =>
                      form.setFieldValue(
                        'status',
                        form.values.media_type === 'Games' ? 'Played' : 'Watched'
                      )
                    }
                  />
                  {form.values.status === '' && (
                    <p className={styles.error_message}>{form.errors.status}</p>
                  )}
                </div>
                <div className={styles.step_buttons}>
                  <Button onClick={() => handleNextStep(2)} outline>
                    Previous
                  </Button>
                  <Button
                    type='submit'
                    disabled={handleNextStepIsDisable(4)}
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  )
}
export default Edit
