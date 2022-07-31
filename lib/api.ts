import { getAuth } from 'firebase/auth'

export const fetchMedias = async () => {
  const token = await getAuth().currentUser?.getIdToken()
  const response = await fetch('http://localhost:3000/medias', {
    headers: {
      authToken: token ? token : '',
    },
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Não autorizado')
    }
    throw new Error('Error ao carregar dados')
  }
  const data = await response.json()
  return data
}
export const Register = async() =>{
  
}
