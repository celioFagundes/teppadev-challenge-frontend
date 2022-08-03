import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { IError, IMedia } from '../../types/types'
import { Card } from '../../components/Cards/index'
import { LoadingSpinner } from '../../components/LoadingSpinner/loadingSpinner'
import { deleteData, fetchData } from '../../lib/api'
import styles from './home.module.css'


function List() {
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery<IMedia[], IError>(['medias'], () =>
    fetchData('/medias')
  )
  const deleteMutation = useMutation((id: string) => deleteData(`/medias/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(['medias'])
    },
  })

  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  }
  return (
    <div className={styles.list}>
      {data.length === 0 && <h1>No items found</h1>}
      {data.map(item => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          media_type={item.media_type}
          genre={item.genre}
          additional={item.additional}
          status={item.status}
          deleteFn={() => deleteMutation.mutate(item.id)}
          url = {`/edit/${item.id}`}
        />
      ))}
    </div>
  )
}
export default List
