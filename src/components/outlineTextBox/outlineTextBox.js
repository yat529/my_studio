import React, {Component} from 'react'
import Styles from './outlineTextBox.module.css'

export default class OutlineTextBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: props.content || [],
      customClasses: props.classNames
    }
  }

  render() {
    let {customClasses, content} = this.state

    return (
      <div className={customClasses}>
        {content.map((word, index) => <span className={Styles.outlineText} key={index.toString()}>{word}</span>)}
      </div>
    )
  }
}