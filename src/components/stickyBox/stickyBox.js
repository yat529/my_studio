import React, {Component} from 'react'
import Styles from './stickyBox.module.css'

export default class StickyBox extends Component {
  constructor(props) {
    super(props)

    let customClasses = props.rotate? Styles.rotateBox : ''

    customClasses = props.className ? customClasses + ' ' + props.className : customClasses

    this.state = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      freeze: false,
      debouce: false,
      thresholdX: 0,
      thresholdY: 0,
      styleClasses: Styles.stickyBox,
      customClasses
    }
  }

  handleEntry(evt) {
    let {clientX, clientY} = evt,
        {x, y} = this.state,
        {onEnter} = this.props

    let dx = clientX - x,
        dy = clientY - y

    this.freezeTimer = setTimeout(() => {
      this.setState({
        freeze: false
      })
    }, 200)

    this.debouceTimer = setInterval(() => {
      this.setState({
        debouce: false
      })
    }, 16)

    this.setState({
      thresholdX: Math.max(Math.abs(dx), Math.abs(dy)),
      thresholdY: Math.max(Math.abs(dx), Math.abs(dy)),
      styleClasses: Styles.stickyBox + ' ' + Styles.positionBox,
      freeze: true
    })

    // run cb
    if (onEnter && typeof onEnter === 'function') {
      onEnter(evt.currentTarget)
    }
  }

  handleOver(evt) {
    let {freeze, debouce} = this.state

    if (debouce) return
    if (freeze) return

    let {x, y, thresholdX, thresholdY} = this.state

    let dx = evt.clientX - x,
        dy = evt.clientY - y

    dx = (dx/3).toFixed(2)
    dy = (dy/3).toFixed(2)

    if (Math.abs(dx) > thresholdX || Math.abs(dy) > thresholdY) {
      this.resetBox()
      return
    }

    this.elem.style.setProperty('--x', dx+'px')
    this.elem.style.setProperty('--y', dy+'px')

    this.setState ({
      styleClasses: Styles.stickyBox + ' ' + Styles.moveBox,
      debouce: true
    })
  }

  resetBox(evt) {
    clearInterval(this.debouceTimer)
    let {dx, dy} = this.state,
        {onReset} = this.props

    this.elem.style.setProperty('--x', dx+'px')
    this.elem.style.setProperty('--y', dy+'px')

    this.setState({
      styleClasses: Styles.stickyBox + ' ' + Styles.resetBox
    })

    setTimeout(() => {
      this.elem.style.setProperty('--x', '0px')
      this.elem.style.setProperty('--y', '0px')

      this.setState({
        dx: 0,
        dy: 0,
        styleClasses: Styles.stickyBox
      })
    }, 300)

    // run cb
    if (evt && onReset && typeof onReset === 'function') {
      onReset(evt.currentTarget)
    }
  }

  setRef(elem) {
    this.elem = elem
  }

  getTransformOrigin(document) {
    let {x, y, width, height} = this.elem.getBoundingClientRect(),
        scrollX = this.getScrollLeft(document),
        scrollY = this.getScrollTop(document)

    this.setState({
      x: x + scrollX + width/2,
      y: y + scrollY + height/2
    })
  }

  getScrollLeft(document) {
    let t
    return (((t = document.documentElement) || (t = document.body.parentNode))
      && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
  }

  getScrollTop(document) {
    let t
    return (((t = document.documentElement) || (t = document.body.parentNode))
      && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
  }
  
  componentDidMount() {
    this.getTransformOrigin(document)
  }

  render() {
    let {styleClasses, customClasses} = this.state,
        rotate = this.props

    

    return ( 
      <div className={styleClasses}
        ref={elem => this.setRef(elem)}
        onMouseEnter={e => this.handleEntry(e)}
        onMouseLeave={e => this.resetBox(e)}
        onMouseMove={e => this.handleOver(e)}
      >
        <div className={customClasses}>
          {this.props.children}
        </div>
      </div>
    )
  }
}