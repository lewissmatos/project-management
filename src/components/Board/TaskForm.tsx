import { FC, useState } from "react";
import { IColumn, ITask } from "../../utils/types";
import {
	Autocomplete,
	Box,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import "./board.scss";
import { BasicButton, BasicInput, BasicLabel } from "../Basic";
import BasicSelect from "../Basic/BasicSelect";
import {
	createTask,
	deleteTask,
	editTask,
	getAllColumnsByProject,
} from "../../services/tasks.service";
import BasicDialog from "../Basic/BasicDialog";
import { getAllPeople } from "../../services/people.service";
import { generateStyle } from "../utils/shared-components.utils";
type TaskFormProps = {
	task?: ITask;
	column?: IColumn;
	setColumns?: any;
	onClose?: any;
	hideButtons?: boolean;
};

const TaskForm: FC<TaskFormProps> = ({
	task,
	column,
	setColumns,
	onClose,
	hideButtons,
}) => {
	const [taskToEdit, setTaskToEdit] = useState({ ...task } as ITask);

	const people = getAllPeople(false);
	const [openConfirmDeleteTask, setOpenConfirmDeleteTask] = useState(false);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskToEdit({
			...taskToEdit,
			[e.target.name]: e.target.value,
		});
	};
	const disabledButton =
		!taskToEdit?.title || !taskToEdit?.description || !taskToEdit?.priority;

	const onCreateNewTask = () => {
		if (task?.id) {
			editTask(column?.id as string, taskToEdit, column?.projectId as string);
		} else {
			createTask(column?.id as string, taskToEdit, column?.projectId as string);
		}
		setColumns(getAllColumnsByProject(column?.projectId as string));
		onClose();
	};

	const onDeleteTask = () => {
		deleteTask(task?.id as string, column?.id as string);
		setColumns(getAllColumnsByProject(column?.projectId as string));
		onClose();
	};

	return (
		<>
			<BasicDialog
				open={openConfirmDeleteTask}
				handleClose={() => setOpenConfirmDeleteTask(false)}
				title="Eliminar tarea"
				onAccept={onDeleteTask}
				content={
					(
						<Typography>
							¿Estás seguro que deseas eliminar esta tarea?
						</Typography>
					) as any
				}
			/>
			<Box className="new-task-form-container">
				<Box className="fields-container">
					<BasicInput
						onChange={handleInputChange}
						name="title"
						inputProps={{ maxLength: 40 }}
						label="Titulo"
						style={{ width: "400px" }}
						required
						value={taskToEdit?.title}
					/>
					<BasicInput
						onChange={handleInputChange}
						name="description"
						label="Descripción"
						style={{ width: "400px" }}
						inputProps={{ maxLength: 400 }}
						required
						type="textarea"
						multiline
						rows={5}
						value={taskToEdit?.description}
					/>
					<BasicSelect
						renderValue={(value: any) => (
							<Typography className={`task-details-priority ${value}`}>
								{value}
							</Typography>
						)}
						label="Prioridad"
						name="priority"
						onChange={handleInputChange as any}
						style={{ width: "400px" }}
						defaultValue={taskToEdit?.priority}
					>
						<MenuItem value="Baja">Baja</MenuItem>
						<MenuItem value="Media">Media</MenuItem>
						<MenuItem value="Alta">Alta</MenuItem>
					</BasicSelect>
					<Box>
						<BasicLabel label="Asignar a" />
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
										width: "100%",
									}}
								/>
							)}
							value={taskToEdit?.assignedTo}
							onChange={(_, value) => {
								setTaskToEdit({
									...taskToEdit,
									assignedTo: value,
								});
							}}
						/>
					</Box>
				</Box>
				{!hideButtons && (
					<Box
						sx={{
							display: "flex",
							justifyContent: task?.id ? "space-between" : "flex-end",
							width: "100%",
							mt: 2,
						}}
					>
						{task?.id && (
							<BasicButton
								onClick={() => setOpenConfirmDeleteTask(true)}
								remix="cancel"
							>
								Eliminar tarea
							</BasicButton>
						)}
						<BasicButton
							endIcon={<ArrowRightAltOutlinedIcon />}
							onClick={onCreateNewTask}
							disabled={disabledButton}
						>
							Aceptar
						</BasicButton>
					</Box>
				)}
			</Box>
		</>
	);
};

export default TaskForm;
