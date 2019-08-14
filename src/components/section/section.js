import React from 'react'
import Styles from './section.module.css'

export default function Section(props) {
  let classNames = Styles.section + (props.className ? ` ${props.className}` : '')

  return <section className={classNames}>{props.children}</section>
}