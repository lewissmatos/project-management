import { Box, Typography } from "@mui/material";
import { BasicButton, BasicModal } from "../Basic";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "./people.scss";
import { getAllPeople } from "../../services/people.service";
import PersonCard from "./PersonCard";
import { IPerson } from "../../utils/types";
import { useState } from "react";
import NewPersonForm from "./NewPersonForm";
const PeopleScreen = () => {
	const navigate = useNavigate();

	const [people, setPeople] = useState(getAllPeople());
	const [personToEdit, setPersonToEdit] = useState({} as IPerson);
	const goToPeople = () => {
		navigate("/dashboard/proyects");
	};
	const [openNewPersonModal, setOpenNewPersonModal] = useState(false);

	const handleOpenNewPersonModal = () => {
		setOpenNewPersonModal(true);
	};
	const handleCloseNewPersonModal = () => {
		setOpenNewPersonModal(false);
		setPersonToEdit({} as IPerson);
	};

	const onSetPersonToEdit = (project: IPerson) => () => {
		setPersonToEdit(project);
		handleOpenNewPersonModal();
	};

	return (
		<>
			<BasicModal
				open={openNewPersonModal}
				onClose={handleCloseNewPersonModal}
				title={
					Object.values(personToEdit).length
						? "Editar proyecto"
						: "Nuevo proyecto"
				}
			>
				<NewPersonForm
					onCLose={handleCloseNewPersonModal}
					setPeople={setPeople}
					personToEdit={personToEdit}
				/>
			</BasicModal>
			<Box className="people-screen">
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 2,
						alignItems: "center",
					}}
				>
					<Typography sx={{ fontSize: 50 }}>Personas</Typography>
					<BasicButton onClick={goToPeople} endIcon={<AccountTreeIcon />}>
						Ver proyectos
					</BasicButton>
				</Box>
				<Box className="people-cards-container">
					<Box className="new-person-card" onClick={handleOpenNewPersonModal}>
						<Typography sx={{ fontSize: 22 }}>Agregar persona</Typography>
						<AddOutlinedIcon sx={{ fontSize: 80 }} />
					</Box>
					{people?.map((person: IPerson) => (
						<PersonCard
							key={person.id}
							person={person}
							setPeople={setPeople}
							onSetPersonToEdit={onSetPersonToEdit}
						/>
					))}
				</Box>
			</Box>
		</>
	);
};

export default PeopleScreen;
