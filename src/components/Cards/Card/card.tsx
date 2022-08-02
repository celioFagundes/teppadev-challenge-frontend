import React, { MouseEventHandler } from 'react'
import { IMedia } from '../../../../types/types'
import styles from './card.module.css'
import { FaGamepad } from 'react-icons/fa'
import { BiMoviePlay, BiTv } from 'react-icons/bi'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { deleteData } from '../../../lib/api'
import { Link } from 'react-router-dom'

interface ICardProps extends IMedia {
  deleteFn: MouseEventHandler<HTMLButtonElement>
  url: string
}

function Card(props: ICardProps) {
  const { id, name, genre, media_type, additional, status, deleteFn , url} = props

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.status} ${styles[status]}`}>{status}</p>
      <div className={styles.actions}>
        <Link className={styles.action} to ={url}>
          <AiOutlineEdit />
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
