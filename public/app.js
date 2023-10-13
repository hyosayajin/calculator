import "./assets/css/style.css";

// *** LIB *** //

import DME from "../js/lib/DME";

// *** CLASS *** //

import Calculator from "../js/class/Calculator";
import StdFunc from "../js/lib/StdFunc";
import StdStr from "../js/lib/StdStr";

// *** TEMPS *** //

// *** RULES *** //

window.addEventListener("load", (e) => {
	const notDispo = StdFunc.Create(StdStr.div, { className: "not-dispo" });
	notDispo.textContent = "This page is not avalable on your devise";

	if (matchMedia("(min-width:1300px)").matches) {
		// # **Calculator instences**
		new Calculator(DME.calculatorWrapper);

		// # **Calculator adder**

		const calculatorColection = [];

		const scrollClassName = "scroll";

		DME.adder.addEventListener("click", function (e) {
			e.stopPropagation();

			calculatorColection.push(new Calculator(DME.calculatorWrapper));

			if (!DME.calculatorWrapper.classList.contains(scrollClassName)) DME.calculatorWrapper.classList.add(scrollClassName);
		});

		DME.minus.addEventListener("click", function (e) {
			e.stopPropagation();

			const longer = calculatorColection.length - 1;

			/**
			 * @type {Calculator}
			 */
			const lastCalculator = calculatorColection[longer];

			if (lastCalculator === undefined) return false;

			lastCalculator.frame.remove();

			calculatorColection.pop();

			if (calculatorColection.length === 0) DME.calculatorWrapper.classList.remove(scrollClassName);
		});
	} else StdFunc.SetChild(DME.app, notDispo);
});
