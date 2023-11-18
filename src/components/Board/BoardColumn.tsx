import { Box, Typography } from "@mui/material";
import "./board.scss";
import { IColumn, ITask } from "../../utils/types";
import { FC, useState } from "react";
import BoardTask from "./BoardTask";
import { BasicButton, BasicIconButton, BasicModal } from "../Basic";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandIcon from "@mui/icons-material/Expand";
import EditIcon from "@mui/icons-material/Edit";
import {
	deleteColumn,
	editColumn,
	getAllColumnsByProject,
	moveTask,
} from "../../services/tasks.service";
import { useParams } from "react-router-dom";
import { Colors } from "../../styles/colors";
import TaskForm from "./TaskForm";
import BasicDialog from "../Basic/BasicDialog";
import AddColumnPopover from "./AddColumnPopover";

type BoardColumnProps = {
	column: IColumn;
	setColumns?: any;
	isProjectFinished?: boolean;
};
const BoardColumn: FC<BoardColumnProps> = ({
	column,
	setColumns,
	isProjectFinished,
}) => {
	const { projectId } = useParams();

	const [columnData, setColumnData] = useState(column as IColumn);

	const [popoverAnchorEl, setPopoverAnchorEl] =
		useState<HTMLButtonElement | null>(null);

	const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);

	const [openConfirmDeleteColumnModal, setOpenConfirmDeleteColumnModal] =
		useState(false);

	const [condensedColumn, setCondensedColumn] = useState(false);

	const handleOpenCreateTaskModal = () => {
		setOpenCreateTaskModal(true);
	};
	const handleCloseTaskDetailsModal = () => {
		setOpenCreateTaskModal(false);
	};
	const onDropTask = (e: any) => {
		const task = JSON.parse(e.dataTransfer.getData("task")) as ITask;
		if (task.columnId === column.id) return;
		moveTask(
			task.columnId as string,
			column?.id,
			task?.id as string,
			projectId as string
		);
		setColumns(getAllColumnsByProject(projectId as string));
	};

	const onDeleteColumn = () => {
		deleteColumn(column.id);
		setColumns(getAllColumnsByProject(projectId as string));
	};

	const handleEditColumn = () => {
		editColumn(columnData);
		setColumns(getAllColumnsByProject(projectId as string));
		handleClosePopover();
	};

	const handleOpenConfirmDeleteColumnModal = () =>
		setOpenConfirmDeleteColumnModal(true);

	const handleCloseConfirmDeleteColumnModal = () =>
		setOpenConfirmDeleteColumnModal(false);

	const handleSetCondensedColumn = () => setCondensedColumn(!condensedColumn);

	const openPopover = Boolean(popoverAnchorEl);

	const popoverId = openPopover ? "simple-popover" : undefined;

	const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setPopoverAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setPopoverAnchorEl(null);
	};

	const handleChangeColumnData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColumnData({
			...columnData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<BasicDialog
				title="Eliminar columna"
				content={
					(
						<Typography>
							¿Estás seguro que deseas eliminar esta columna?
						</Typography>
					) as any
				}
				open={openConfirmDeleteColumnModal}
				handleClose={handleCloseConfirmDeleteColumnModal}
				onAccept={onDeleteColumn}
			/>
			<BasicModal
				title="Crear tarea"
				open={openCreateTaskModal}
				onClose={handleCloseTaskDetailsModal}
				paperProps={{ sx: { width: "60vw" } }}
			>
				<TaskForm
					column={column}
					setColumns={setColumns}
					onClose={handleCloseTaskDetailsModal}
				/>
			</BasicModal>
			<Box
				className={`board-column ${condensedColumn ? "condensed" : ""}`}
				onDragOver={(e) => e.preventDefault()}
				onDrop={onDropTask}
			>
				<Typography
					className={`board-column-title ${condensedColumn ? "condensed" : ""}`}
					sx={{ borderColor: `${column?.color} !important` }}
				>
					{!condensedColumn ? (
						<>
							<span style={{ display: "flex", alignItems: "center" }}>
								{column.name}: {column.tasks?.length}
							</span>
							<Box>
								{!isProjectFinished ? (
									<>
										<BasicIconButton
											remix="text"
											title="Eliminar columna"
											onClick={handleOpenConfirmDeleteColumnModal}
											className="board-column-title-icon"
											tooltipOptions={{ tooltipaccent: Colors.red }}
										>
											<DeleteOutlineIcon
												sx={{ fontSize: 20, color: Colors.red }}
											/>
										</BasicIconButton>
										<BasicIconButton
											remix="text"
											title="Editar columna"
											onClick={handleOpenPopover}
											className="board-column-title-icon"
										>
											<EditIcon sx={{ fontSize: 20, color: Colors.accent }} />
										</BasicIconButton>
									</>
								) : null}
								<BasicIconButton
									remix="text"
									title="Contraer columna"
									className="board-column-title-icon"
									onClick={handleSetCondensedColumn}
								>
									<ExpandIcon
										sx={{
											transform: "rotate(90deg) !important",
											fontSize: 20,
											color: Colors.accent,
										}}
									/>
								</BasicIconButton>
							</Box>
							{!isProjectFinished && (
								<AddColumnPopover
									columnData={columnData}
									handleChangeColumnData={handleChangeColumnData}
									handleAccept={handleEditColumn}
									popoverId={popoverId}
									openPopover={openPopover}
									popoverAnchorEl={popoverAnchorEl}
									handleClosePopover={handleClosePopover}
								/>
							)}
						</>
					) : (
						<BasicIconButton
							remix="text"
							title={column.name}
							className="board-column-title-icon"
							onClick={handleSetCondensedColumn}
						>
							<ExpandIcon
								sx={{
									transform: "rotate(90deg) !important",
									fontSize: 20,
									color: Colors.accent,
								}}
							/>
						</BasicIconButton>
					)}
				</Typography>
				{!condensedColumn && (
					<>
						{!isProjectFinished && (
							<BasicButton
								remix="text"
								style={{ borderRadius: "4px", marginBottom: 1 }}
								onClick={handleOpenCreateTaskModal}
							>
								Agregar tarea <AddOutlinedIcon sx={{ fontSize: 18, ml: 1 }} />
							</BasicButton>
						)}

						<Box className="board-column-body">
							{column.tasks.map((task) => (
								<BoardTask
									disabled={isProjectFinished}
									key={task.id}
									task={task}
									setColumns={setColumns}
									column={column}
								/>
							))}
						</Box>
					</>
				)}
			</Box>
		</>
	);
};

export default BoardColumn;
