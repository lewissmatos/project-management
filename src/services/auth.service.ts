import { IUser } from "../utils/types";
import { generateId } from "../utils/utils.app";
import { getData, setData } from "./localStorage.service";

const getUsers = () => {
	return getData("users");
};

const getUserByEmail = (email: string) => {
	const users = getUsers() as any as IUser[];
	return users.find((user: any) => user.email === email);
};

const login = (data: any) => {
	const user = getUserByEmail(data.email);
	if (!user) {
		return { message: "Usuario no encontrado", ok: false };
	} else {
		setData("isLogged", 1);
		setData("user", {
			id: user.id,
			name: user.name,
			lastname: user.lastname,
			email: user.email,
		});
		return {
			message: `Inicio de sesión exitoso.`,
			ok: true,
			user: user,
		};
	}
};

const signup = (data: any) => {
	const users = getUsers() as any as IUser[];
	const user = getUserByEmail(data.email);

	if (user) {
		return {
			message: `El email: '${data.email}' ya está registrado.`,
			ok: false,
		};
	} else {
		users.push({ ...data, id: generateId("users") });
		setData("users", users);
		return {
			message: `Registro exitoso.`,
			ok: true,
		};
	}
};

const logout = () => {
	setData("isLogged", 0);
	setData("user", null);
};

const getLoggedUser = () => {
	return JSON.parse(
		localStorage.getItem("user") as any as {
			id: string;
			email: string;
			lastname: string;
			name: string;
		} as any
	);
};
export { login, getUsers, signup, logout, getLoggedUser };
