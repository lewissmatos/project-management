import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const LayoutComponent = () => (
	<Grid
		item
		xs={12}
		sx={{
			padding: { xs: "1rem 0", md: "20px" },
		}}
	>
		<Outlet />
	</Grid>
);

const Layout = () => {
	return (
		<Grid container sx={{ height: "100%", width: "100%" }}>
			<Grid
				item
				xs={12}
				sx={{
					transition: "all 0.3s ease-in-out",
				}}
			>
				<LayoutComponent />
			</Grid>
		</Grid>
	);
};

export default Layout;
