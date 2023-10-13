// import logo from "../../public/assets/images/logo.svg";

export default class StdStr {
	// *** Html tags *** //

	static header = "header";
	static nav = "nav";
	static ul = "ul";
	static li = "li";
	static link = "a";
	static img = "img";
	static paraph = "p";

	/**
	 *Return a heading string with the level specifed
	 * @param {number} level_
	 * @returns String
	 */
	static headingLevel = (level) => `h${level}`;

	// *** Html general tags *** //

	static div = "div";
	static span = "span";

	// *** Attribute *** //

	static className = "class";
	static srcAttr = "src";

	// *** ClassName *** //

	static button = "button";
	static navigation = "navigation";
	static container = "container";
	static active = "active";

	// *** Assets link *** //

	// static linkLogo = logo;

	// *** Function string arguments *** //
	static strClassName = "className";

	static appendChild = "appendChild";
	static before = "before";
	static append = "append";
}
