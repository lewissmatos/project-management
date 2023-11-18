export interface IProject {
	id: number | string;
	name: string;
	description: string;
	status: ProjectStatus;
	createdAt: string;
	endDate: string;
	finishedAt: string;
	userId: number | string;
}

export type ProjectStatus = "Activo" | "Finalizado";

export interface ITask {
	id?: number | string;
	projectId?: number | string;
	title: string;
	description: string;
	createdAt: string;
	finishedAt: string;
	priority: IProjectTaskPriority;
	columnId?: number | string;
	assignedTo?: IPerson | null;
	files?: IStoredFile[];
}

type IProjectTaskPriority = "Alta" | "Media" | "Baja";

export interface IColumn {
	id: number | string;
	name: string;
	color?: string;
	tasks: ITask[];
	projectId: number | string;
}

export interface IPerson {
	id: number | string;
	name: string;
	role: string;
	createAt: string;
	status: "Activo" | "Inactivo";
}

export interface IUser {
	id: number | string;
	name: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
	createAt: string;
}

export interface IStoredFile {
	name: string;
	type: string;
	content: string;
}
