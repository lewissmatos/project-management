import { Box, Typography } from "@mui/material";
import "./projects.scss";
import { IProject } from "../../utils/types";
import ProjectCard from "./ProjectCard";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { BasicButton, BasicModal } from "../Basic";
import NewProjectForm from "./NewProjectForm";
import { useState } from "react";
import { getAllProjectByUserId } from "../../services/projects.service";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../services/auth.service";

const ProjectsScreen = () => {
	const navigate = useNavigate();

	const [projects, setProjects] = useState<IProject[]>(
		getAllProjectByUserId(getLoggedUser()?.id)
	);
	const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
	const [projectToEdit, setProjectToEdit] = useState({} as IProject);

	const handleOpenNewProjectModal = () => {
		setOpenNewProjectModal(true);
	};
	const handleCloseNewProjectModal = () => {
		setOpenNewProjectModal(false);
		setProjectToEdit({} as IProject);
	};

	const onSetProjectToEdit = (project: IProject) => () => {
		setProjectToEdit(project);
		handleOpenNewProjectModal();
	};

	const goToPeople = () => {
		navigate("/dashboard/people");
	};
	return (
		<>
			<BasicModal
				open={openNewProjectModal}
				onClose={handleCloseNewProjectModal}
				title={
					Object.values(projectToEdit).length
						? "Editar proyecto"
						: "Nuevo proyecto"
				}
			>
				<NewProjectForm
					onCLose={handleCloseNewProjectModal}
					setProjects={setProjects}
					projectToEdit={projectToEdit}
				/>
			</BasicModal>
			<Box className="project-screen">
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 2,
						alignItems: "center",
					}}
				>
					<Typography sx={{ fontSize: 50 }}>Proyectos</Typography>
					<BasicButton onClick={goToPeople} endIcon={<PersonIcon />}>
						Ver personas
					</BasicButton>
				</Box>
				<Box className="projects-cards-container">
					<Box className="new-project-card" onClick={handleOpenNewProjectModal}>
						<Typography sx={{ fontSize: 26 }}>Nuevo Proyecto</Typography>
						<AddOutlinedIcon sx={{ fontSize: 100 }} />
					</Box>
					{projects?.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							setProjects={setProjects}
							onSetProjectToEdit={onSetProjectToEdit}
						/>
					))}
				</Box>
			</Box>
		</>
	);
};

export default ProjectsScreen;
