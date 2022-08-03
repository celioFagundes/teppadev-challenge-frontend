import { getAuth } from 'firebase/auth'
import { IMediaInput, IRegistration } from '../types/types'

const API = 'https://teppadev-api.herokuapp.com'
const endpoint = (path: string): string => API + path

export const fetchData = async (path: string): Promise<any> => {
  const token = await getAuth().currentUser?.getIdToken()
  const response = await fetch(endpoint(path), {
    headers: {
      authToken: token ? token : '',
    },
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Error ,loading data failed')
  }
  const data = await response.json()
  return data
}
export const createData = async (path: string, values: IMediaInput) => {
  const token = await getAuth().currentUser?.getIdToken()
  const response = await fetch(endpoint(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authToken: token ? token : '',
    },
    body: JSON.stringify(values),
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Erro, create data failed')
  }
  const data = await response.text()
  return data
}
export const updateData = async (path: string, values: IMediaInput) => {
  const token = await getAuth().currentUser?.getIdToken()
  const response = await fetch(endpoint(path), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authToken: token ? token : '',
    },
    body: JSON.stringify(values),
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Erro, create data failed')
  }
  const data = await response.text()
  return data
}
export const deleteData = async (path: string) => {
  const token = await getAuth().currentUser?.getIdToken()
  const response = await fetch(endpoint(path), {
    method: 'DELETE',
    headers: {
      authToken: token ? token : '',
    },
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Error, delete data failed')
  }
  const data = await response.text()
  return data
}

export const register = async (path: string, values: IRegistration) => {
  const response = await fetch(endpoint(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Erro, register failed')
  }
  const data = await response.json()
  return data
}
