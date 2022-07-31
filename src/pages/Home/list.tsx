import { useQuery } from '@tanstack/react-query'
import { fetchMedias } from '../../../lib/api'

interface IAdditionalInfo {
  name: string
  value: string
}
interface IMedia {
  id: string
  name: string
  gender: string
  status: string
  additional: IAdditionalInfo[]
}

interface Error {
  message?: string
}
function List() {
  const { isLoading, isError, data, error } = useQuery<IMedia[], Error>(['medias'], fetchMedias)
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
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  )
}
export default List
