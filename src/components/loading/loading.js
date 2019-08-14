import React from 'react'
import styles from './loading.module.css'
import Loader from '../loader/loader.js'

export default function InitScreen() {
  return (
    <div className={styles.ls}>
      <Loader />
    </div>
  )
}

