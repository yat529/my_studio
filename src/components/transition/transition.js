import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import styles from './transition.module.css'

class Transition extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stage: [true, false, false]
    }

    console.log(styles)
  }

  toggleStage(stageIndex) {
    let newStage = this.state.stage.map((stage, index) => {
      if(index === stageIndex) {
        return true
      }

      return false
    })

    console.log(newStage)

    this.setState({
      stage: newStage
    })
  }

  render() {
    let { stage } = this.state,
        lineClasses = {
          appear: styles['line-appear'],
          appearActive: styles['line-appear-active']
        },
        upPanelClass = {
          enter: styles['up-enter'],
          enterActive: styles['up-enter-active'],
          enterDone: styles['up-entered']
        },
        downPanelClass = {
          enter: styles['down-enter'],
          enterActive: styles['down-enter-active'],
          enterDone: styles['down-entered']
        },
        wipePanelClass = {
          enter: styles['wipe-enter'],
          enterActive: styles['wipe-enter-active'],
          enterDone: styles['wipe-entered']
        }

    return (
      <div className={styles.transition}>
        <CSSTransition in={stage[0]} timeout={{appear: 1300, enter: 0, exit: 0}} classNames={lineClasses} appear
          mountOnEnter
          onEntered={this.toggleStage.bind(this, 1)}
        >
          <div className={styles.line}></div>
        </CSSTransition>

        <CSSTransition in={stage[1]} timeout={{enter: 700, exit: 0}} classNames={upPanelClass} mountOnEnter>
          <div className={styles.up}></div>
        </CSSTransition>

        <CSSTransition in={stage[1]} timeout={{enter: 700, exit: 0}} classNames={downPanelClass} mountOnEnter
          onEntered={this.toggleStage.bind(this, 2)}
        >
          <div className={styles.down}></div>
        </CSSTransition>

        <CSSTransition in={stage[2]} timeout={{enter: 1000, exit: 0}} classNames={wipePanelClass} mountOnEnter>
          <div className={styles.wipe}></div>
        </CSSTransition>
      </div>
    )
  }

}

export default Transition