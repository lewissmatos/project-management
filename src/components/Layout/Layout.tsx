import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppHeader from "../Header/AppHeader";

const LayoutComponent = () => (
	<Grid
		item
		xs={12}
		sx={{
			padding: { xs: "1rem 0", md: "20px" },
			mt: "44px",
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
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<AppHeader xs={12} />
					</Grid>
					<LayoutComponent />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Layout;
