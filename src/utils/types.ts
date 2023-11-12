export interface IProject {
	id: number | string;
	name: string;
	description: string;
	status: ProjectStatus;
	createdAt: string;
	endDate: string;
	finishedAt: string;
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
