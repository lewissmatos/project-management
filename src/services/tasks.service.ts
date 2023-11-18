import dayjs from "dayjs";
import { IColumn, IStoredFile, ITask } from "../utils/types";
import { generateId } from "../utils/utils.app";
import { getData, setData } from "./localStorage.service";
import { ColumnData } from "../components/Board/BoardScreen";

const getAllColumnsByProject = (projectId: string | number) => {
	const allColumns = getData("columns") || [];

	const columns = allColumns.filter(
		(column: IColumn) => column.projectId === projectId
	);
	return columns;
};

const getAllColumns = () => {
	const allColumns = getData("columns") || [];
	return allColumns;
};

const addColumn = (data: ColumnData, projectId: string) => {
	const columns = getAllColumns();
	const { name, color } = data;
	const newColor = color || "#e6e6e6";
	const newColumn = {
		id: generateId("columns"),
		name,
		color: newColor,
		tasks: [],
		projectId,
	};
	columns.push(newColumn);
	setData("columns", columns);
};

const createTask = (
	columnId: string | number,
	task: ITask,
	projectId: string | number
) => {
	const columns = getAllColumnsByProject(projectId);
	const column = columns.find((column: IColumn) => column.id === columnId);
	if (column) {
		const newTask = {
			id: generateId("tasks"),
			...task,
			createdAt: dayjs().format("YYYY-MM-DD, HH:mm"),
			status: "Activo",
			projectId,
			columnId,
		};
		column.tasks.push(newTask);
		const allColumns = getAllColumns();
		const index = allColumns.findIndex(
			(column: IColumn) => column.id === columnId
		);
		allColumns[index] = column;
		setData("columns", allColumns);
	}
};

const editColumn = (updatedColumn: IColumn) => {
	const columns = getAllColumns();
	const index = columns.findIndex(
		(column: IColumn) => column.id === updatedColumn.id
	);
	columns[index] = updatedColumn;
	setData("columns", columns);
};

const deleteColumn = (columnId: string | number) => {
	const columns = getAllColumns();
	const index = columns.findIndex((column: IColumn) => column.id === columnId);
	columns.splice(index, 1);
	setData("columns", columns);
};

const deleteAllColumnsByProject = (projectId: string | number) => {
	// Get all columns from local storage
	const allColumns = getData("columns") || [];
	// Filter out the columns that have the specified projectId
	const updatedColumns = allColumns.filter(
		(column: IColumn) => column.projectId !== projectId
	);
	// Update the local storage with the filtered columns
	setData("columns", updatedColumns);
};
const editTask = (
	columnId: string | number,
	updatedTask: ITask,
	projectId: string | number
) => {
	const columns = getAllColumnsByProject(projectId);
	const column = columns.find((column: IColumn) => column.id === columnId);
	if (column) {
		const taskIndex = column.tasks.findIndex(
			(task: ITask) => task.id === updatedTask?.id
		);
		if (taskIndex !== -1) {
			column.tasks[taskIndex] = updatedTask;
			const allColumns = getAllColumns();
			const index = allColumns.findIndex(
				(column: IColumn) => column.id === columnId
			);
			allColumns[index] = column;
			setData("columns", allColumns);
		}
	}
};

const moveTask = (
	fromColumnId: string | number,
	toColumnId: string | number,
	taskId: string | number,
	projectId: string | number
) => {
	const columns = getAllColumns();
	const fromColumn = columns.find(
		(column: IColumn) => column.id === fromColumnId
	);
	const toColumn = columns.find((column: IColumn) => column.id === toColumnId);
	if (fromColumn && toColumn) {
		const taskIndex = fromColumn.tasks.findIndex(
			(task: ITask) => task.id === taskId
		);
		if (taskIndex !== -1) {
			const task = fromColumn.tasks[taskIndex] as ITask;
			// Update the task's column ID to the new column ID
			task.columnId = toColumnId;
			task.projectId = projectId;

			toColumn.tasks.unshift(task);
			fromColumn.tasks.splice(taskIndex, 1);
			setData("columns", columns);
		}
	}
};

const deleteTask = (taskId: string | number, columnId: string | number) => {
	const columns = getAllColumns();
	const column = columns.find((column: IColumn) => column.id === columnId);
	if (column) {
		const taskIndex = column.tasks.findIndex(
			(task: ITask) => task.id === taskId
		);
		if (taskIndex !== -1) {
			column.tasks.splice(taskIndex, 1);
			setData("columns", columns);
		}
	}
};

const storeFile = (file: File): any => {
	const reader = new FileReader();

	let serializedFile = "";
	reader.onload = (event) => {
		const content = event.target?.result as string;

		const storedFile: IStoredFile = {
			name: file.name,
			type: file.type,
			content,
		};

		serializedFile = JSON.stringify(storedFile);
	};

	reader.readAsText(file);

	return serializedFile;
};

const getFile = (): IStoredFile | null => {
	const serializedFile = localStorage.getItem("storedFile");

	if (serializedFile) {
		const storedFile: IStoredFile = JSON.parse(serializedFile);
		return storedFile;
	}

	return null;
};

export {
	getAllColumnsByProject,
	addColumn,
	deleteColumn,
	deleteAllColumnsByProject,
	editColumn,
	createTask,
	editTask,
	moveTask,
	deleteTask,
	storeFile,
	getFile,
};
