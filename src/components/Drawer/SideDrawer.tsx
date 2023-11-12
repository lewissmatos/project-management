import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./side-drawer.scss";
import { drawerItems } from "./utils/drawer.utils";
import DrawerItem from "./DrawerItem";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";

const SideDrawer = () => {
	const navigate = useNavigate();
	const location = useLocation();

	//Get the current path
	const path: string = location.pathname;
	const [selectedItem, setSelectedItem] = useState<string>("auctions");

	useEffect(() => {
		// Get the label of the current path

		const { label } = drawerItems?.find(
			(item) => !!item?.url && path?.includes(item.url)
		) || {
			label: "auctions",
		};
		setSelectedItem(label);
		//eslint-disable-next-line
	}, [path]);

	// Handle the drawer item selection
	const onSelectDrawerItem = (item?: string, url?: string) => {
		// Check if the item and url are valid
		if (!item || !url) return;
		setSelectedItem(item);
		// Navigate to the url
		navigate(url, { replace: true });
	};

	return (
		<Box className="app-drawer-container">
			<Box>
				<Typography
					sx={{ color: Colors.abiBlack, textAlign: "center", fontSize: 24 }}
				>
					SGProyectos
				</Typography>
				<Box sx={{ mt: 1 }}>
					{drawerItems.map((item) => {
						const { label } = item;
						return (
							<DrawerItem
								onSelectDrawerItem={onSelectDrawerItem}
								key={label}
								selected={selectedItem}
								setSelectedItem={setSelectedItem}
								item={item}
							/>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default SideDrawer;
