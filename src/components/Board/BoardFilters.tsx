import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import "./board.scss";
import { BasicButton, BasicInput, BasicLabel } from "../Basic";
import BasicSelect from "../Basic/BasicSelect";
import { FC } from "react";
import { getAllPeople } from "../../services/people.service";
import { generateStyle } from "../utils/shared-components.utils";
import { IProject, ProjectStatus } from "../../utils/types";
import { editProject } from "../../services/projects.service";
import dayjs from "dayjs";

type BoardFiltersProps = {
	filters: any;
	setFilters: any;
	project: IProject;
	setProject: any;
};
const BoardFilters: FC<BoardFiltersProps> = ({
	filters,
	setFilters,
	project,
	setProject,
}) => {
	const people = getAllPeople();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const handleSetProjectStatus = (status: ProjectStatus) => () => {
		const newProject: IProject = {
			...project,
			status,
			...(status === "Finalizado" && {
				finishedAt: dayjs().format("YYYY-MM-DD, HH:mm"),
			}),
		};
		setProject(newProject);
		editProject(newProject);
	};
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Box className="board-filtes">
				<BasicInput
					name="search"
					label="Buscar "
					style={{ width: "400px" }}
					onChange={handleInputChange}
					size="small"
				/>
				<BasicSelect
					name="priority"
					onChange={handleInputChange as any}
					style={{ width: "300px" }}
					label="Prioridad"
					size="small"
				>
					<MenuItem value="Baja">Baja</MenuItem>
					<MenuItem value="Media">Media</MenuItem>
					<MenuItem value="Alta">Alta</MenuItem>
				</BasicSelect>
				<Box>
					<BasicLabel label="Asignado a" />
					<Autocomplete
						id="combo-box-demo"
						getOptionLabel={(option: any) => option.name}
						options={people}
						renderInput={(params) => (
							<TextField
								{...params}
								sx={{
									borderRadius: "6px",
									...generateStyle("solid", "input"),
									width: "300px",
								}}
								size="small"
							/>
						)}
						value={filters?.assignedTo || { name: "" }}
						onChange={(_, value) => {
							setFilters({
								...filters,
								assignedTo: value,
							});
						}}
					/>
				</Box>
			</Box>
			<BasicButton
				onClick={handleSetProjectStatus(
					project.status === "Activo" ? "Finalizado" : "Activo"
				)}
				size="small"
				remix={project.status === "Activo" ? "cancel" : "contained"}
			>
				{project.status === "Activo" ? "Finalizar" : "Reactivar"} proyecto
			</BasicButton>
		</Box>
	);
};

export default BoardFilters;
