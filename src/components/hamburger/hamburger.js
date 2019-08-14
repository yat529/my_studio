import React, {Component} from 'react'
import Styles from './hamburger.module.css'

import StickyBox from '../stickyBox/stickyBox.js'

export default class Hamburger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive() {
    this.setState(prev => ({
      active: !prev
    }))
  }

  render() {
    let barCount = 5,
        Bars = [],
        customClasses = this.props.className,
        classNames = customClasses? customClasses + ' ' + Styles.hamburger : Styles.hamburger

    while(barCount > 0) {
      Bars.push(<div key={barCount.toString()}></div>)
      barCount --
    }

    return (
      <div className={customClasses}>
        <StickyBox>
          <div className={Styles.hamburger} onClick={this.toggleActive}>
            {Bars}
          </div>
        </StickyBox>
      </div>
    )
  }
}