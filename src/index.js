import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Global = createGlobalStyle`
	* {
		--color-main: lightgreen;
		--color-decorative: gold;
		--color-primary: lightgray;
		--color-secondary: gray;
		--color-bg: #202020;
		--color-light: white;
		--color-dark: black;
		box-sizing: border-box;
		::after,
		::before {
			box-sizing: border-box;
		}
	}
	@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');
	body {
		font-family: 'Oswald';
		background-color: var(--color-bg);
		color: var(--color-primary);
	}
`

ReactDOM.render(
	<>
		<Global />
		<App />
	</>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
