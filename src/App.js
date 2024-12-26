import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
	const [countries, setCountries] = useState({
		USD: 1,
		CAD: 1,
		EUR: 1,
		INR: 1,
	});
	const [inputQuery, setInputQuery] = useState(1);
	const [inputCountry, setInputCountry] = useState('USD');
	const [outputCountry, setOutputCountry] = useState('EUR');

	function handleSetInputCountry(country) {
		setInputCountry(country);
	}

	function handleSetOutputCountry(country) {
		setOutputCountry(country);
	}

	useEffect(function () {
		async function fetchCountries() {
			try {
				const res = await fetch(
					`https://api.frankfurter.dev/v1/currencies`
				);

				if (!res.ok) {
					throw new Error(
						'Something went wrong with fetching countries'
					);
				}

				const data = await res.json();
				console.log(data);
				setCountries(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchCountries();
	}, []);

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
						countries={countries}
						country={inputCountry}
						setInput={handleSetInputCountry}
					/>
				</div>
				<div className="output-wrapper">
					<p>OUTPUT</p>
					<CountrySelection
						countries={countries}
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

function CountrySelection({ countries, country, setInput }) {
	const countriesList = Object.keys(countries);

	return (
		<select
			className="countries"
			value={country}
			onChange={(e) => setInput(e.target.value)}
		>
			{countriesList.map((country) => {
				return (
					<option
						value={country}
						key={countriesList.indexOf(country)}
					>
						{country}
					</option>
				);
			})}
		</select>
	);
}
