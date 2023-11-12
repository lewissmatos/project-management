import { Box, Grid } from "@mui/material";
import "./admin-header.scss";

// Define the AppHeader functional component
const AppHeader = ({ xs }: { xs: number }) => {
	return (
		<Grid item xs={xs} className="app-header-container">
			<Box className="app-header-gradient-bar" />
			<Box className="app-header-content">
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "10px",
						padding: 1.5,
						color: "black",
					}}
				>
					dsad
				</Box>
			</Box>
		</Grid>
	);
};

// Export the AppHeader component as the default export
export default AppHeader;
