import { Button, ButtonProps } from "@mui/material";
import { Colors } from "../../styles/colors.js";
import { FC, ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import CSS from "csstype";
import "./basic-style.scss";
import { generateStyle } from "../utils/shared-components.utils";
import { ButtonRemixesType } from "./../utils/shared-components.utils.js";
type ReactNode = string | JSX.Element | JSX.Element[];

// BasicButton props type
type BasicButtonTypeProps = {
	label?: string;
	style?: CSS.Properties | object;
	disabled?: boolean | undefined;
	custom?: string;
	children?:
		| ReactNode
		| ReactNode[]
		| ReactElement
		| ReactElement[]
		| JSX.Element
		| JSX.Element[];
	remix?: ButtonRemixesType;
	isLoading?: boolean;
	className?: string;
	hidden?: boolean;
	target?: string;
} & ButtonProps;
const BasicButton: FC<BasicButtonTypeProps> = ({
	label,
	style,
	remix = "contained",
	disabled,
	custom,
	children,
	className,
	isLoading,
	hidden,
	...props
}) => {
	if (hidden) return null;

	//If the button is disabled, the remix will be "disabled"
	if (disabled) {
		remix = "disabled";
		custom = "#EFEFEF20";
	}

	return (
		<Button
			disableRipple
			disableElevation
			disabled={disabled}
			sx={{
				color: Colors.white,
				paddingX: "1em",
				borderRadius: "6px",
				paddingY: 1,
				textTransform: "inherit",
				...generateStyle(custom || remix, "iconButton"),
				...style,
			}}
			className={`soft-transition ${className}`}
			{...props}
		>
			{children || label}
			{isLoading && <CircularProgress sx={{ ml: 2 }} size={20} />}
		</Button>
	);
};

export default BasicButton;
