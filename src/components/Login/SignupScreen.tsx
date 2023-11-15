import { Box, Typography } from "@mui/material";
import "./login.scss";
import { BasicInput } from "../Basic";
import BasicButton from "../Basic/BasicButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../services/auth.service";
const SignupScreen = () => {
	const navigate = useNavigate();
	const [signupData, setSignupData] = useState({
		name: "",
		lastname: "",
		email: "",
		password: "",
		repeatPassword: "",
	});
	const isButtonDisabled =
		signupData.name === "" ||
		signupData.lastname === "" ||
		!signupData.email.match(
			/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		) ||
		signupData.password === "" ||
		!signupData.password.match(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/) ||
		signupData.password !== signupData.repeatPassword;

	const handleInputChange = (e: any) => {
		setSignupData({
			...signupData,
			[e.target.name]: e.target.value,
		});
	};

	const goToSignup = () => {
		navigate("/login");
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		const data = signup(signupData);
		if (data?.message) {
			alert(data.message);
		}
		if (data?.ok) {
			onLogin();
		}
	};

	const onLogin = () => {
		login({
			email: signupData.email,
			password: signupData.password,
		});
		window.location.reload();
	};

	return (
		<Box className="login-screen">
			<Typography sx={{ fontSize: 60, mb: 4 }}>SGProyectos</Typography>
			<Typography sx={{ fontSize: 40, mb: 2 }}>Crear una cuenta</Typography>
			<Box className="login-form__container">
				<BasicInput onChange={handleInputChange} label="Nombre" name="name" />
				<BasicInput
					onChange={handleInputChange}
					label="Apellido"
					name="lastname"
				/>
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
				<BasicInput
					onChange={handleInputChange}
					label="Repetir ontraseña"
					type="password"
					name="repeatPassword"
				/>
				<span style={{ fontSize: 12 }}>
					La contraseña debe tener al menos 8 caracteres, una letra mayuscula y
					un caracter especial.
				</span>
				<BasicButton
					disabled={isButtonDisabled}
					style={{ width: "100%" }}
					onClick={onSubmit}
				>
					Registrarse
				</BasicButton>
				<Typography sx={{ fontSize: 14, mt: 2 }}>
					¿Ya estás registrado?{" "}
					<span onClick={goToSignup} className="link">
						Iniciar sesión
					</span>
				</Typography>
			</Box>
		</Box>
	);
};

export default SignupScreen;
