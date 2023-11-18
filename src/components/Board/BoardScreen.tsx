import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { IProject, IColumn, IPerson } from "../../utils/types";
import BoardColumnsContainer from "./BoardColumnsContainer";
import BoardColumn from "./BoardColumn";
import { BasicButton, BasicIconButton } from "../Basic";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import { getProject } from "../../services/projects.service";
import {
	addColumn,
	getAllColumnsByProject,
} from "../../services/tasks.service";
import { useEffect, useState } from "react";
import AddColumnPopover from "./AddColumnPopover";
import BoardFilters from "./BoardFilters";

type BoardFiltersProps = {
	search: string;
	priority: "Baja" | "Media" | "Alta";
	assignedTo: IPerson | null;
};
export type ColumnData = { name: string; color: string };
const BoardScreen = () => {
	const navigate = useNavigate();

	const { projectId } = useParams();

	const [project, setProject] = useState<IProject>(
		getProject(projectId as string) as IProject
	);
	const isProjectFinished = project?.status === "Finalizado";
	const [columns, setColumns] = useState<IColumn[]>(
		getAllColumnsByProject(projectId as string)
	);

	const [filters, setFilers] = useState({
		search: "",
		priority: "",
		assignedTo: null,
	} as any as BoardFiltersProps);

	function filterTasks(columns: IColumn[]): IColumn[] {
		return columns.map((column) => {
			return {
				...column,
				tasks: column.tasks.filter((task) => {
					// Filter based on search term
					const matchesSearch =
						task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
						task.description
							.toLowerCase()
							.includes(filters.search.toLowerCase());

					// Filter based on priority
					const matchesPriority =
						filters.priority === ("" as string) ||
						task.priority === filters.priority;

					// Filter based on assignedTo
					const matchesAssignedTo =
						filters.assignedTo === null ||
						task?.assignedTo?.name === (filters?.assignedTo?.name as any);

					// Return true if all filters match
					return matchesSearch && matchesPriority && matchesAssignedTo;
				}),
			};
		});
	}
	useEffect(() => {
		const filteredColumns = filterTasks(
			getAllColumnsByProject(projectId as string)
		);
		setColumns(filteredColumns);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const [columnData, setColumnData] = useState({} as ColumnData);

	const [popoverAnchorEl, setPopoverAnchorEl] =
		useState<HTMLButtonElement | null>(null);

	const openPopover = Boolean(popoverAnchorEl);

	const popoverId = openPopover ? "simple-popover" : undefined;

	const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setPopoverAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setPopoverAnchorEl(null);
	};
	const handleCreateNewColumn = () => {
		addColumn(columnData, projectId as string);
		setColumns(getAllColumnsByProject(projectId as string));
		handleClosePopover();
	};

	const handleChangeColumnData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColumnData({
			...columnData,
			[e.target.name]: e.target.value,
		});
	};

	const onGoToReports = () => {
		navigate(`/dashboard/projects/${projectId}/reports/`);
	};
	return (
		<Box className="board-screen">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mb: 2,
					alignItems: "center",
				}}
			>
				<Typography sx={{ fontSize: 50 }}>Tablero - {project?.name}</Typography>
				<BasicButton
					onClick={onGoToReports}
					endIcon={<DataUsageOutlinedIcon />}
				>
					<span>Ver reportes</span>
				</BasicButton>
			</Box>

			<BoardFilters
				filters={filters}
				setFilters={setFilers}
				project={project}
				setProject={setProject}
			/>
			<BoardColumnsContainer>
				<Box>
					<BasicIconButton
						remix="text"
						style={{
							borderRadius: "4px",
							marginBottom: 1,
							height: "50px !important",
							width: "50px !important",
						}}
						title="Agregar columna"
						onClick={handleOpenPopover}
						aria-describedby={popoverId}
						disabled={columns?.length >= 12 || isProjectFinished}
					>
						<AddOutlinedIcon sx={{ fontSize: 18 }} />
					</BasicIconButton>
					{!isProjectFinished && (
						<AddColumnPopover
							handleChangeColumnData={handleChangeColumnData}
							handleAccept={handleCreateNewColumn}
							popoverId={popoverId}
							openPopover={openPopover}
							popoverAnchorEl={popoverAnchorEl}
							handleClosePopover={handleClosePopover}
						/>
					)}
				</Box>
				{columns.map((column) => (
					<BoardColumn
						isProjectFinished={isProjectFinished}
						key={column.id}
						column={column}
						setColumns={setColumns}
					/>
				))}
			</BoardColumnsContainer>
		</Box>
	);
};

export default BoardScreen;
