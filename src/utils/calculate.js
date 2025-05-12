/**
 *
 * @param {string} expression
 * @param {string[]} operators
 *@returns {{success:boolean, result:string, message:string}}
 */
export function calculate(expression, operators) {
	console.log("calculate called: ");
	// step: 1 -> create tokens from the expression
	// create array from the string:
	// const expressionArr = Array.from(expression);
	let len = expression.length;

	// return unsuccess, if the expression starts or ends with an operator
	if (
		operators.includes(expression[0]) ||
		operators.includes(expression[len - 1])
	) {
		return { success: false, message: "Malformed Expression" };
	}

	try {
		const tokens = getTokens(expression);
		console.log("tokens", tokens);

		const computedResult = evaluate(tokens);
		console.log("computedResult: ", computedResult);
		return { success: true, result: computedResult };
	} catch (error) {
		return { success: false, message: error.message };
	}

	function getTokens(expression) {
		let tokens = [];

		// skip if empty char found in the expression
		// for (let i = 0; i < len; i++) {}
		let i = 0;
		let si = 0;
		let prefix = ""; // in the expression the digit can only be prefixed with + or -
		// let ei = 0;
		while (i < len) {
			const curr = expression[i];

			if (isOperator(curr)) {
				const digit = expression.slice(si, i);
				const operator = expression[i];

				if (prefix === "-") {
					tokens.push(Number(digit) * -1);
				} else {
					tokens.push(Number(digit));
				}
				// reset the prefix
				prefix = "";
				tokens.push(operator);

				si = i + 1;
				// chekc if the char next to the operator is an operator too
				// if it is + or -, we can set it as prefix
				// else it is an malformed expression.
				if (isOperator(expression[si])) {
					console.log(
						"xtra-operator: ",
						expression[si],
						expression[si] !== "-"
					);
					if (expression[si] !== "-" && expression[si] !== "+") {
						throw new Error("malformed expression error");
					} else {
						prefix = expression[si];
					}
					si++;
					i++;
				}
			}
			i++;
		}
		// now push the last char into the tokens
		const digit = expression.slice(si, i);
		if (prefix === "-") {
			tokens.push(Number(digit) * -1);
		} else {
			tokens.push(Number(digit));
		}

		return tokens;
	}

	// function isDigit(char) {
	// 	return (
	// 		typeof char === "number" || (typeof char == "string" && !isNaN(char))
	// 	);
	// }

	function isOperator(char) {
		return operators.includes(char);
	}

	function evaluate(tokens) {
		// step:1 first we will cluclate for the multiplication and division
		const operatorMap = {
			"+": (a, b) => a + b,
			"-": (a, b) => a - b,
			"*": (a, b) => a * b,
			"/": (a, b) => a / b,
		};
		let len = tokens.length;
		for (let i = 0; i < len; i++) {
			if (tokens[i] == "*" || tokens[i] == "/") {
				const operator = tokens[i];
				const leftOperand = tokens[i - 1];
				const rightOperand = tokens[i + 1];

				const result = operatorMap[operator](leftOperand, rightOperand);

				// now set the result at the i-1 index and remove the items at i and i+1
				// since we are moving from left to right.
				tokens[i - 1] = result;
				tokens.splice(i, 2);
				console.log(result);
			}
		}

		// step: 2 then we will calculate for the addition and division.
		for (let i = 0; i < len; i++) {
			if (tokens[i] == "+" || tokens[i] == "-") {
				const operator = tokens[i];
				const leftOperand = tokens[i - 1];
				const rightOperand = tokens[i + 1];

				const result = operatorMap[operator](leftOperand, rightOperand);

				// now set the result at the i-1 index and remove the items at i and i+1
				// since we are moving from left to right.
				tokens[i - 1] = result;
				tokens.splice(i, 2);
				console.log(result);
			}
		}

		// at the end there wil only be 1 item remaining in the tokens which will be the result
		return tokens[0];
	}

	// step: 2 -> evaluate the expression
}
