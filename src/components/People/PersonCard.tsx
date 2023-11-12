import { Box, Typography } from "@mui/material";
import { FC } from "react";
import "./people.scss";
import dayjs from "dayjs";
import { BasicIconButton } from "../Basic";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import { Colors } from "../../styles/colors";
import { editPerson, getAllPeople } from "../../services/people.service";
type PersonCardProps = {
	person: any;
	setPeople?: any;
	onSetPersonToEdit: any;
};
const PersonCard: FC<PersonCardProps> = ({
	person,
	setPeople,
	onSetPersonToEdit,
}) => {
	const onSwitchPersonStatus = (status: "Activo" | "Inactivo") => () => {
		editPerson({ ...person, status });
		setPeople(getAllPeople());
	};

	return (
		<Box className="person-card-container">
			<Typography className="person-title">{person.name}</Typography>
			<Box className="card-body">
				<Typography className="person-role">{person.role}</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography className="person-dates">
						Agregado: {dayjs(person.createdAt).format("DD-MM-YYYY")}
					</Typography>
				</Box>
			</Box>
			<Box className="person-card-footer">
				<Box>
					<BasicIconButton
						remix="text"
						title={person.status === "Activo" ? "Inhabilitar" : "Habilitar"}
						onClick={onSwitchPersonStatus(
							person.status === "Activo" ? "Inactivo" : "Activo"
						)}
						tooltipOptions={{
							tooltipaccent:
								person.status === "Activo" ? Colors.red : Colors.green,
						}}
					>
						{person.status === "Activo" ? (
							<RemoveCircleOutlineIcon
								sx={{ fontSize: 20, color: Colors.red }}
							/>
						) : (
							<CheckIcon sx={{ fontSize: 20, color: Colors.green }} />
						)}
					</BasicIconButton>
					<BasicIconButton
						remix="text"
						title="Editar persona"
						onClick={onSetPersonToEdit(person)}
					>
						<EditIcon sx={{ fontSize: 20, color: Colors.accent }} />
					</BasicIconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default PersonCard;
