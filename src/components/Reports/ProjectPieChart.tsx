import { useParams } from "react-router-dom";
import { IColumn } from "../../utils/types";
import { getAllColumnsByProject } from "../../services/tasks.service";
import Chart from "react-apexcharts";
import { Box, Typography } from "@mui/material";

const ProjectPieChart = () => {
	const { projectId } = useParams();

	const { labels, series, colors } = getAllColumnsByProject(
		projectId as string
	).reduce(
		(acc: any, column: IColumn) => {
			acc.labels.push(column.name);
			acc.series.push(column.tasks.length);
			acc.colors.push(column.color);
			return acc;
		},
		{ labels: [], series: [], colors: [] }
	);

	const state = {
		series: series,
		options: {
			chart: {
				width: 380,
				type: "pie",
			},
			labels: labels,
			fill: {
				colors,
			},
			legend: {
				markers: {
					width: 12,
					height: 12,
					strokeWidth: 0,
					strokeColor: "#fff",
					fillColors: colors,
				},
			},
		},
	};
	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
			<Typography sx={{ fontSize: 30, mb: 2 }}>
				Rendimiento del proyecto
			</Typography>
			<Chart
				options={state?.options as any}
				series={state?.series || []}
				type={state?.options?.chart?.type as any}
				width="100%"
				height={550}
			/>
		</Box>
	);
};

export default ProjectPieChart;
