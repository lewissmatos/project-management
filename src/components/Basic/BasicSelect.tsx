import { FC, ReactNode } from "react";
import {
	generateStyle,
	InputRemixesType,
} from "../utils/shared-components.utils";
import CSS from "csstype";
import {
	Select,
	FormControl,
	Box,
	CircularProgress,
	SelectProps,
} from "@mui/material";
import BasicLabel from "../Basic/BasicLabel";

// Propiedades del componente, que heredan las props del componente Select de Material-UI
type GenericSelectProps = {
	children?: ReactNode;
	remix?: InputRemixesType;
	label?: string;
	style?: CSS.Properties | object;
	sx?: CSS.Properties | object;
	labelStyle?: CSS.Properties | object;
	formRegister?: any;
	isLoading?: boolean;
} & SelectProps;

const BasicSelect: FC<GenericSelectProps> = ({
	remix = "solid",
	children,
	labelStyle,
	style,
	sx,
	formRegister,
	isLoading,
	...props
}) => {
	return (
		<Box
			sx={{ width: "100%", display: "flex", flexDirection: "column", ...style }}
		>
			<BasicLabel
				required={props?.required}
				label={props?.label}
				remix={remix}
				style={labelStyle}
			/>
			<FormControl fullWidth>
				<Select
					sx={{
						...generateStyle(remix, "select"),
						...style,
						...sx,
						width: "100%",
					}}
					// renderValue={(value) => value.name}
					{...props}
					{...formRegister}
					startAdornment={
						isLoading ? (
							<Box>
								<CircularProgress color="inherit" size={20} />
							</Box>
						) : null
					}
				>
					{children}
				</Select>
			</FormControl>
		</Box>
	);
};

export default BasicSelect;
