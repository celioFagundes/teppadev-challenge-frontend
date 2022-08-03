import { FormikConfig, FormikContextType, FormikErrors, useFormik } from 'formik'
import { ChangeEventHandler, createContext, FocusEventHandler, FormEvent, useState } from 'react'
import { IAdditionalInfo, IMediaInput } from '../../types/types'
import * as Yup from 'yup'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { createData, updateData } from '../lib/api'
import { useNavigate, useParams } from 'react-router-dom'

export interface IFormContext {
  form: FormikContextType<IMediaInput>
  activeStepIndex: number
  setActiveStepIndex: (index: number) => void
  handleNextStep: (nextStep: number) => void
  handleMediaType: (media_type: string) => void
  handleNextStepIsDisable: (nextStep: number) => boolean
  handleErrorMessage: (index: number, key: string) => string
  createMutation: UseMutationResult<string, unknown, IMediaInput, unknown>
  updateMutation: UseMutationResult<string, unknown, IMediaInput, unknown>
}
export const FormContext = createContext<IFormContext | null>(null)

interface ProviderProps {
  children: React.ReactNode
}
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

const FormProvider = ({ children }: ProviderProps) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const navigate = useNavigate()
  const params = useParams()
  console.log(params)

  const createMutation = useMutation((values: IMediaInput) => createData(`/medias/`, values), {
    onSuccess: () => navigate('/'),
  })
  const updateMutation = useMutation(
    (values: IMediaInput) => updateData(`/medias/${params.id}`, values),
    {
      onSuccess: () => navigate('/'),
    }
  )
  const handleMediaType = async (media_type: string) => {
    form.resetForm()
    await form.validateForm(form.values)
    form.setFieldValue('media_type', media_type)
  }
  const handleNextStep = (nextStep: number) => {
    setActiveStepIndex(nextStep)
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
    return false
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
    onSubmit: (values) => {
      if(params.id){
        console.log('chamou')
        return updateMutation.mutate(values)
      }
      return createMutation.mutate(values)
    },
  })
  return (
    <FormContext.Provider
      value={{
        form,
        activeStepIndex: activeStepIndex,
        setActiveStepIndex,
        handleMediaType,
        handleNextStep,
        handleNextStepIsDisable,
        handleErrorMessage,
        createMutation,
        updateMutation
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
export default FormProvider
