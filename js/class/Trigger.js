import StdStr from "../lib/StdStr";
import Mother from "./Mother";

export default class Trigger {
	/**
	 * @type {HTMLElement}
	 */
	#trigger;
	/**
	 * @type {HTMLElement | Array <HTMLElement>}
	 */
	#target;
	/**
	 * @type {String}
	 */
	#className;
	/**
	 * @type {String}
	 */
	#triggerClassName;
	/**
	 * @type {String}
	 */
	#triggerKey;

	/**
	 * Click on --trigger-- have add a className in element's classList and her trigger's classList.
	 * If the params --option.className-- is undefined the className will be active by default.
	 * @param {HTMLElement} trigger
	 * @param {HTMLElement | Array <HTMLElement>} target
	 * @param {{ className: string, triggerClassName: string, keyToTtrigging: string }} options
	 */
	constructor(trigger, target, options = { className, triggerClassName, keyToTtrigging }) {
		(async () => {
			this.#target = target;
			this.#trigger = trigger;
			this.#triggerClassName = options.triggerClassName ?? "active";

			if (options.className === undefined) {
				this.#className = "active";
			} else {
				this.#className = options.className;
			}

			if (options.keyToTtrigging === undefined) {
				this.#triggerKey = "active";
			} else {
				this.#triggerKey = options.keyToTtrigging;
			}
		})().then((rsp) => {
			this.#Trigging();
		});
	}

	async #Rules() {
		if (Array.isArray(this.#target)) {
			this.#target.forEach((element) => {
				element.classList.toggle(this.#className);
			});
		} else {
			this.#target.classList.toggle(this.#className);
		}

		this.#trigger.classList.toggle(this.#triggerClassName);
	}

	async #Trigging() {
		if (this.#className === undefined) {
			this.#className = "active";
		}

		if (this.#triggerKey === undefined) {
			throw new Exception("The trigger key is not defined");
		} else {
			window.addEventListener("keydown", (e) => {
				if (e.key === this.#triggerKey) {
					this.#Rules();
				}
			});
		}

		this.#trigger.addEventListener("click", (e) => {
			e.stopPropagation();

			this.#Rules();
		});
	}

	/**
	 *
	 * @param {HTMLElement | Array <HTMLElement>} elements
	 * @param {{className: string, plus: Function }} options
	 */
	static async Trigg(elements, options = { className: undefined, plus: () => {} }) {
		/**
		 *
		 * @param {Event} e
		 */
		const onClickElement = function (e) {
			e.stopPropagation();

			options.plus(this);

			this.classList.toggle(options.className ?? StdStr.active);
		};

		if (Array.isArray(elements))
			elements.forEach((element) => {
				element.addEventListener("click", onClickElement);
			});
		else elements.addEventListener("click", onClickElement);

		return true;
	}
}
