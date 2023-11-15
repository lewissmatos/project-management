import { Box, Grid, Typography } from "@mui/material";
import "./admin-header.scss";
import { BasicButton } from "../Basic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Colors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, logout } from "../../services/auth.service";
// Define the AppHeader functional component
const AppHeader = ({ xs }: { xs: number }) => {
	const navigate = useNavigate();
	const userFullname = `${getLoggedUser()?.name} ${getLoggedUser()?.lastname}`;
	const goBack = () => {
		navigate(-1);
	};
	const onLogout = () => {
		logout();
		window.location.reload();
	};

	return (
		<Grid item xs={xs} className="app-header-container">
			<Box className="app-header-gradient-bar" />
			<Box className="app-header-content">
				<Typography sx={{ fontSize: 30, mr: 4 }}>SGProyectos</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "10px",
						color: "black",
						padding: 0.2,
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<BasicButton
						remix="text"
						style={{ width: "100px", color: Colors.accent }}
						startIcon={<ArrowBackIcon />}
						onClick={goBack}
					>
						Volver
					</BasicButton>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography sx={{ fontSize: 18, mr: 2 }}>{userFullname}</Typography>
						<BasicButton
							remix="cancel"
							style={{ width: "180px" }}
							onClick={onLogout}
						>
							Cerrar sesión
						</BasicButton>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

// Export the AppHeader component as the default export
export default AppHeader;
