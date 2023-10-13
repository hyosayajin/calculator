import StdStr from "./StdStr";

export default class StdFunc {
	/**
	 * Create a new node element with id attribute and className attribute
	 *
	 * @param {string} htmlTag_
	 * @param {{id: string, className: string} | undefined} attr_
	 * @param {[HTMLElement | Node]} [child=[]] 
	 * @returns  {HTMLElement}
	 */
	static Create(htmlTag_ = StdStr.div, attr_ = { id: undefined, className: undefined }, child = []) {
		const node = document.createElement(htmlTag_ ?? "div");

		this.SetAttr(node, attr_ ?? {});

		this.SetChild(node, child);

		return node;
	}

	/**
	 * Set any attribues
	 * @param {HTMLElement} htmlElement_
	 * @param  {object} attr_
	 */
	static SetAttr(htmlElement_, { ...attr_ }) {
		for (const key in attr_) {
			if (Object.hasOwnProperty.call(attr_, key)) {
				const myAtrr = attr_[key];

				if (myAtrr !== undefined) {
					if (key === StdStr.strClassName) {
						htmlElement_.setAttribute(StdStr.className, myAtrr);
					} else {
						htmlElement_.setAttribute(key, myAtrr);
					}
				}
			}
		}
	}

	/**
	 * Set the children of a HTMLElement
	 * @param {HTMLElement | Node} parent_
	 * @param {Array <HTMLElemnt> | Node} children_
	 * @param {string} options_ - appendChild | before
	 * @param {Node} cibleOfinsert - This must be a child of current HTMLElemnt
	 */
	static SetChild(parent_, children_ = [], options_ = undefined, cibleOfinsert_ = undefined) {
		if ((options_ ??= StdStr.appendChild)) {
			switch (options_) {
				case StdStr.appendChild:
					if (Array.isArray(children_)) {
						children_.forEach((child_) => {
							parent_.appendChild(child_);
						});
					} else {
						parent_.appendChild(children_);
					}

					break;
				case StdStr.before:
					if (Array.isArray(children_)) {
						children_.forEach((child_) => {
							parent_.insertBefore(child_, cibleOfinsert_);
						});
					} else {
						parent_.insertBefore(children_, cibleOfinsert_);
					}

					break;
				default:
					break;
			}
		}
	}
}
