import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

import "./board.scss";
type BoardColumnsContainerProps = {
	children?: ReactNode;
};
const BoardColumnsContainer: FC<BoardColumnsContainerProps> = ({
	children,
}) => {
	return <Box className="board-columns-container">{children}</Box>;
};

export default BoardColumnsContainer;
