import dayjs from "dayjs";
import { IProject } from "../utils/types";
import { generateId } from "../utils/utils.app";
import { getData, setData } from "./localStorage.service";
import { deleteAllColumnsByProject } from "./tasks.service";
import { getLoggedUser } from "./auth.service";

const getAllProjects = () => {
	const projects = getData("projects") || [];
	return projects;
};

const getAllProjectByUserId = (id: string | number) => {
	const projects = getData("projects") || [];

	const filteredProjects = projects.filter(
		(item: IProject) => item?.userId?.toString() === id?.toString()
	);
	return filteredProjects;
};

const getProject = (id: string | number) => {
	const projects = getAllProjects();
	const project = projects.find(
		(item: IProject) => item.id.toString() === id.toString()
	);
	return project;
};

const createProject = (project: IProject) => {
	const projects = getAllProjects();
	const user = getLoggedUser();
	const newProject = {
		...project,
		id: generateId("projects"),
		createdAt: dayjs().format("YYYY-MM-DD, HH:mm"),
		status: "Activo",
		userId: user?.id,
	} as IProject;
	projects?.unshift(newProject);
	setData("projects", projects);
};

const editProject = (project: IProject) => {
	const projects = getAllProjects();
	const index = projects.findIndex((item: any) => item.id === project.id);
	projects[index] = project;
	setData("projects", projects);
};

const deleteProject = (id: string) => {
	const projects = getAllProjects();
	const index = projects.findIndex((item: any) => item.id === id);
	projects.splice(index, 1);
	setData("projects", projects);
	deleteAllColumnsByProject(id);
};

export {
	getAllProjects,
	getProject,
	createProject,
	editProject,
	deleteProject,
	getAllProjectByUserId,
};
