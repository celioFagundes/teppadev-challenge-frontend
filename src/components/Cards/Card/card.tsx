import React, { MouseEventHandler } from 'react'
import { IMedia } from '../../../types/types'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styles from './card.module.css'

interface ICardProps extends IMedia {
  deleteFn: MouseEventHandler<HTMLButtonElement>
  url: string
}

function Card(props: ICardProps) {
  const { name, genre, additional, status, deleteFn, url } = props

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.status} ${styles[status]}`}>{status}</p>
      <div className={styles.actions}>
        <Link className={styles.action} to={url}>
          <AiFillEdit />
        </Link>
        <button onClick={deleteFn} className={styles.action}>
          <AiFillDelete />
        </button>
      </div>
      <p className={styles.name}>{name}</p>
      <div className={styles.information}>
        <div className={styles.info}>
          <span className={styles.label}>Genre</span>
          <p className={styles.value}>{genre}</p>
        </div>
        {additional.map((adt, index) => (
          <div key={adt.name + index} className={styles.info}>
            <span className={styles.label}>{adt.name}</span>
            <p className={styles.value}>{adt.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Card }
