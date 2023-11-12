import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { IColumn, ITask } from "../../utils/types";
import { BasicModal } from "../Basic";
import TaskForm from "./TaskForm";
import PersonIcon from "@mui/icons-material/Person";
type BoardTaskProps = {
	task: ITask;
	setColumns?: any;
	column: IColumn;
	disabled?: boolean;
};
const BoardTask: FC<BoardTaskProps> = ({
	task,
	setColumns,
	column,
	disabled,
}) => {
	const [openTaskDetailsModal, setOpenTaskDetailsModal] = useState(false);

	const onDragStart = (e: any) => {
		if (disabled) return;
		e.dataTransfer.setData("task", JSON.stringify(task));
	};
	const handleOpenTaskDetailsModal = () => {
		setOpenTaskDetailsModal(true);
	};
	const handleCloseTaskDetailsModal = () => {
		setOpenTaskDetailsModal(false);
	};

	return (
		<>
			<BasicModal
				title={`Editar tarea ${task.id}`}
				open={openTaskDetailsModal}
				onClose={handleCloseTaskDetailsModal}
			>
				<TaskForm
					column={column}
					hideButtons={disabled}
					task={task}
					setColumns={setColumns}
					onClose={handleCloseTaskDetailsModal}
				/>
			</BasicModal>
			<Box
				className="board-task"
				draggable={!disabled}
				onDragStart={onDragStart}
				onClick={handleOpenTaskDetailsModal}
			>
				<Box className={`task-priority-bar ${task.priority}`} />
				<Box className="task-body-container">
					<Typography className="task-title">
						<span>{task?.id}</span>. {task?.title}
					</Typography>
					<Typography className="task-description">
						{task?.description}
					</Typography>
					{task?.assignedTo?.name && (
						<Box className="task-assigned-person">
							<PersonIcon sx={{ fontSize: 16 }} /> {task?.assignedTo?.name}
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default BoardTask;
