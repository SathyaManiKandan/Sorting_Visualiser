import React, { Component } from 'react';

// Components
import Bars from './components/Bars.js';

// Algorithms
import selectionSort from './Algorithm/selectionsort';

import './App.css';

class App extends Component {
	state = {
		array: [],
		steps: [],
		colorKey: [],
		colors: [],
		timouts: [],
		currentStep: 0,
		count: 10,
		delay: 300,
		algorithm: '',
	};

	componentDidMount() {
		this.generateElements();
	}

	handleStart = () => {
		let steps = this.state.steps;
		let colors = this.state.colors;

		
		let i = 0;
		while (i < steps.length ) {
			 setTimeout(() => {
				let currentStep = this.state.currentStep;
				this.setState({
					array: steps[currentStep],
					colorKey: colors[currentStep],
					currentStep: currentStep + 1,
				});
				
			}, this.state.delay*i );
			i++;
		}

		
	};

	generateSteps = () => {
		let array = this.state.array.slice();
		let steps = this.state.steps.slice();
		let colors = this.state.colors.slice();

		selectionSort(array, 0, steps, colors);
		this.setState({
			steps: steps,
			colors: colors,
		});
	};

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	

	clearColorKey = () => {
		let blank = new Array(this.state.count).fill(0);
		this.setState({ colorKey: blank, colors: [blank] });
	};

	generateElements = () => {
  
    this.clearColorKey()

		let count = this.state.count;
		let arr = [];

		for (let i = 0; i < count; i++) {
			arr.push(this.generateRandomNumber(50, 200));
		}

		this.setState(
			{
				array: arr,
				steps: [arr],
				count: count,
				currentStep: 0,
			},
			() => this.generateSteps()
		);

		console.log(arr);
	};

	changeArray = (index, value) => {
		let array = this.state.array;
		array[index] = value;
		this.setState({
			array: array,
			steps: [array],
			currentStep: 0,
		}, () => this.generateSteps());
    
	};

	render() {
		const bars = this.state.array.map((value, index) => {
			return (
				<Bars
					key={index}
					index={index}
					length={value}
					colorKey={this.state.colorKey[index]}
					changeArray={this.changeArray}
				/>
			);
		});
		return (
			<div className='app'>
				<div className='frame'>
					<div className='card container'>{bars}</div>
				</div>
				
				<button onClick={this.handleStart} className='stBtn'>Start</button>
			
			</div>
		);
	}
}

export default App;