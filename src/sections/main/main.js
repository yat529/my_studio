import React, {Component} from 'react'
import Styles from './main.module.css'
import StickySection from '../../components/stickySection/stickySection.js'



export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entered: false,
      offsetTop: 0,
      transX: 0
    }

    this.stickyContainerRef = React.createRef()
    this.stickySectionRef = React.createRef()
  }

  // Handler for Intersection Observor
  handler(entries) {
    let $app = document.querySelector('#App'),
        {offsetTop, transX} = this.state,
        start = parseFloat(offsetTop),
        target = 0,
        current = start,
        speed = 1,
        rafId

    const updateScroll = (evt) => {
      target = parseFloat(evt.target.scrollTop)
      rafId = requestAnimationFrame(updateTransX)

      if (this.state.entered) {
        this.container.style.setProperty('--x', '-' + transX + 'px')
        this.setState({
          transX
        })
      }
    }

    const updateTransX = () => {
      let diff = target - current
      let delta = Math.abs(diff) < 0.25 ? 0 : diff * speed

      if (delta) {
        current += delta
        rafId = requestAnimationFrame(updateTransX)
      } else {
        current = target
        cancelAnimationFrame(rafId)
      }

      transX = (current - start).toFixed(2)
    }

    entries.forEach(entry => {
      if(entry.isIntersecting) {
        this.setState({
          entered: true
        })

        console.log('enter')
        $app.addEventListener('scroll', updateScroll, {passive: true})
      } else {
        this.setState({
          entered: false
        })
        // $app.removeEventListener('scroll', updateScroll, {passive: true})
        console.log('leave')
      }
    })

    
  }

  componentDidMount() {
    let container = this.stickyContainerRef.current.elem,
        stickySection = this.stickySectionRef.current

    let stickyWidth = stickySection.getBoundingClientRect().width,
        stickyHeight = stickySection.getBoundingClientRect().height,
        stickyOffsetTop = stickySection.getBoundingClientRect().top

    // console.log(stickySection.getBoundingClientRect())
    this.setState({
      offsetTop: stickyOffsetTop
    })

    container.style.height = stickyWidth + 'px'

    let threshold = stickyHeight/stickyWidth

    this.io = new IntersectionObserver(this.handler.bind(this), {
      root: null,
      threshold,
    })

    this.io.observe(container)

    // Cache the DOM node
    this.container = container
    this.stickySection = stickySection
  }

  componentWillUnmount() {
    this.io.disconnect()
  }

  render() {
    return (
    <StickySection className={Styles.stickyContainer} ref={this.stickyContainerRef}>
      <div className={Styles.stickySection} ref={this.stickySectionRef}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </StickySection>
    )
  }

}

