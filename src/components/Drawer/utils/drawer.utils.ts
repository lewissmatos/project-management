import GavelIcon from "@mui/icons-material/Gavel";
import { OverridableComponent } from "@mui/material/OverridableComponent";
//
import { SvgIconTypeMap } from "@mui/material";
// Drawer items type
export type DrawerItemType = {
	label: string;
	key: string;
	Icon: OverridableComponent<SvgIconTypeMap>;
	url: string;
};

export type DrawerItemTypeChildren = DrawerItemType & {
	parent?: string;
};

// Drawer items
export const drawerItems: DrawerItemType[] = [
	{
		label: "Proyectos",
		key: "projects",
		Icon: GavelIcon,
		url: `dashboard/projects`,
	},
];
