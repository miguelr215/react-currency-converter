import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
	const [inputQuery, setInputQuery] = useState(1);
	const [inputCountry, setInputCountry] = useState('USD');
	const [outputCountry, setOutputCountry] = useState('EUR');

	function handleSetInputCountry(country) {
		setInputCountry(country);
	}

	function handleSetOutputCountry(country) {
		setOutputCountry(country);
	}

	useEffect(function () {}, []);

	return (
		<div className="App">
			<div className="converter">
				<h1>React Currency Converter</h1>
				<div className="input-wrapper">
					<span className="label">Enter Amount</span>
					<CurrencyInput
						inputQuery={inputQuery}
						setInputQuery={setInputQuery}
					/>
					<CountrySelection
						country={inputCountry}
						setInput={handleSetInputCountry}
					/>
				</div>
				<div className="output-wrapper">
					<p>OUTPUT</p>
					<CountrySelection
						country={outputCountry}
						setInput={handleSetOutputCountry}
					/>
				</div>
			</div>
		</div>
	);
}

function CurrencyInput({ inputQuery, setInputQuery }) {
	return (
		<input
			type="number"
			className="currency-input"
			value={inputQuery}
			onChange={(e) => setInputQuery(e.target.value)}
		/>
	);
}

function CountrySelection({ country, setInput }) {
	return (
		<select
			className="countries"
			value={country}
			onChange={(e) => setInput(e.target.value)}
		>
			<option value="USD">USD</option>
			<option value="EUR">EUR</option>
			<option value="CAD">CAD</option>
			<option value="INR">INR</option>
		</select>
	);
}
