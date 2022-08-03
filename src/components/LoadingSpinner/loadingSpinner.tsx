import React from 'react'
import styles from './spinner.module.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  )
}
export { LoadingSpinner }
