import { useParams } from "react-router-dom";
import { IColumn } from "../../utils/types";
import { getAllColumnsByProject } from "../../services/tasks.service";
import Chart from "react-apexcharts";
import { Colors } from "../../styles/colors";

type OutputData = {
	name: string;
	data: number[];
	color: string;
};
const NotAssignedBarChart = () => {
	const { projectId } = useParams();

	const transformData = (inputData: IColumn[]): OutputData[] => {
		const result: OutputData[] = [];

		const assignees = Array.from(
			new Set(
				inputData.flatMap((column) =>
					column.tasks.map((task) =>
						task.assignedTo ? "Asignadas" : "Sin asignar"
					)
				)
			)
		);

		const countByAssignee: { [key: string]: number[] } = {
			Asignadas: Array(inputData.length).fill(0),
			"Sin asignar": Array(inputData.length).fill(0),
		};

		inputData.forEach((column, columnIndex) => {
			column.tasks.forEach((task) => {
				const assigneeGroup = task.assignedTo ? "Asignadas" : "Sin asignar";
				countByAssignee[assigneeGroup][columnIndex] += 1;
			});
		});

		// Create the output format
		assignees.forEach((assignee) => {
			result.push({
				name: assignee,
				data: countByAssignee[assignee],
				color: assignee === "Sin asignar" ? Colors.grayMiddle : Colors.blue, // Adjust color as needed
			});
		});

		// Ensure "Asignadas" and "Sin asignar" objects are present, even if there are no tasks in those groups
		if (!result.find((group) => group.name === "Asignadas")) {
			result.push({
				name: "Asignadas",
				data: Array(inputData.length).fill(0),
				color: Colors.blue, // Adjust color as needed
			});
		}

		if (!result.find((group) => group.name === "Sin asignar")) {
			result.push({
				name: "Sin asignar",
				data: Array(inputData.length).fill(0),
				color: Colors.grayMiddle, // Adjust color as needed
			});
		}

		return result;
	};

	const labels = getAllColumnsByProject(projectId as string)?.map(
		(column: IColumn) => column.name
	);

	const state = {
		series: transformData(getAllColumnsByProject(projectId as string)),
		options: {
			chart: {
				type: "bar",
				stacked: true,
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: true,
				},
			},
			plotOptions: {
				bar: {
					horizontal: false,
					borderRadius: 4,
					dataLabels: {
						total: {
							enabled: true,
							style: {
								fontSize: "13px",
								fontWeight: 600,
							},
						},
					},
				},
			},
			xaxis: {
				categories: labels,
			},
			legend: {
				offsetY: 4,
				fontSize: "12px",
				markers: {
					width: 10,
					height: 10,
					radius: "50%",
				},
			},
			fill: {
				opacity: 1,
			},
		},
	};

	return (
		<Chart
			options={state?.options as any}
			series={state?.series || []}
			type={state?.options?.chart?.type as any}
			width="100%"
			height={450}
		/>
	);
};

export default NotAssignedBarChart;
