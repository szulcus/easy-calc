// BASIC
import React, { Component } from 'react'
import styled, {css, keyframes} from 'styled-components'
import Lottie from 'react-lottie';
// ICONS
import {MdSettings} from 'react-icons/md'
import {FaReply} from 'react-icons/fa'
// IMAGES
import plus from './Data/Icons/plus.svg'
import minus from './Data/Icons/minus.svg'
import division from './Data/Icons/division.svg'
import cancel from './Data/Icons/cancel.svg'
import one from './Data/Icons/one.svg'
import two from './Data/Icons/two.svg'
import three from './Data/Icons/three.svg'
/*eslint-disable no-eval */

const CalcAppComponent = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Baloo&display=swap');
	font-family: 'Baloo';


	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	height: calc(var(--vh, 1vh) * 100);
	padding: 30px;
	font-size: 35px;
	letter-spacing: 3px;
`
const PointsElement = styled.div`
	font-size: 25px;
`
const Points = styled.strong`
	color: var(--color-decorative);
	font-size: 35px;
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
	font-family: 'Baloo';
	font-size: 30px;
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
	100% {
		transform: translate(40px, -50vh) scale(0);
		opacity: 0;
	}
`
const Reward = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: none;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	background-color: var(--color-decorative);
	border-radius: 100%;
	/* font-weight: bold; */
	color: var(--color-bg);
	animation: ${rewardAnimation} 0.8s both;
	${props =>
		props.preview &&
		css`
			display: flex;
		`
	};
`
const rotate = keyframes`
	from {
		transform: rotate(-30deg);
		opacity: 0;
	}
	to {
		transform: rotate(0);
		opacity: 1;
	}
`
const SettingsButton = styled(MdSettings)`
	animation: ${rotate} 0.5s 0.3s both;
`
const Settings = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: none;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	background-color: var(--color-dark);
	${props =>
		props.preview &&
		css`
			display: flex;
		`
	};
`
const Title = styled.h3`
	text-align: center;
	margin: 30px 0;
`
const Section = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100% - 50px);
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0;
	}
`
const CheckBox = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
const Choise = styled.img`
	width: 60px;
	height: 60px;
	margin: 10px;
	padding: 0;
	:hover {
		cursor: pointer;
	}
`
const Back = styled(FaReply)`
	display: block;
	margin-top: 20px;
	:hover {
		cursor: pointer;
	}
`
class CalcApp extends Component {
	state = {
		firstNumber: null,
		secondNumber: null,
		result: null,
		maxValue: 100,
		sign: '+',
		good: false,
		level: 1,
		negativeNumbers: true,
		points: 0,
		showSettings: false
	}
	componentDidMount() {
		this.randomNumbers();
	}
	randomNumbers = () => {
		let firstNumber = 0;
		let freeSpace = 0;
		if (this.state.level === 1) {
			if (this.state.sign === '+' || this.state.sign === '-') {
				firstNumber = Math.ceil((Math.random() - 0.5) * (this.state.maxValue / 5));
				freeSpace = this.state.maxValue / 5;
			}
			else if (this.state.sign === '*' || this.state.sign === '/') {
				firstNumber = Math.ceil((Math.random() - 0.5) * (this.state.maxValue / 10));
				freeSpace = this.state.maxValue / 10;
			}
			console.log(freeSpace);
		}
		else if (this.state.level === 2) {
			if (this.state.sign === '+' || this.state.sign === '-') {
				firstNumber = Math.ceil((Math.random() - 0.5) * this.state.maxValue);
				freeSpace = this.state.maxValue;
			}
			else if (this.state.sign === '*' || this.state.sign === '/') {
				firstNumber = Math.ceil((Math.random() - 0.5) * (this.state.maxValue / 10));
				freeSpace = this.state.maxValue / 10;
			}
			console.log(freeSpace);
		}
		else if (this.state.level === 3) {
			if (this.state.sign === '+' || this.state.sign === '-') {
				firstNumber = Math.ceil((Math.random() - 0.5) * (this.state.maxValue - firstNumber) * 2);
				freeSpace = this.state.maxValue - firstNumber;
			}
			else if (this.state.sign === '*' || this.state.sign === '/') {
				firstNumber = Math.ceil((Math.random() - 0.5) * (this.state.maxValue / 5));
				freeSpace = this.state.maxValue / 5;
			}
			console.log(freeSpace);
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
				this.randomNumbers();
				document.getElementById('input').value = '';
				setTimeout(() => {
					this.setState({good: false, points: this.state.points + 1});
				}, 400)
			}, 400)
		}
	}
	showSettings = () => {
		!this.state.showSettings ? this.setState({showSettings: true}) : this.setState({showSettings: false});
	}
	setLevel = () => {

	}
	setActivity = () => {

	}
	render() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
		return (
			<CalcAppComponent>
				<PointsElement>Punkty: <Points>{this.state.points}</Points></PointsElement>
				<Equation>
					<Number>{this.state.firstNumber}</Number>
					<Sign>{this.state.sign}</Sign>
					<Number>{!this.state.secondNumber ? '0' : this.state.secondNumber.toString().replace(/-[0-9]+/g, x => `(${x})`)}</Number>
					{/* <Number>{!this.state.secondNumber ? '0' : `${this.state.secondNumber}`}</Number> */}
					<Sign>=</Sign>
					<Input id="input" onChange={this.check} type="number" />
				</Equation>
				{/* ffd700  eec600 */}
				<div>
					{/* <Number>{this.state.result}</Number> */}
					<SettingsButton onClick={this.showSettings} />
					{/* <button onClick={this.randomNumbers}>choose</button> */}
				</div>
				<Reward preview={this.state.good}>1</Reward>
				<Settings preview={this.state.showSettings}>
					{/* <h2>Ustawienia</h2> */}
					<Section>
						<Title>Trudność:</Title>
						<CheckBox>
							<Choise id="easy" src={one} alt="one" title="Łatwy" />
							<Choise id="medium" src={two} alt="two" title="Średni" />
							<Choise id="hard" src={three} alt="three" title="Trudny" />
						</CheckBox>
						<Title>Działanie:</Title>
						<CheckBox>
							<Choise id="addition " src={plus} alt="plus" title="Dodawanie" />
							<Choise id="subtraction " src={minus} alt="minus" title="Odejmowanie" />
							<Choise id="multiplication" src={cancel} alt="cancel" title="Mnożenie" />
							<Choise id="division " src={division} alt="division" title="Dzielenie" />
						</CheckBox>
						<Title>Ujemne znaki:</Title>
						<CheckBox>
							<Choise id="" src={cancel} alt="cancel" title="Mnożenie" />
							<Choise id="" src={division} alt="division" title="Dzielenie" />
						</CheckBox>
					</Section>
					<Back onClick={this.showSettings} />
					{/* <Back onClick={this.showSettings} /> */}
				</Settings>
			</CalcAppComponent>
		);
	}
}

// 

export default CalcApp