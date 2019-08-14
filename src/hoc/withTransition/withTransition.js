import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import './withTransition.css'

import LoadingScreen from '../../components/loading/loading.js'
import TransitionScreen from '../../components/transition/transition.js'


export default function withTransition(AppComp) {
  return class extends Component {
    constructor(props) {
      super(props)

      this.state = {
        loading: true,
        transition: false,
        ready: false
      }

      this.toggleLoadingState = this.toggleLoadingState.bind(this)
      this.toggleTransitionState = this.toggleTransitionState.bind(this)
      this.toggleReadyState = this.toggleReadyState.bind(this)
    }

    toggleLoadingState() {
      this.setState(prevState => ({
        loading: !prevState.loading
      }))
    }

    toggleReadyState() {
      this.setState(prevState => ({
        ready: !prevState.ready
      }))
    }
  
    toggleTransitionState() {
      this.setState(prevState => ({
        transition: !prevState.transition
      }))
    }
  
    componentDidMount() {
      setTimeout(() => this.setState({
        loading: false
      }), 1500)
    }

    render() {
      let {loading, transition, ready} = this.state

      return (
        <div className='transition-wrapper'>
          <CSSTransition in={loading} timeout={500} classNames='fade' 
            appear mountOnEnter unmountOnExit
            onExited={this.toggleTransitionState}
          >
            <LoadingScreen />
          </CSSTransition>

          <CSSTransition in={transition} timeout={{enter: 3000, exit: 0}} classNames='fade' 
            mountOnEnter unmountOnExit
            onEntered={this.toggleTransitionState}
            onExited={this.toggleReadyState}
          >
            <TransitionScreen />
          </CSSTransition>

          <CSSTransition in={ready} timeout={500} classNames='fade' mountOnEnter
            onEntered={elem => elem.classList.remove('fade-enter-done')}
          >
            <AppComp {...this.props} />
          </CSSTransition>
        </div>
      )
    }


  }
}