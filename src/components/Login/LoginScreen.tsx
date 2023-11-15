import { Box, Typography } from "@mui/material";
import "./login.scss";
import { BasicInput } from "../Basic";
import BasicButton from "../Basic/BasicButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
const LoginScreen = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const isButtonDisabled =
		!loginData.email.match(
			/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		) ||
		loginData.password === "" ||
		!loginData.password.match(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/);

	const handleInputChange = (e: any) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const goToSignup = () => {
		navigate("/signup");
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		login({
			email: loginData.email,
			password: loginData.password,
		});
		window.location.reload();
	};
	return (
		<Box className="login-screen">
			<Typography sx={{ fontSize: 60, mb: 4 }}>SGProyectos</Typography>
			<Typography sx={{ fontSize: 40, mb: 2 }}>Iniciar sesión</Typography>
			<Box className="login-form__container">
				<BasicInput
					onChange={handleInputChange}
					label="Email"
					name="email"
					type="email"
				/>
				<BasicInput
					onChange={handleInputChange}
					label="Contraseña"
					type="password"
					name="password"
				/>
				<BasicButton
					disabled={isButtonDisabled}
					style={{ width: "100%" }}
					onClick={onSubmit}
				>
					Iniciar sesión
				</BasicButton>
				<Typography sx={{ fontSize: 14, mt: 2 }}>
					¿No tienes una cuenta?{" "}
					<span onClick={goToSignup} className="link">
						Regístrate
					</span>
				</Typography>
			</Box>
		</Box>
	);
};

export default LoginScreen;
