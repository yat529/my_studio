import React, {Component} from 'react'

export default function withVisibilityCheck(SectionComp) {
	return class extends Component {
		constructor(props) {
			super(props)

			let {root = null, rootMargin = '0px', threshold = 0.75} = this.props

			this.state = {
				options: {
					root,
					rootMargin,
					threshold,
				},
				entered: false,
				intersectionRatio: undefined
			}

			this.IO = null
			this.targetElem = null
		}

		createRef(elem) {
			this.targetElem = elem
		}

		createObserver() {
			let options = this.state.options,
					$target = this.targetElem

			this.IO = new IntersectionObserver(this.handleIntersect.bind(this), options)
			this.IO.observe($target)
		}

		handleIntersect(entries) {
			entries.forEach(entry => {
				// console.log(entry.intersectionRatio)
				if (entry.intersectionRatio >= 0.75) {
					// console.log('visible')
					this.setState({
						entered: true
					})
				} else {
					// console.log('hidden')
					this.setState({
						entered: false
					})
				}

				this.setState({
					intersectionRatio: entry.intersectionRatio
				})
			})
		}

		componentDidMount() {
			this.createObserver()
			// console.log(this.targetElem.getBoundingClientRect())
		}

		componentWillUnmount() {
			this.IO.disconnect()
		}

		render() {
			let {entered, intersectionRatio} = this.state
			return (
				<div className='visibilityContainer' ref={elem => this.createRef(elem)}>
					<SectionComp visible={entered} intersectionRatio={intersectionRatio} {...this.props}/>
				</div>
			)
		}
	}
}