import { FC, ReactElement } from "react";
import { Tooltip, TooltipProps } from "@mui/material";
import { Colors } from "../../styles/colors";
import "./basic-style.scss";
import CSS from "csstype";

// Border radius for each placement
const BORDER_RADIUS = {
	top: "4px 4px 0px 0px",
	bottom: "0px 0px 4px 4px",
	right: "0px 4px 4px 0px",
	left: "4px 0px 0px 4px",
};

// BasicTooltip props type
type BasicTooltipTypeProps = {
	accent?: string;
	placement?: "top" | "bottom" | "left" | "right";
	children: ReactElement | string;
	style?: CSS.Properties | object;
	className?: string;
	arrow?: boolean;
} & TooltipProps;

const BasicTooltip: FC<BasicTooltipTypeProps> = ({
	accent,
	placement = "bottom",
	children,
	arrow = true,
	style,
	className,
	...props
}) => {
	return (
		<Tooltip
			componentsProps={{
				arrow: {
					sx: {
						color: accent || Colors.accent,
					},
				},
				popper: {
					sx: {
						"& .MuiTooltip-tooltip": {
							color: "white",
							borderRadius: BORDER_RADIUS[placement] || "4px 4px 0px 0px",
							backgroundColor: accent || Colors.accent,
							fontSize: "12px",
							...style,
						},
					},
				},
			}}
			placement={placement}
			className={`soft-transition ${className}`}
			arrow={arrow}
			{...props}
		>
			{children}
		</Tooltip>
	);
};

export default BasicTooltip;
