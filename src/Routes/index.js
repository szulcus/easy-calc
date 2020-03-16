// BASIC
import React, {Component} from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
// PAGES
// import MainApp from '../Components/App'
import MainApp from '../Components/App'
import Registration from '../Components/Login/Registration'
import Login from '../Components/Login/LoginApp'
import UserProfile from '../Components/Login/UserProfile'

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={MainApp} />
					<Route path="/registration" exact component={Registration} />
					<Route path="/login" exact component={Login} />
					<Route path="/users/:uid" exact component={UserProfile} />
				</Switch>
			</Router>
		)
	}
}

export default App;