// BASIC
import React, { Component } from 'react'
import styled, {css, keyframes} from 'styled-components'
import * as shuffle from 'fisher-yates'
// FIREBASE
import {db, auth} from '../../Config/firebase'
// ICONS
import {MdSettings} from 'react-icons/md'
import {FaReply} from 'react-icons/fa'
// IMAGES
import plus from '../../Data/Icons/plus.svg'
import minus from '../../Data/Icons/minus.svg'
import division from '../../Data/Icons/division.svg'
import cancel from '../../Data/Icons/cancel.svg'
import one from '../../Data/Icons/one.svg'
import two from '../../Data/Icons/two.svg'
import three from '../../Data/Icons/three.svg'
import hello from '../../Data/Images/hello.png'
// COMPONENTS
import LoginAd from './components/LoginAd'
/*eslint-disable no-eval */

const CalcAppComponent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100%;
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
	height: 50px;
	width: 80px;
	background-color: transparent;
	border: none;
	border-bottom: 5px solid var(--color-main);
	stroke-linecap: round;
	border-radius: 7px;
	text-align: center;
	color: var(--color-primary);
	font-size: 30px;
	font-family: 'Baloo';
	font-weight: bold;
	outline: none;
`
const Answers = styled.div`
	width: 90vw;
	max-width: 250px;
	display: grid;
	grid-template-columns: 1fr 1fr;
`
const fade = keyframes`
	from {
		opacity: 0;
		transform: scale(0.9);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
`
const Answer = styled.div`
	text-align: center;
	margin: 10px;
	padding: 5px;
	border: 2px solid var(--color-main);
	border-radius: 20px;
	transition: all 0.2s ease;
	animation: ${fade} 0.3s ease;
	:hover {
		background-color: var(--color-main);
		cursor: pointer;
		color: var(--color-bg);
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
		activeGame: 'addition',
		points: {
			addition: 0,
			division: 0,
			multiplication: 0,
			subtraction: 0
		},
		showSettings: false,
		userValue: null,
		disabled: [],
		answers: null,
		userId: null,
		hideAd: false
	}
	componentDidMount() {
		this.randomNumbers();
		this.setAnswers();
		auth.onAuthStateChanged(user => {
			if (user) {
				console.log(user);
				this.setState({userId: user.uid})
				db.collection('users').doc(user.uid).onSnapshot(snap => {
					this.setState({points: snap.data()['easy-calc'].points})
				})
			}
			else {
				console.log('not logged in');
			}
		})
	}
	randomNumbers = () => {
		this.setState({answers: null})
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
			// console.log(freeSpace);
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
			// console.log(freeSpace);
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
			// console.log(freeSpace);
		}
		// console.log(freeSpace);
		const secondNumber = Math.ceil((Math.random() - 0.5) * freeSpace);
		const result = eval(`firstNumber ${this.state.sign} secondNumber`);
		this.setState(() => {
			return {
				firstNumber,
				secondNumber,
				result
			};
		},
		() => {
			this.setAnswers();
		});
	}
	setAnswers = () => {
		const snare = [-10, 10, -1, 1, -2, 2, -5, 5]
		const ran1 = Math.floor(Math.random() * snare.length)
		const random1 = snare[ran1];
		const ran2 = Math.floor(Math.random() * (snare.length - 1))
		const random2 = snare.filter(x => x !== random1)[ran2];
		const ran3 = Math.floor(Math.random() * (snare.length - 2))
		const random3 = snare.filter(x => x !== random1 && x !== random2)[ran3];
		const answers = [
			this.state.result,
			this.state.result + random1,
			this.state.result + random2,
			this.state.result + random3
		];
		this.setState({answers: shuffle(answers)})
	}
	check = (e) => {
		// console.log(!this.state.disabled.includes(e.target.id));
		if (!this.state.disabled.includes(e.target.id)) {
			if(parseInt(e.target.value) === this.state.result || parseInt(e.target.id) === this.state.result) {
				this.setState({good: true});
				setTimeout(() => {
					this.randomNumbers();
					document.getElementById('input').value = '';
					setTimeout(() => {
						this.setState({
							good: false,
							disabled: []
						});
						if (this.state.userId) {
							db.collection('users').doc(this.state.userId).update({
								[`easy-calc.points.${this.state.activeGame}`]: this.state.points[this.state.activeGame] + 1
							})
						}
						else {
							this.setState(prevState => ({
								points: {
									...prevState.points,
									[this.state.activeGame]: this.state.points[this.state.activeGame] + 1
								}
							}))
						}
					}, 400)
				}, 400)
			}
			else {
				if (!isNaN(parseInt(e.target.id))) {
					document.getElementById(e.target.id).style.opacity = 0;
					document.getElementById(e.target.id).style.cursor = "default";
					this.setState({disabled: this.state.disabled.concat(e.target.id)})
				}
				if(this.state.points[this.state.activeGame] > 0) {
					this.setState({points: this.state.points - 1})
					if (this.state.userId) {
						db.collection('users').doc(this.state.userId).update({
							[`easy-calc.points.${this.state.activeGame}`]: this.state.points[this.state.activeGame] - 1
						})
					}
					else {
						this.setState(prevState => ({
							points: {
								...prevState.points,
								[this.state.activeGame]: this.state.points[this.state.activeGame] - 1
							}
						}))
					}
				}
			}
		}
		else {
			console.log("nie kklikaj");
		}
	}
	showSettings = () => {
		!this.state.showSettings ? this.setState({showSettings: true}) : this.setState({showSettings: false});
	}
	setLevel = () => {

	}
	setActivity = () => {

	}
	logIn = () => {
		this.props.history.push(`/login`);
	}
	closeAd = () => {
		this.setState({hideAd: true})
	}
	render() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
		return (
			<CalcAppComponent>
				<PointsElement>Punkty: <Points>{this.state.points[this.state.activeGame]}</Points></PointsElement>
				<Equation>
					<Number>{this.state.firstNumber}</Number>
					<Sign>{this.state.sign}</Sign>
					<Number>{!this.state.secondNumber ? '0' : this.state.secondNumber.toString().replace(/-[0-9]+/g, x => `(${x})`)}</Number>
					{/* <Number>{!this.state.secondNumber ? '0' : `${this.state.secondNumber}`}</Number> */}
					<Sign>=</Sign>
					<Input readOnly={true} id="input" onChange={this.check} />
				</Equation>
				<Answers>
					{!this.state.answers ? '...' : this.state.answers.map(answer => {
						return (
							<Answer id={answer} key={answer} onClick={this.check}>{answer}</Answer>
						)
					})}
				</Answers>
				<div>
					{/* <Number>{this.state.result}</Number> */}
					<SettingsButton onClick={this.showSettings} />
					{/* <button onClick={this.randomNumbers}>choose</button> */}
				</div>
				<Reward preview={this.state.good}></Reward>
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
				{/* {this.state.userId ? '' : <LoginAd>
					<AdTitle>Zapisz swoje osiągnięcia!</AdTitle>
					<AdImage src={hello} alt="hello" />
					<LogIn>Zaloguj się</LogIn>
					<Skip>Pomiń</Skip>
				</LoginAd>} */}
				{this.state.userId ? '' : <LoginAd onClick={this.logIn} onBack={this.closeAd} hide={this.state.hideAd} />}
			</CalcAppComponent>
		);
	}
}

// 

export default CalcApp