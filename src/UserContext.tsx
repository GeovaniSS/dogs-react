import React from 'react';

import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';
import { dogsApi } from './api';

interface UserStorageProps {
  children: React.ReactNode;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  username: string;
}

interface UserCtx {
  user: User | null, 
  login: boolean | null, 
  loading: boolean, 
  error: string | null,  
  userLogin: (username: string, password: string) => void,
  userLogout: () => void 
}

const UserContext = React.createContext<UserCtx>(null!);
export default UserContext

export const UserStorage = ({ children }: UserStorageProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [login, setLogin] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()
 
  const userLogout = React.useCallback(() => {
    setUser(null);
    setLogin(false);
    setError(null);
    setLoading(false);
    localStorage.removeItem('token');
    navigate('/login')
  }, [navigate])

  async function autoLogin() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return setLogin(false)
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_VALIDATE_POST(token);
      await dogsApi(url, options);
      await getUser(token);
    } catch (error) {
      userLogout()
    } finally {
      setLoading(false);
    }
  }

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const { data } = await dogsApi(url, options);
    setUser(data);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({ username, password });
      const response = await dogsApi(url, options);
      const { token } = response.data;
      localStorage.setItem('token', token); 
      await getUser(token);
      navigate('/account')
    } catch(error) {
      setUser(null)
      setLogin(false)
      setError('Error: Usuário inválido')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ 
        user, 
        login, 
        loading, 
        error,  
        userLogin, 
        userLogout, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
