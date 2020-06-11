import React from 'react';
import logo from './logo.svg';
import './App.css';
import Variable from './symbolic-postfix/structure/Variable';
import Value from './symbolic-postfix/structure/Value';
import Addition from './symbolic-postfix/structure/operations/Addition';

function App() {
	console.log("Test");

	let var0 = new Variable("x");
	let val0 = new Value(4);
	let expr0 = new Addition([var0, val0]);
	console.log("Expr0: " + expr0.toString());
	
	let varMap = new Map<Variable, Value>();
	varMap.set(var0, Value.TWO);

	let expr0d = expr0.derivative("x");
	let expr0s = expr0.simplify(varMap);

	console.log("Expr0D: " + expr0d.toString());
	console.log("Expr0S: " + expr0s.toString());

	return (
		<div className="App">
			<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
			</header>
		</div>
	);
}

export default App;
