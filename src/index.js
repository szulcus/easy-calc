import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'
import Routes from './Routes'
import * as serviceWorker from './serviceWorker';

const Global = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Baloo&display=swap');
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
	body {
		font-family: 'Baloo', sans-serif;
		background-color: var(--color-bg);
		color: var(--color-primary);
		width: 100vw;
		height: 100vh;
		margin: 0;
	}
	button {
		font-family: 'Baloo', sans-serif;
		:focus {
			outline: none;
		}
	}
`

ReactDOM.render(
	<>
		<Global />
		<Routes />
	</>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
