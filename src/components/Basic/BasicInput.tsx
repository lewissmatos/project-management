import { FC, useState } from "react";
import {
	Box,
	OutlinedInputProps,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./basic-style.scss";
import CSS from "csstype";
import {
	HTMLInputType,
	InputRemixesType,
} from "./../utils/shared-components.utils";
import BasicLabel from "../Basic/BasicLabel";
import BasicIconButton from "./BasicIconButton";
import { generateStyle } from "../utils/shared-components.utils";

type BasicInputProps = {
	label?: string;
	type?: HTMLInputType;
	style?: CSS.Properties | object;
	sx?: CSS.Properties | object;
	remix?: InputRemixesType;
	className?: string;
	labelStyle?: CSS.Properties | object;
	InputProps?: {
		style: CSS.Properties | object;
	};
	placeholder?: string;
	formRegister?: any;
} & OutlinedInputProps;

const PasswordAdornment = ({
	showPassword,
	setShowPassword,
}: {
	showPassword: boolean;
	setShowPassword: (func: (show: boolean) => boolean) => void;
}) => {
	const handleClickShowPassword = () =>
		setShowPassword((show: boolean) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<InputAdornment position="end">
			<BasicIconButton
				onClick={handleClickShowPassword}
				onMouseDown={handleMouseDownPassword}
				edge="end"
				remix="text"
			>
				{showPassword ? <VisibilityOff /> : <Visibility />}
			</BasicIconButton>
		</InputAdornment>
	);
};
export const BasicInput: FC<BasicInputProps> = ({
	label,
	type = "text",
	style,
	sx,
	remix = "solid",
	className,
	labelStyle,
	formRegister,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Box sx={{ width: "100%", ...style }}>
			{label ? (
				<BasicLabel
					required={props?.required}
					label={label}
					remix={remix}
					style={labelStyle}
				/>
			) : null}
			<OutlinedInput
				className={`soft-transition ${className}`}
				sx={{
					borderRadius: "6px",
					...generateStyle(remix, "input"),
					...sx,
					width: "100%",
					// pr: "0",
				}}
				type={showPassword ? "text" : type}
				endAdornment={
					type === "password" ? (
						<PasswordAdornment
							showPassword={showPassword}
							setShowPassword={setShowPassword}
						/>
					) : null
				}
				{...props}
				{...formRegister}
			/>
		</Box>
	);
};

export default BasicInput;
