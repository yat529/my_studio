import React, {Component} from 'react'
import Styles from './stickySection.module.css'

export default class StickySection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classNames: Styles.stickySection + (props.className ? ` ${props.className}` : '')
    }
  }

  render() {
    return (
      <section className={this.state.classNames} ref={elem => this.elem = elem}>
        <div className={Styles.sticky}>
          {this.props.children}
        </div>
      </section>
    )
  }
}