import React, {Component} from 'react'
import Styles from './section.module.css'

export default class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classNames: Styles.section + (props.className ? ` ${props.className}` : '')
    }
  }

  render() {
    return (
      <section className={this.state.classNames}>
        {this.props.children}
      </section>
    )
  }
}