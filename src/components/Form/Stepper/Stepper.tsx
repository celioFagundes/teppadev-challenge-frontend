import { useContext } from 'react'
import { FormContext, IFormContext } from '../../../contexts/formContext'
import styles from './stepper.module.css'

function Stepper() {
  const { activeStepIndex } = useContext(FormContext) as IFormContext
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.stepper_item} ${activeStepIndex >= 0 && styles.active_step}`}>
        1
      </div>
      <div className={`${styles.stepper_line} ${activeStepIndex > 0 && styles.active_line}`}></div>
      <div className={`${styles.stepper_item} ${activeStepIndex >= 1 && styles.active_step}`}>
        2
      </div>
      <div className={`${styles.stepper_line} ${activeStepIndex > 1 && styles.active_line}`}></div>
      <div className={`${styles.stepper_item} ${activeStepIndex >= 2 && styles.active_step}`}>
        3
      </div>
      <div className={`${styles.stepper_line} ${activeStepIndex > 2 && styles.active_line}`}></div>
      <div className={`${styles.stepper_item} ${activeStepIndex >= 3 && styles.active_step}`}>
        4
      </div>
    </div>
  )
}
export { Stepper }
