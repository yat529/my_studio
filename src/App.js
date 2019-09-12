import React, {Component} from 'react'
import './App.css'
import Landing from './sections/landing/landing.js'
import Main from './sections/main/main.js'
import Section from './components/section/section'

import withVisibilityCheck from './hoc/withVisibilityCheck/withVisibilityCheck'

const Page = withVisibilityCheck(Section)
const LandingPage = withVisibilityCheck(Landing)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollY: 0
    }

    this.animateScroll = this.animateScroll.bind(this)
    this.app = React.createRef()
  }

  animateScroll($parent, $target) {
    let scrollY = 0,
    current = 0,
    target = 0,
    changeRate = 0.075,
    rafID

    const setupScroll = () => {
      let $spaceHolder = document.createElement('div')

      $spaceHolder.classList.add('scrollSpaceHolder')
      $spaceHolder.style.height = `${$target.offsetHeight}px`
      $parent.appendChild($spaceHolder)
    }

    const updateScroll = () => {
      let diff = target - current,
          delta = Math.abs(diff) < 0.05 ? 0 : diff * changeRate

      if(delta) {
        current += delta
        rafID = requestAnimationFrame(updateScroll)
      } else {
        current = target
        cancelAnimationFrame(rafID)
      }

      scrollY = -parseFloat(current).toFixed(2)
      $target.style.setProperty('transform',`translateY(${scrollY}px)`)
    }

    const updateAnimation = () => {
      // update scroll
      target = window.scrollY || window.pageYOffset
      requestAnimationFrame(updateScroll)
    }

    setupScroll()

    window.addEventListener('scroll', updateAnimation, {passive: false})
  }

  componentDidMount() {
    let $root = document.getElementById('root'),
        $app = this.app.current

    this.animateScroll($root, $app)
  }

  render() {
    let {scrollY} = this.state

    return (
      <div id='App' className='App' ref={this.app}>
        <LandingPage></LandingPage>
        <Page>
          <h1>Page 1</h1>
        </Page>
        <Page>
          <h1>Page 2</h1>
        </Page>
        <Page>
          <h1>Page 3</h1>
        </Page>
      </div>
    )
  }
}

export default App;
