import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/functions'

const config = {
	apiKey: "AIzaSyCQuZoXusa7EqGQdCmmoQAi4DegvYs-GvY",
	authDomain: "easyword.firebaseapp.com",
	databaseURL: "https://easyword.firebaseio.com",
	projectId: "easyword",
	storageBucket: "easyword.appspot.com",
	messagingSenderId: "306976829495",
	appId: "1:306976829495:web:6264cf5c16071527f7cfb2",
	measurementId: "G-TCZZEXPQMN"
};

firebase.initializeApp(config);
firebase.firestore().settings({});

const db = firebase.firestore();
const auth = firebase.auth();

export {
	db,
	auth
}