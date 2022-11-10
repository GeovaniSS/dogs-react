import React from 'react'

import { useAxios } from '../../hooks/useAxios'
import { STATS_GET } from '../../api'

import { Error } from '../Helper/Error'
import { Loading } from '../Helper/Loading'
import { Head } from '../Helper/Head'
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

export const UserStats = () => {
  const { data, error, loading, request } = useAxios()

  React.useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem('token') as string
      const { url, options } = STATS_GET(token)
      await request(url, options)
    }
    fetchStats()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return null
  return (
    <React.Suspense fallback={<Loading />}>
      <Head title="Estatísticas" description='Página de estatísticas do perfil do usuário' />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  )
}
