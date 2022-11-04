import React,  { ImgHTMLAttributes } from 'react'
import styles from './Image.module.css'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image = (props: ImageProps) => {
  const [skeleton, setSkeleton] = React.useState(true)

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = event.target as HTMLImageElement
    target.style.opacity = "1"
    setSkeleton(false)
  }

  return (
    <div className={styles.wrapper}>
      { skeleton && <div className={styles.skeleton}></div> }
      <img className={styles.img} {...props} onLoad={handleImageLoad} />
    </div>
  )
}
