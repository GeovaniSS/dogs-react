import axios from "axios"

export interface Comment {
  comment_author: string
  comment_content: string
  comment_ID: string
  user_id: string
}

export interface Photo {
  acessos: string
  author: string
  date: string
  id: number
  idade: string
  peso: string
  src: string
  title: string
  total_comments: string
}

interface TOKEN_POST {
  username: string
  password: string
}

interface USER_POST {
  username: string
  password: string
  email: string
}

interface PHOTO_POST {
  img: string
  nome: string
  peso: string
  idade: string
}

interface PHOTO_GET {
  total: number
  page: number
  user: number | string
}

interface COMMENT_POST {
  id: number
  token: string
  comment: string
}

interface PASSWORD_LOST_POST {
  login: string
  url: string
}

interface PASSWORD_RESET_POST {
  login: string
  password: string
  key: string
}

export const dogsApi = axios.create({
  baseURL: 'https://dogsapi.origamid.dev/json/'
})

export function USER_GET(token: string) {
  return {
    url: '/api/user', 
    options: {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export function USER_POST(data: USER_POST) {
  return {
    url: '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    }
  }
}

export function TOKEN_POST(data: TOKEN_POST) {
  return {
    url: '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    }
  }
}

export function TOKEN_VALIDATE_POST(token: string) {
  return {
    url: '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
}

export function PASSWORD_LOST_POST(data: PASSWORD_LOST_POST) {
  return {
    url: '/api/password/lost',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data)
    }
  }
}

export function PASSWORD_RESET_POST(data: PASSWORD_RESET_POST) {
  return {
    url: '/api/password/reset',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data)
    }
  }
}

export function PHOTO_POST(token: string, formData: FormData) {
  return {
    url: '/api/photo',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: formData
    }
  }
}

export function PHOTOS_GET({ total, page, user }: PHOTO_GET) {
  return {
    url: `/api/photo/?_total=${total}&_page=${page}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store'
    }
  }
}

export function PHOTO_GET(id: number) {
  return {
    url: `/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store'
    }
  }
}

export function COMMENT_GET(id: number) {
  return {
    url: `/api/comment/${id}`,
    options: {
      method: 'GET'
    }
  }
}

export function COMMENT_POST({ id, token, comment }: COMMENT_POST) {
  return {
    url: `/api/comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: JSON.stringify({ comment: comment })
    }
  }
}

export function PHOTO_DELETE(id: number, token: string) {
  return {
    url: `/api/photo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
}

export function STATS_GET(token: string) {
  return {
    url: '/api/stats',
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  }
}
