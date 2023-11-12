import React, { ReactNode, useState } from "react";
import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Colors } from "../../styles/colors";

type BasicAccordionProps = {
	summary?: ReactNode;
	children?: ReactNode;
	defaultExpanded?: boolean;
} & AccordionProps;

const BasicAccordion: React.FC<BasicAccordionProps> = ({
	summary = "",
	children,
	defaultExpanded,
	...props
}) => {
	const [expanded, setExpanded] = useState(defaultExpanded);

	const handleAccordionChange = () => {
		setExpanded(!expanded);
	};

	return (
		<Accordion expanded={expanded} {...props} onChange={handleAccordionChange}>
			<AccordionSummary
				sx={{ background: "#F8F8F8" }}
				expandIcon={<ExpandMoreIcon sx={{ color: Colors.accent }} />}
			>
				<Typography sx={{ fontSize: 17, color: "#656872", fontWeight: "500" }}>
					{summary}
				</Typography>
			</AccordionSummary>
			{children}
		</Accordion>
	);
};

export default BasicAccordion;
``;
