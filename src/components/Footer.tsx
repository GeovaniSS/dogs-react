import styles from './Footer.module.css'
import { DogSvg } from './Svgs/DogSvg'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <DogSvg fill="#764701"/>
      <p>Dogs. Alguns direitos reservados</p>
    </footer>
  )
}
