import { Colors } from "../../styles/colors";

export type HTMLInputType =
	| "text"
	| "email"
	| "password"
	| "url"
	| "checkbox"
	| "date"
	| "email"
	| "number"
	| "time"
	| "datetime-local"
	| "textarea"
	| "file"
	| "phone"
	| "month"
	| "color";
//Background types
export type ButtonBackgroundsType = {
	text: object;
	blured: object;
	contained: object;
	disabled: object;
	soft: object;
	cancel: object;
	abi: object;
	black: object;
};

export type ButtonRemixesType =
	| "text"
	| "blured"
	| "contained"
	| "disabled"
	| "cancel"
	| "soft"
	| "abi"
	| "black";
// | `${string}`;

export type InputRemixesType =
	| "solidDark"
	| "standard"
	| "filled"
	| "outlined"
	| undefined
	| "solid";
export type ChecboxRemixesType =
	| "solidDark"
	| "standard"
	| "filled"
	| "outlined"
	| undefined
	| "abi"
	| "solid"
	| "abiDark";

export type InputBackgroundsType = {
	standard?: object;
	filled?: object;
	outlined?: object;
	solid?: object;
	solidDark?: object;
};

export type SelectBackgroundsType = {
	standard?: object;
	filled?: object;
	outlined?: object;
	solid?: object;
	solidDark?: object;
};

export const inputBackgrounds: InputBackgroundsType = {
	solid: {
		borderRadius: "6px",
		backgroundColor: "#EFEFEF",
		"& fieldset": {
			border: "none",
		},
		"&:hover fieldset": {
			border: "none",
		},
		"&.Mui-focused fieldset": {
			border: "none",
		},
	},
	solidDark: {
		borderRadius: "6px",
		backgroundColor: "#656872",
		color: "white",
		"& fieldset": {
			border: "none",
		},
		"&:hover fieldset": {
			border: "none",
		},
		"&.Mui-focused fieldset": {
			border: "none",
		},
	},

	outlined: {
		"& .MuiOutlinedInput-root": {},
	},
};

export const labelStyles: InputBackgroundsType = {
	solid: {
		color: "black",
	},
	solidDark: {
		color: "#F8F8F8",
	},
	outlined: {},
};

export const selectBackgrounds: SelectBackgroundsType = {
	solid: {
		borderRadius: "6px",
		backgroundColor: "#EFEFEF",
		border: "none",
		"& fieldset": {
			border: "none",
		},
		"&:hover fieldset": {
			border: "none",
		},
		"&.Mui-focused fieldset": {
			border: "none",
		},
		"& .MuiSvgIcon-root": {
			color: Colors.accent,
		},
	},

	solidDark: {
		borderRadius: "6px",
		backgroundColor: "#656872",
		color: Colors.white,
		border: "none",
		"& fieldset": {
			border: "none",
		},
		"&:hover fieldset": {
			border: "none",
		},
		"&.Mui-focused fieldset": {
			border: "none",
		},
		"& .MuiSvgIcon-root": {
			color: Colors.accent,
		},
	},
	outlined: {
		"& .MuiOutlinedInput-root": {},
	},
};

export const checkboxBackgrounds: any = {
	solid: {
		color: "#EFEFEF",
	},
	solidDark: {
		color: "#656872",
	},
	abi: {
		"&.Mui-checked": {
			color: Colors.yellow,
		},
		color: "#EFEFEF",
	},
	abiDark: {
		"&.Mui-checked": {
			color: Colors.yellow,
		},
		color: "#656872",
	},
};

export const buttonBackgrounds: ButtonBackgroundsType = {
	text: {
		color: Colors.black,
		":hover": {
			backgroundColor: `${Colors.black}15`,
		},
	},
	blured: {
		backgroundColor: `${Colors.accent}40`,
		":hover": {
			backgroundColor: `${Colors.accentDark}60`,
		},
		color: "black !important",
	},
	soft: {
		backgroundColor: `#EFEFEF`,
		":hover": {
			backgroundColor: `${Colors.accentDark}40`,
		},
	},
	contained: {
		backgroundColor: Colors.accent,
		":hover": {
			backgroundColor: `${Colors.accentDark}`,
		},
	},
	black: {
		backgroundColor: Colors.abiBlack,
		":hover": {
			backgroundColor: `${Colors.black}`,
		},
	},
	disabled: {
		backgroundColor: "#EFEFEF20",
		cursor: "not-allowed",
		color: Colors.grayMiddle,
	},
	cancel: {
		backgroundColor: Colors.red,
		":hover": {
			backgroundColor: Colors.darkRed,
		},
	},
	abi: {
		backgroundColor: `${Colors.yellow}`,
		":hover": {
			backgroundColor: `${Colors.mustard}`,
		},
		color: Colors.black,
	},
};

type ColorStyles = {
	[key: string]: {
		backgroundColor: string;
		":hover": {
			backgroundColor: string;
		};
	};
};

export type GenerateStylesElement =
	| "button"
	| "input"
	| "select"
	| "checkbox"
	| "iconButton";

export const generateStyle = (
	input: keyof ColorStyles | `#${string}`,
	element?: GenerateStylesElement
): any => {
	const elements = {
		button: buttonBackgrounds,
		input: inputBackgrounds,
		select: selectBackgrounds,
		checkbox: checkboxBackgrounds,
		iconButton: buttonBackgrounds,
	};
	const styles = elements[element as keyof typeof elements];
	if (styles[input as keyof ColorStyles]) {
		return styles[input as keyof ColorStyles];
	} else {
		return {
			backgroundColor: input as string,
			":hover": {
				backgroundColor: adjustColorBrightness(input as string, -20), // Adjust the hover color to be darker
			},
		};
	}
};

const adjustColorBrightness = (color: string, amount: number): string => {
	// Logic to adjust the brightness of the color
	// You can use libraries like 'tinycolor2' for more advanced color manipulation
	// For demonstration purposes, here's a simple logic:
	const hex = color.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16) + amount;
	const g = parseInt(hex.substring(2, 4), 16) + amount;
	const b = parseInt(hex.substring(4, 6), 16) + amount;
	return `#${Math.min(255, Math.max(0, r))
		.toString(16)
		.padStart(2, "0")}${Math.min(255, Math.max(0, g))
		.toString(16)
		.padStart(2, "0")}${Math.min(255, Math.max(0, b))
		.toString(16)
		.padStart(2, "0")}`;
};
