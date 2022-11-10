import React from 'react'
import styles from './UserStatsGraphs.module.css'
import { VictoryPie, VictoryChart, VictoryBar } from "victory"

interface PhotoStats {
  id: number
  title: string
  acessos: string
}

interface GraphsPos {
  x: string
  y: number
}

interface UserStatsGraphsProps {
  data: PhotoStats[]
}

const UserStatsGraphs = ({ data }: UserStatsGraphsProps) => {
  const [graphs, setGraphs] = React.useState<GraphsPos[]>([])
  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    const totalAccess = data.reduce((acc, { acessos }) => acc + Number(acessos), 0)
    setTotal(totalAccess)

    const graphsPos = data.map(({ title, acessos }) => ({ x: title, y: Number(acessos) }))
    setGraphs(graphsPos)
  }, [])

  return (
    <section className={`animeLeft ${styles.graph}`}>
      <div className={`${styles.graphItem} ${styles.total}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie 
          data={graphs} 
          innerRadius={50} 
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }} 
          style={{ 
            data: {
              fillOpacity: .9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333'
            }
          }}  
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment='start' data={graphs} />
        </VictoryChart>
      </div>
    </section>
  )
}

export default UserStatsGraphs
