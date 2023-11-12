import { FC } from "react";
import {
	InputRemixesType,
	labelStyles,
} from "./../utils/shared-components.utils";
import { InputLabel, InputLabelProps } from "@mui/material";
import CSS from "csstype";
import { Colors } from "../../styles/colors";

type BasicLabelProps = {
	label?: string;
	remix?: InputRemixesType;
	style?: CSS.Properties | object;
} & InputLabelProps;

const BasicLabel: FC<BasicLabelProps> = ({
	label,
	style,
	remix = "solid",
	...props
}) => {
	return (
		<InputLabel
			sx={{
				"& .MuiFormLabel-asterisk": {
					color: Colors.mediumRed,
				},
				fontSize: "13px",
				textAlign: "left",
				marginLeft: "3px",
				transition: "all 0.2s linear",
				mb: 0.5,
				...labelStyles[remix],
				...style,
			}}
			{...props}
		>
			{label}
		</InputLabel>
	);
};

export default BasicLabel;
