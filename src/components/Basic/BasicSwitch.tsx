import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { FC } from "react";

type BasicSwitchType = {
	label?: string;
	labelProps?: any;
} & SwitchProps;
const BasicSwitch: FC<BasicSwitchType> = ({ label, labelProps, ...props }) => {
	return (
		<FormControlLabel
			control={<Switch {...props} />}
			label={label}
			{...labelProps}
		/>
	);
};

export default BasicSwitch;
