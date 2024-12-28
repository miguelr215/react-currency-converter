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
	const [convertedAmt, setConvertedAmt] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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
				// console.log(data);
				setCountries(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchCountries();
	}, []);

	useEffect(
		function () {
			async function getFX() {
				try {
					if (inputCountry === outputCountry) {
						setConvertedAmt(inputQuery);
						return;
					}
					setIsLoading(true);
					const res = await fetch(
						`https://api.frankfurter.dev/v1/1999-01-04?base=${inputCountry}&symbols=${outputCountry}`
					);

					if (!res.ok) {
						throw new Error(
							'Something went wrong with fetching exchange rate'
						);
					}

					const data = await res.json();
					console.log('rates:', data);

					const converted = inputQuery * data.rates[outputCountry];
					setConvertedAmt(converted.toFixed(2));
					setIsLoading(false);
				} catch (error) {
					console.log(error);
				}
			}

			getFX();
		},
		[inputCountry, outputCountry, inputQuery]
	);

	return (
		<div className="App">
			<div className="converter">
				<h1>React Currency Converter</h1>
				<div className="input-wrapper">
					<span className="label">Enter Amount</span>
					<CurrencyInput
						inputQuery={inputQuery}
						setInputQuery={setInputQuery}
						disabled={isLoading}
					/>
					<CountrySelection
						countries={countries}
						country={inputCountry}
						setInput={handleSetInputCountry}
						disabled={isLoading}
					/>
				</div>
				<div className="output-wrapper">
					<p className="output">{convertedAmt}</p>
					<CountrySelection
						countries={countries}
						country={outputCountry}
						setInput={handleSetOutputCountry}
						disabled={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}

function CurrencyInput({ inputQuery, setInputQuery, disabled }) {
	return (
		<input
			type="number"
			className="currency-input"
			value={inputQuery}
			onChange={(e) => setInputQuery(Number(e.target.value).toFixed(2))}
			disabled={disabled}
		/>
	);
}

function CountrySelection({ countries, country, setInput, disabled }) {
	const countriesList = Object.keys(countries);

	return (
		<select
			className="countries"
			value={country}
			onChange={(e) => setInput(e.target.value)}
			disabled={disabled}
		>
			{countriesList.map((country) => (
				<option value={country} key={countriesList.indexOf(country)}>
					{country}
				</option>
			))}
		</select>
	);
}
