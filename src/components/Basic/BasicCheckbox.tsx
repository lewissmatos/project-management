import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { FC } from "react";
import { CSS } from "styled-components/dist/types";
import { Colors } from "../../styles/colors";
//import { UseFormRegister, FieldValues } from "react-hook-form";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import "./basic-style.scss";

import {
	ChecboxRemixesType,
	checkboxBackgrounds,
} from "./../utils/shared-components.utils";

type BasicCheckboxProps = {
	label?: string;
	style?: CSS.Properties | object;
	labelStyle?: CSS.Properties | object;
	remix?: ChecboxRemixesType;
	iconStyle?: CSS.Properties | object;
	className?: string;
	checked?: boolean;
	formRegister?: any;
} & CheckboxProps;
const BasicCheckbox: FC<BasicCheckboxProps> = ({
	label,
	style,
	labelStyle,
	remix = "solid",
	iconStyle,
	className,
	formRegister,
	...props
}) => {
	return (
		<FormControlLabel
			sx={{ color: Colors.white, fontSize: "7px", ...labelStyle }}
			control={
				<Checkbox
					color="primary"
					sx={{
						color: Colors.white,
						fontSize: "7px",
						...checkboxBackgrounds[remix],
						...style,
					}}
					className={`soft-transition ${className}`}
					icon={
						<SquareRoundedIcon
							sx={{
								color: "#EFEFEF",
								...checkboxBackgrounds[remix],
								...iconStyle,
							}}
							className={`soft-transition`}
						/>
					}
					{...props}
					{...formRegister}
				/>
			}
			label={label}
		/>
	);
};

export default BasicCheckbox;
