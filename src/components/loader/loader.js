import React from 'react'
import LoaderSvgSrc from './aperture.svg'
import styles from './loader.module.css'

export default function Loader() {
  return <img src={LoaderSvgSrc} alt="loader" className={styles.loader} />
}