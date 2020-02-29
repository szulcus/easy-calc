// BASIC
import React, { Component } from 'react'
import styled, {css, keyframes} from 'styled-components'
import Lottie from 'react-lottie';
// import rewardAnimation from './Components/Data/433-checked-done.json'

/*eslint-disable no-eval */

const CalcAppComponent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	padding: 30px;
	font-size: 30px;
`
const PointsElement = styled.div`

`
const Points = styled.strong`
	color: var(--color-decorative);
`
const Equation = styled.div`
	max-width: 400px;
	width: 100vw;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`
const Number = styled.strong`
	color: var(--color-main);
	margin: 10px;
`
const Sign = styled.b``

const Input = styled.input`
	width: 100px;
	background-color: transparent;
	padding: 10px;
	margin: 10px;
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	color: var(--color-primary);
	border: 1px solid var(--color-secondary);
	border-radius: 20px;
	outline: none;
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
`
const rewardAnimation = keyframes`
	0% {
		transform: translate(-50%, -50%) scale(0.5);
		opacity: 0;
	}
	50% {
		transform: translate(-50%, -80px) scale(1);
		opacity: 1;
	}
	/* 60% {
		transform: translate(-10vh, -20vh) scale(0.5);
		opacity: 1;
	} */
	100% {
		transform: translate(30px, -50vh) scale(0);
		opacity: 0;
	}
`
const Reward = styled.div`
	display: none;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50px;
	height: 50px;
	background-color: var(--color-decorative);
	border-radius: 100%;
	animation: ${rewardAnimation} 0.8s both;
	${props =>
		props.preview &&
		css`
			display: block;
		`
	};
`
class CalcApp extends Component {
	state = {
		firstNumber: null,
		secondNumber: null,
		result: null,
		maxValue: 100,
		sign: '-',
		good: false,
		level: 1,
		negativeNumbers: true
	}
	componentDidMount() {
		this.randomNumbers();
	}
	randomNumbers = () => {
		const firstNumber = Math.round((Math.random() - 0.5) * this.state.maxValue);
		let freeSpace = 0;
		if (this.state.level === 1) {
			freeSpace = this.state.maxValue / 2;
		}
		else if (this.state.level === 2) {
			freeSpace = this.state.maxValue;
		}
		else if (this.state.level === 3) {
			freeSpace = this.state.maxValue - firstNumber;
		}
		console.log(freeSpace);
		const secondNumber = Math.ceil((Math.random() - 0.5) * freeSpace);
		const result = eval(`firstNumber ${this.state.sign} secondNumber`);
		this.setState({firstNumber, secondNumber, result});
	}
	check = (e) => {
		if(parseInt(e.target.value) === this.state.result) {
			this.setState({good: true});
			console.log("Brawo!!");
			setTimeout(() => {
				document.getElementById('input').value = '';
				this.setState({good: false});
				this.randomNumbers();
			}, 800)
		}
	}
	render() {
		const Animation = styled.div`
			display: none;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 50vmin;
			height: 50vmin;
			max-width: 250px;
			/* max-height: calc(100vh - 336px); */
			@media(min-height: 500px) {
				${props =>
					props.preview &&
					css`
						display: block;
					`
				};
			}
		`
		return (
			<CalcAppComponent>
				<PointsElement>Punkty: <Points>13</Points></PointsElement>
				<Equation>
					<Number>{this.state.firstNumber}</Number>
					<Sign>{this.state.sign}</Sign>
					<Number>{!this.state.secondNumber ? '' : this.state.secondNumber.toString().replace(/-[0-9]+/g, x => `(${x})`)}</Number>
					<Sign>=</Sign>
					<Input id="input" onChange={this.check} type="number" />
				</Equation>
				<div>
					<Number>{this.state.result}</Number>
					<button onClick={this.randomNumbers}>choose</button>
				</div>
				<Reward preview={this.state.good}/>
				{/* <Animation preview={this.state.good}>
					<Lottie
						speed={30}
						options={{
						loop: false,
						autoplay: true,
						animationData: rewardAnimation,
						rendererSettings: {
							preserveAspectRadio: 'xMidYMid slice'
						}}}
					/>
				</Animation> */}
			</CalcAppComponent>
		);
	}
}

export default CalcApp