import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { fetchMedias } from '../../lib/api'
import { AuthContext } from '../../contexts/auth'
import { Navigate } from 'react-router-dom'
interface IAdditionalInfo {
  name: string
  value: string
}
interface IMedia {
  name: string
  gender: string
  status: string
  additional: IAdditionalInfo[]
}
interface IMediasData {
  data: IMedia[]
}
interface Error {
  message?: string
}
function Home() {
  const auth = useContext(AuthContext)
  const { isLoading, isError, data, error } = useQuery<IMediasData, Error>(['medias'], fetchMedias)

  if (auth && auth.loading && auth.user === null) {
    return <Navigate to='/signin' />
  }
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  }
  return <h1>{JSON.stringify(data)}</h1>
}
export default Home
