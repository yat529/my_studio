import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import Section from '../../components/section/section.js'
import Styles from './landing.module.css'

import StickyBox from '../../components/stickyBox/stickyBox.js'
import Hamburger from '../../components/hamburger/hamburger.js'

export default class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      navTransClasses: {
        appear: Styles.appear,
        appearActive: Styles.appearActive,
        appearDone: Styles.appearDone,
        enter: Styles.enter,
        enterActive: Styles.enterActive,
        enterDone: Styles.enterDone,
        exit: Styles.exit,
        exitActive: Styles.exitActive,
        exitDone: Styles.exitDone,
      }
    }
  }

  render() {
    let {navTransClasses} = this.state,
        {visible} = this.props
    console.log(visible)
    return (
      <Section className={Styles.landing}>
        <div className={Styles.container}>
          <div className={Styles.bgText}>
            <span>Soda</span>
            <span>E.</span>
          </div>

          <div className={Styles.fgText}>
            <div className={Styles.subtitle}>
              Hello Wold
            </div>
            
            <div className={Styles.title}>
              <StickyBox
              onEnter={elem => elem.childNodes[0].classList.add(Styles.hightlight)}
              onReset={elem => elem.childNodes[0].classList.remove(Styles.hightlight)}
              >
                Main Title
              </StickyBox>
            </div>
            
            <div className={Styles.subtitle}>
              Read our latest articles and posts on branding, design, technology, marketing and loads more.
            </div>
          </div>
        </div>

        <div className={Styles.cta}>
          <StickyBox className={Styles.box}></StickyBox>
        </div>

        <CSSTransition in={visible} timeout={500} classNames={navTransClasses} appear>
          <div className={Styles.svgLogo}>
            <StickyBox className={Styles.svgLogoSticky} rotate={true}>
              <svg viewBox="0 0 200 200">
                <path id="circle" stroke="none" fill="none"
                  d="
                    M 100, 100
                    m -75, 0
                    a 75,75 0 1,0 150,0
                    a 75,75 0 1,0 -150,0
                    "
                />
                <text>
                  <textPath xlinkHref="#circle" textLength='435'>
                    Soda E. &#160; Soda E. &#160; Soda E.
                  </textPath>
                </text>
              </svg>
            </StickyBox>
          </div>
        </CSSTransition>

        <CSSTransition in={visible} timeout={500} classNames={navTransClasses} appear>
          <Hamburger className={Styles.hamburger}></Hamburger>
        </CSSTransition>
      </Section>
    )
  }
}