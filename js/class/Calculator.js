import StdFunc from "../lib/StdFunc";
import StdStr from "../lib/StdStr";
import Trigger from "./Trigger";

export default class Calculator {
	/**
	 * @type {HTMLElement}
	 */
	frame = StdFunc.Create(StdStr.div, { className: "calculator" });

	/**
	 * @type {HTMLElement}
	 */
	entries = StdFunc.Create("input", { className: "entries", type: "text" });

	/**
	 * @type {Array <string>}
	 */
	history = [];

	/**
	 * @type {Array <string>}
	 */
	historyList;

	keyboardKeys = {
		funcKeys: {
			clear: {
				value: "c",
				func: this.Clear.bind(this),
			},

			plusOperator: {
				value: "+",
				func: this.CheckOperator.bind(this),
				print: true,
			},

			minusOperator: {
				value: "-",
				func: this.CheckOperator.bind(this),
				print: true,
			},

			timesOperator: {
				value: "x",
				func: this.CheckOperator.bind(this),
				print: true,
			},

			divisionOperator: {
				value: "/",
				func: this.CheckOperator.bind(this),
				print: true,
			},
		},

		numbers: {
			zero: {
				value: "0",
				func: undefined,
				print: true,
			},

			one: {
				value: "1",
				func: undefined,
				print: true,
			},

			twoo: {
				value: "2",
				func: undefined,
				print: true,
			},

			three: {
				value: "3",
				func: undefined,
				print: true,
			},

			four: {
				value: "4",
				func: undefined,
				print: true,
			},

			five: {
				value: "5",
				func: undefined,
				print: true,
			},

			six: {
				value: "6",
				func: undefined,
				print: true,
			},

			seven: {
				value: "7",
				func: undefined,
				print: true,
			},

			eight: {
				value: "8",
				func: undefined,
				print: true,
			},

			nine: {
				value: "9",
				func: undefined,
				print: true,
			},
		},

		result: {
			equal: {
				value: "=",
				func: this.Calc.bind(this),
			},

			point: {
				value: ".",
				func: undefined,
				print: true,
			},

			del: {
				value: "←",
				func: this.Del.bind(this),
			},
		},
	};

	/**
	 *
	 * @param {HTMLElement} root
	 * @param {{className: string}} options
	 */
	constructor(root, options = { className: undefined }) {
		if (options.className != undefined && typeof options.className === "string") StdFunc.SetAttr(this.frame, { className: options.className });

		this.Clear();

		StdFunc.SetChild(this.frame, [this.entries]);

		this.CheckEntries();

		this.SetKeys(this.keyboardKeys).then((rsp) => {
			StdFunc.SetChild(this.frame, rsp.board);

			this.SetHistory();
		});

		this.ColorSwitch().then((rsp) => {
			StdFunc.SetChild(this.frame, rsp.colors);
		});

		StdFunc.SetChild(root, this.frame);
	}

	async SetKeys(keyboardKeys) {
		const allContainer = [];

		const allKeys = [];

		for (const key in keyboardKeys) {
			const container = StdFunc.Create();

			StdFunc.SetAttr(container, { className: key });

			if (Object.hasOwnProperty.call(keyboardKeys, key)) {
				const section = keyboardKeys[key];

				for (const key in section) {
					if (Object.hasOwnProperty.call(section, key)) {
						/**
						 * @type {{value: String, func: Function, print: boolean}}
						 */
						const currentKey = section[key];

						const button = StdFunc.Create(StdStr.button);
						StdFunc.SetAttr(button, { className: key });

						button.textContent = currentKey.value;

						button.addEventListener("click", (e) => {
							e.stopPropagation();

							if (currentKey.func !== undefined && currentKey.func(currentKey.value) === false) return false;

							if (currentKey.print) this.Print(currentKey.value);
						});

						StdFunc.SetChild(container, button);

						allKeys.push(button);
					}
				}
			}

			allContainer.push(container);
		}

		const keyboard = StdFunc.Create(StdStr.div, { className: "keyboard" });
		StdFunc.SetChild(keyboard, allContainer);

		return { board: keyboard, containers: allContainer, keys: allKeys };
	}

	async SetDefault() {
		this.OperatorsArray = [];
		this.result = 0;
	}

	async Clear() {
		this.entries.value = 0;
	}

	async Del() {
		/**
		 * @type {String}
		 */
		const value = this.entries.value;

		const currentValue = value.split("");
		const removedElement = currentValue[currentValue.length - 1];
		currentValue.pop();

		const newValue = currentValue.join("");

		this.entries.value = newValue;

		return removedElement;
	}

	/**
	 *
	 * @param {string} word
	 */
	async Print(word) {
		const value = this.entries.value;

		parseInt(value) === 0 ? (this.entries.value = word) : (this.entries.value = this.entries.value + word);
	}

	CheckEntries() {
		this.entries.addEventListener("keydown", (e) => {
			e.stopPropagation();

			if (!Array.isArray(e.key.match(/^[A-Za-z]{2,}|[\d\.\+\-\/x]/))) e.preventDefault();

			if (/\.|\+|-|\/|x/.test(e.key)) {
				if (this.CheckOperator(e.key) === false) e.preventDefault();
			}

			if (e.key === "Enter") this.Calc();
		});
	}

	CheckOperator(operator) {
		/**
		 * @type {string}
		 */
		const value = this.entries.value;

		const end = value.match(/[\+\-\x/]$/);

		if (Array.isArray(end)) {
			if (end[0] === operator) return false;
			else {
				this.Del();
			}
		}
	}

	OperatorsArray = [];
	/**
	 * @type {number}
	 */
	result = 0;

	async Calc() {
		const funcKeys = this.keyboardKeys.funcKeys;

		/**
		 * @type {string}
		 */
		const calc = this.entries.value;

		const nope = calc.match(/^(\d+[\+-\/x])+\d+$|^\.(\d+[\+-\/x])+\d+$/g);

		try {
			if (!Array.isArray(nope)) {
				if (parseInt(calc) === 0) throw this.CalculatorException(20);
				else throw this.CalculatorException(10);
			}

			const part = calc.split(/\+|-|x|\//).map((x) => parseFloat(x));

			if (part[0].toString() === calc) throw this.CalculatorException(10);

			this.result = part[0];

			part.shift();

			const operators = calc.match(/[\+\-\/x]/g);
			this.OperatorsArray = operators;

			for (let i = 0; i < this.OperatorsArray.length; i++) {
				const operator = this.OperatorsArray[i];

				let currentValue;

				switch (operator) {
					case funcKeys.plusOperator.value:
						currentValue = Math.round((this.result + part[i]) * 1000) / 1000;

						break;

					case funcKeys.minusOperator.value:
						currentValue = Math.round((this.result - part[i]) * 1000) / 1000;

						break;

					case funcKeys.timesOperator.value:
						currentValue = Math.round(this.result * part[i] * 1000) / 1000;

						break;

					case funcKeys.divisionOperator.value:
						currentValue = Math.round((this.result / part[i]) * 1000) / 1000;

						break;

					default:
						break;
				}

				this.result = currentValue;
			}

			if (Number.isNaN(this.result)) throw this.CalculatorException(30);
			else {
				this.entries.value = this.result;

				this.SetHistoryElement(`${calc} = ${this.result}`);
			}

			this.SetDefault();
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * @type {HTMLElement}
	 */
	cBlackButton = StdFunc.Create(StdStr.button, { id: "cBlack", className: "c-black" });

	/**
	 * @type {HTMLElement}
	 */
	cWhiteButton = StdFunc.Create(StdStr.button, { id: "cWhite", className: "c-white" });

	/**
	 * Allow to switch the calculator's color
	 */
	async ColorSwitch() {
		/**
		 * @type {HTMLElement}
		 */
		const colorsContainair = StdFunc.Create(StdStr.div, { className: "color-switch" });

		/**
		 *
		 * @param {HTMLElement} target
		 * @param {HTMLElement} trigger
		 */
		const initColor = (target, trigger) => {
			/**
			 *
			 * @param {MouseEvent} e
			 * @returns {void}
			 */
			const onClickRules = (e) => {
				e.stopPropagation();

				const activeElement = trigger.parentElement.querySelector(`.${StdStr.active}`);

				if (activeElement === null || activeElement === trigger) return false;
				else {
					const activeElementId = activeElement.getAttribute("id");

					target.classList.remove(activeElementId);

					activeElement.classList.remove(StdStr.active);
				}
			};

			const triggerId = trigger.getAttribute("id");

			trigger.addEventListener("click", onClickRules);

			StdFunc.SetChild(colorsContainair, trigger);

			return new Trigger(trigger, target, { className: triggerId });
		};

		return {
			// Black color
			blackColor: initColor(this.frame, this.cBlackButton),

			// White color
			whiteColor: initColor(this.frame, this.cWhiteButton),

			// colors container
			colors: colorsContainair,
		};
	}

	async SetHistory() {
		const history = StdFunc.Create(StdStr.div, { className: "history" });

		this.historyList = StdFunc.Create(StdStr.ul);

		StdFunc.SetChild(history, this.historyList);
		StdFunc.SetChild(this.frame, history);

		return history;
	}

	/**
	 *
	 * @param {String | Number} content
	 */
	async SetHistoryElement(content, print = true) {
		const historyElement = StdFunc.Create(StdStr.li, { className: "history-items" });

		/**
		 *
		 * @param {MouseEvent} e
		 */
		const historyElementEvent = (e) => {
			e.stopPropagation();
			if (print) {
				/**
				 * @type {string}
				 */
				const calc = content.split("=", 1)[0].trimEnd();
				this.Clear();
				this.Print(calc);
			}
		};

		historyElement.addEventListener("click", historyElementEvent);

		const backButton = StdFunc.Create(StdStr.button, { className: "remove" });
		backButton.textContent = "X";

		backButton.addEventListener("click", (e) => {
			e.stopPropagation();

			historyElement.removeEventListener("click", historyElementEvent);

			backButton.parentElement.remove();
		});

		const span = StdFunc.Create(StdStr.span);
		span.textContent = content;

		StdFunc.SetChild(historyElement, [backButton, span]);

		StdFunc.SetChild(this.historyList, historyElement);
	}

	// # Calculator exception

	/**
	 *
	 * @param {Number} key Error code
	 * @param {String} message
	 * @returns
	 */
	CalculatorException(key, errorMessage = "") {
		switch (key) {
			case 10:
				key = "Your calc is not valid";

				break;

			case 20:
				key = "Your calc is NULL";

				break;

			case 30:
				key = 'Your calc contains a "not a nomber" value. Check your calc and try again';

				break;

			default:
				break;
		}

		this.SetHistoryElement(`${key} ${errorMessage}`, false);

		return key;
	}
}
