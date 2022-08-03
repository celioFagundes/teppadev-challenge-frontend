import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './button_link.module.css'

interface IButtonLinkProps {
  toUrl: string
  toText: string
}
function ButtonLink(props: IButtonLinkProps) {
  const { toUrl, toText } = props
  return (
    <Link to={toUrl} className={styles.back}>
      <div className={styles.back_container}>
        <BsArrowLeft />
        <p>{toText}</p>
      </div>
    </Link>
  )
}
export { ButtonLink }
