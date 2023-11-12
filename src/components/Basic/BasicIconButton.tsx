import { IconButton, IconButtonProps } from "@mui/material";
import { Colors } from "../../styles/colors.js";
import BasicTooltip from "./BasicTooltip.js";
import CSS from "csstype";
import { FC, ReactElement } from "react";
import { ButtonRemixesType } from "./../utils/shared-components.utils.js";
import "./basic-style.scss";
import { generateStyle } from "../utils/shared-components.utils";

// BasicIconButton props type
type BasicIconButtonProps = {
	style?: CSS.Properties | object;
	disabled?: boolean;
	children: ReactElement;
	title?: string;
	remix?: ButtonRemixesType;
	custom?: string;
	titlePlacement?: "top" | "bottom" | "left" | "right";
	tooltipOptions?: { followCursor?: boolean; tooltipaccent?: string };
	tooltipProps?: object;
	className?: string;
	hidden?: boolean;
	href?: string;
	target?: string;
} & IconButtonProps;
const BasicIconButton: FC<BasicIconButtonProps> = ({
	style,
	remix = "contained",
	custom,
	children,
	title,
	titlePlacement,
	tooltipOptions,
	disabled,
	className,
	tooltipProps,
	hidden,
	...props
}) => {
	if (hidden) return null;
	if (disabled) {
		remix = "disabled";
	}
	return (
		<IconButton
			sx={{
				color: Colors.black,
				borderRadius: "6px",
				paddingY: 1,
				textTransform: "inherit",
				...generateStyle(custom || remix, "iconButton"),
				...style,
			}}
			className={`soft-transition ${className}`}
			disabled={disabled}
			{...props}
		>
			<BasicTooltip
				followCursor={tooltipOptions?.followCursor || false}
				accent={tooltipOptions?.tooltipaccent || Colors.accent}
				title={title}
				placement={titlePlacement || "bottom"}
				{...tooltipProps}
			>
				{children}
			</BasicTooltip>
		</IconButton>
	);
};

export default BasicIconButton;
