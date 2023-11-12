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
const ProjectColumnBarChart = () => {
	const { projectId } = useParams();

	const labels = getAllColumnsByProject(projectId as string).map(
		(column: IColumn) => column.name
	);

	const transformData = (inputData: IColumn[]): OutputData[] => {
		const result: OutputData[] = [];

		const priorities = Array.from(
			new Set(
				inputData.flatMap((column) => column.tasks.map((task) => task.priority))
			)
		);
		const countByPriority: { [key: string]: number[] } = {};

		priorities.forEach((priority) => {
			countByPriority[priority] = Array(inputData.length).fill(0);
		});

		inputData.forEach((column, columnIndex) => {
			column.tasks.forEach((task) => {
				countByPriority[task.priority][columnIndex] += 1;
			});
		});

		const colors = {
			Alta: Colors.red,
			Media: Colors.yellow,
			Baja: Colors.green,
		};

		// Crear el formato de salida
		priorities.forEach((priority) => {
			result.push({
				name: priority,
				data: countByPriority[priority],
				color: colors[priority] || "",
			});
		});

		return result;
	};

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

export default ProjectColumnBarChart;
