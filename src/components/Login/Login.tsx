import styles from './Login.module.css';

import { Outlet } from 'react-router-dom';

export const Login = () => {
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Outlet />
      </div>
    </section>
  );
};
