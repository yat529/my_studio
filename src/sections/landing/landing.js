import React, {Component} from 'react'
import Section from '../../components/section/section.js'
import Styles from './landing.module.css'

import StickyBox from '../../components/stickyBox/stickyBox.js'
import OutlineTextBox from '../../components/outlineTextBox/outlineTextBox.js'

import Hamburger from '../../components/hamburger/hamburger.js'

export default class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paraENG: 'Hello World!',
      paraCN: '你好!',
      lng: ['ENG', 'CN'],
      selectedLng: 0
    }

    this.selectParaByLng = this.selectParaByLng.bind(this)
  }

  selectParaByLng(index = 0) {
    let seperator = index? '' : ' ',
        state = this.state
    return state['para' + state.lng[index]].split(seperator)
  }

  render() {
    let en = this.selectParaByLng(0),
        cn = this.selectParaByLng(1)

    return (
      <Section className={Styles.landing}>
        <StickyBox className={Styles.boxStyle}>
          <OutlineTextBox content={en}></OutlineTextBox>
          <OutlineTextBox content={cn}></OutlineTextBox>
        </StickyBox>

        <Hamburger className={Styles.hamburger}></Hamburger>
      </Section>
    )
  }
}