import { useState } from "react";
import "./App.css";
import { calculate } from "./utils/calculate";

const keys = [7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", "C", 0, "=", "/"];

function App() {
	const [expression, setExpression] = useState("");
	const [result, setResult] = useState("");
	const operators = ["+", "-", "*", "/"];

	const handleOnChange = (e) => {
		setExpression(e.target.value);
	};

	const handlePadClick = (e) => {
		const padClicked = e.target.value;
		let res;
		switch (padClicked) {
			case "C":
				// clear the input
				setExpression("");
				// clear the output
				setResult("");
				break;

			case "=":
				console.log("===");
				// do the calculation
				// constraints:
				// expression cannot end with +-*/

				res = calculate(expression, operators);
				if (res.success) {
					setResult(res.result);
				} else {
					setResult(res.message);
				}

				break;
			default:
				// keep updating the input string
				setExpression((prev) => (prev += padClicked));
				break;
		}
	};

	return (
		<div className="calculator">
			<h1>React Calculator</h1>
			<input type="text" value={expression} onChange={handleOnChange} />
			{result && <span className="output">{result}</span>}
			<div className="pad-grid">
				{keys.map((val) => (
					<button key={val} onClick={handlePadClick} value={val}>
						{val}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
