import styles from './PhotoDelete.module.css'

import { useAxios } from '../../hooks/useAxios'
import { PHOTO_DELETE } from '../../api'

interface PhotoDeleteProps {
  id: number
}

export const PhotoDelete = ({ id }: PhotoDeleteProps) => {
  const { loading, request } = useAxios()

  async function handleDeletePhoto() {
    const confirm = window.confirm("Tem certeza que deseja deletar?")

    if (confirm) {
      const token = localStorage.getItem('token') as string
      const { url, options } = PHOTO_DELETE(id, token)
      const { response } = await request(url, options)
      if (response.status) window.location.reload()
    }
  }

  return (
    <button className={styles.delete} onClick={handleDeletePhoto} disabled={loading}>
      {loading ? "Deletando...": "Deletar"}
    </button>
  )
}
