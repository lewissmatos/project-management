import dayjs from "dayjs";
import { IProject } from "../../utils/types";
import { Colors } from "../../styles/colors";

export const getProjectProegress = (project: IProject) => {
	const { createdAt, endDate } = project;

	let color = "white";
	let message = "";
	const projectDuration = dayjs(endDate).diff(dayjs(createdAt), "hours");
	const projectProgressTime = dayjs(dayjs()).diff(dayjs(createdAt), "hours");

	let projectLeftTimeRest: string | number =
		(projectProgressTime / projectDuration) * 100;

	if (projectLeftTimeRest <= 33) {
		color = Colors.abiOrange;
	} else if (projectLeftTimeRest > 33 && projectLeftTimeRest <= 66) {
		color = Colors.yellow;
	} else {
		color = Colors.green;
		projectLeftTimeRest = 100;
	}

	if (projectLeftTimeRest === 100 && project.status === "Activo") {
		color = Colors.red;
		projectLeftTimeRest = "!!";
		message = "El proyecto debió haber terminado";
	}

	return { value: projectLeftTimeRest, color, message };
};
