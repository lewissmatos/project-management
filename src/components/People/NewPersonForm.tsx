import { Box, MenuItem, Typography } from "@mui/material";
import "./people.scss";
import { BasicInput, BasicSelect } from "../Basic";
import { IPerson } from "../../utils/types";
import { FC, useState } from "react";
import BasicButton from "../Basic/BasicButton";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import {
	createPerson,
	editPerson,
	getAllPeople,
} from "../../services/people.service";
type NewPersonFormProps = {
	onCLose: () => void;
	personToEdit?: IPerson;
	setPeople?: any;
};

const NewPersonForm: FC<NewPersonFormProps> = ({
	onCLose,
	personToEdit,
	setPeople,
}) => {
	const [newPerson, setNewPerson] = useState(personToEdit as IPerson);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPerson({
			...newPerson,
			[e.target.name]: e.target.value,
		});
	};

	const disabledButton = !newPerson.name || !newPerson.role;

	const onCreateNewPerson = () => {
		if (Object.values(personToEdit as IPerson).length) {
			editPerson(newPerson);
		} else {
			createPerson(newPerson);
		}
		setPeople(getAllPeople());
		onCLose();
	};

	return (
		<Box className="new-person-form-container">
			<Typography sx={{ fontSize: 18 }}>
				Por favor llene todos los datos para agregar a la persona.
			</Typography>
			<Box className="fields-container">
				<BasicInput
					onChange={handleInputChange}
					name="name"
					inputProps={{ maxLength: 40 }}
					label="Nombre"
					style={{ width: "400px" }}
					required
					value={newPerson.name}
				/>
				<BasicInput
					onChange={handleInputChange}
					name="role"
					label="Rol"
					style={{ width: "400px" }}
					inputProps={{ maxLength: 30 }}
					required
					value={newPerson.role}
				/>
				{personToEdit?.id && (
					<BasicSelect
						label="Estatus"
						name="status"
						onChange={handleInputChange as any}
						style={{ width: "400px" }}
						defaultValue={personToEdit?.status}
					>
						<MenuItem value="Activo">Activo</MenuItem>
						<MenuItem value="Inactivo">Inactivo</MenuItem>
					</BasicSelect>
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					width: "100%",
					pr: "160px",
					mt: 2,
				}}
			>
				<BasicButton
					endIcon={<ArrowRightAltOutlinedIcon />}
					onClick={onCreateNewPerson}
					disabled={disabledButton}
				>
					Aceptar
				</BasicButton>
			</Box>
		</Box>
	);
};

export default NewPersonForm;
