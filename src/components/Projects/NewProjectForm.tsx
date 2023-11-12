import { Box, Typography } from "@mui/material";
import "./projects.scss";
import { BasicInput } from "../Basic";
import { IProject } from "../../utils/types";
import { FC, useState } from "react";
import BasicButton from "../Basic/BasicButton";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import {
	createProject,
	editProject,
	getAllProjects,
} from "../../services/projects.service";
import dayjs from "dayjs";
type NewProjectFormProps = {
	onCLose: () => void;
	projectToEdit?: IProject;
	setProjects?: any;
};

const NewProjectForm: FC<NewProjectFormProps> = ({
	onCLose,
	projectToEdit,
	setProjects,
}) => {
	const [newProject, setNewProject] = useState(projectToEdit as IProject);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProject({
			...newProject,
			[e.target.name]: e.target.value,
		});
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (dayjs(e.target.value).isBefore(dayjs())) {
			setNewProject({
				...newProject,
				endDate: dayjs().format("YYYY-MM-DD"),
			});
			return;
		} else
			setNewProject({
				...newProject,
				endDate: e.target.value,
			});
	};
	const disabledButton =
		!newProject.name || !newProject.description || !newProject.endDate;

	const onCreateNewProject = () => {
		if (Object.values(projectToEdit as IProject).length) {
			editProject(newProject);
		} else {
			createProject(newProject);
		}
		setProjects(getAllProjects());
		onCLose();
	};

	return (
		<Box className="new-project-form-container">
			<Typography sx={{ fontSize: 18 }}>
				Por favor llene todos los datos para crear el nuevo proyecto.
			</Typography>
			<Box className="fields-container">
				<BasicInput
					onChange={handleInputChange}
					name="name"
					inputProps={{ maxLength: 40 }}
					label="Nombre del proyecto"
					style={{ width: "400px" }}
					required
					value={newProject.name}
				/>
				<BasicInput
					onChange={handleInputChange}
					name="description"
					label="Descripción del proyecto"
					style={{ width: "400px" }}
					inputProps={{ maxLength: 400 }}
					required
					type="textarea"
					multiline
					rows={5}
					value={newProject.description}
				/>
				<BasicInput
					onChange={handleEndDateChange}
					name="endDate"
					label="Finalizar para:"
					style={{ width: "400px" }}
					inputProps={{ maxLength: 400 }}
					required
					type="date"
					value={newProject.endDate}
				/>
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
					onClick={onCreateNewProject}
					disabled={disabledButton}
				>
					Aceptar
				</BasicButton>
			</Box>
		</Box>
	);
};

export default NewProjectForm;
