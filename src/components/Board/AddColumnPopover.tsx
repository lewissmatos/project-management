import { Popover } from "@mui/material";
import { FC } from "react";
import { BasicIconButton, BasicInput } from "../Basic";
import SaveIcon from "@mui/icons-material/Save";
import { IColumn } from "../../utils/types";

type AddColumnPopoverProps = {
	handleChangeColumnData: any;
	handleAccept: any;
	popoverId: any;
	openPopover: any;
	popoverAnchorEl: any;
	handleClosePopover: any;
	columnData?: IColumn;
};
const AddColumnPopover: FC<AddColumnPopoverProps> = ({
	popoverId,
	handleChangeColumnData,
	handleAccept,
	openPopover,
	popoverAnchorEl,
	handleClosePopover,
	columnData,
}) => {
	return (
		<Popover
			id={popoverId}
			open={openPopover}
			anchorEl={popoverAnchorEl}
			onClose={handleClosePopover}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
		>
			<BasicInput
				placeholder="Nombre de la columna"
				sx={{
					backgroundColor: "white !important",
					width: "200px !important",
				}}
				name="name"
				defaultValue={columnData?.name || ""}
				onChange={(e) => handleChangeColumnData(e)}
				endAdornment={
					<BasicIconButton
						remix="blured"
						title="Agregar columna"
						onClick={handleAccept}
						aria-describedby={popoverId}
						sx={{ ml: 1 }}
					>
						<SaveIcon sx={{ fontSize: 18 }} />
					</BasicIconButton>
				}
			/>
			<BasicInput
				placeholder="Nombre de la columna"
				sx={{
					backgroundColor: "white !important",
					width: "200px !important",
				}}
				label="Color de la columna"
				labelStyle={{ marginLeft: "14px" }}
				type="color"
				name="color"
				defaultValue={columnData?.color || "#e6e6e6"}
				onChange={(e) => handleChangeColumnData(e)}
			/>
		</Popover>
	);
};

export default AddColumnPopover;
