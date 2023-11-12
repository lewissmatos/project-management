import {
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuProps,
} from "@mui/material";
import { Colors } from "../../styles/colors";
import { useState, ReactNode, FC, ReactElement, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { BasicButton, BasicIconButton } from "./IndexBasic";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const PaperProps = {
	elevation: 0,
	sx: {
		borderRadius: "6px",
		overflow: "visible",
		filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.22))",
		"& .MuiAvatar-root": {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},
		"&:before": {
			content: '""',
			display: "block",
			position: "absolute",
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			bgcolor: Colors.white,
			transform: "translateY(-50%) rotate(45deg)",
			zIndex: 0,
		},
	},
};
export type MenuOption = {
	label: string;
	icon?: ReactNode;
	action?: () => unknown;
};

type BasicMenuProps = {
	control?: ReactNode;
	icon?: ReactElement;
	options?: MenuOption[];
	children?: any;
	title?: string;
	style?: CSSProperties;
};
const BasicMenu: FC<BasicMenuProps> = ({
	control,
	icon,
	options,
	children,
	title = "",
	style,
}) => {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
	return (
		<>
			{control ?? (
				<>
					{children ? (
						<BasicButton
							onClick={handleOpenMenu}
							title={title ? t(title) : t("options")}
							remix={!anchorEl ? "text" : "blured"}
							style={style}
							// endIcon={<MenuRoundedIcon className="header-icon" />}
						>
							{children}
						</BasicButton>
					) : (
						<BasicIconButton
							onClick={handleOpenMenu}
							title={title ? t(title) : t("options")}
							remix={!anchorEl ? "text" : "blured"}
							style={style}
						>
							{icon ?? <MenuRoundedIcon className="header-icon" />}
						</BasicIconButton>
					)}
				</>
			)}
			<Menu
				PaperProps={PaperProps}
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={open}
				onClose={handleCloseMenu}
			>
				{options?.map((option) => (
					<MenuItem
						key={option.label}
						onClick={() => {
							setAnchorEl(null);
							option?.action?.();
						}}
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							gap: "10px",
						}}
					>
						<ListItemText>{t(option.label)}</ListItemText>
						<ListItemIcon
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end",
								gap: "10px",
							}}
						>
							{option.icon}
						</ListItemIcon>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default BasicMenu;
