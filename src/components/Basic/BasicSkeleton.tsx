import { Box, Skeleton, SkeletonProps } from "@mui/material";
import { CSS } from "styled-components/dist/types";

const BasicSkeleton = ({
	repeat = 1,
	boxStyle,
	direction,
	...props
}: {
	repeat?: number;
	direction?: string;
	boxStyle?: CSS.Properties | object;
} & SkeletonProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: direction || "row",
				gap: 3,
				...boxStyle,
			}}
		>
			{Array(repeat)
				.fill(null)
				.map((_, index) => (
					<Skeleton
						key={index}
						animation="wave"
						{...props}
						sx={{ height: "100px", width: "100%", ...props.sx }}
					/>
				))}
		</Box>
	);
};

export default BasicSkeleton;
