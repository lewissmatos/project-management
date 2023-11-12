import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	DialogProps,
} from "@mui/material";
import BasicButton from "./BasicButton";
import { FC, ReactNode } from "react";

type BasicDialogProps = {
	open: boolean;
	handleClose: any;
	onAccept?: any;
	title: string;
	content?: ReactNode;
	contentText?: string;
	hideActions?: boolean;
	hideCancel?: boolean;
	hideAccept?: boolean;
	cancelLabel?: string;
	acceptLabel?: string;
	actions?: ReactNode | ReactNode[];
	target?: "info" | "delete";
} & DialogProps;
const BasicDialog: FC<BasicDialogProps> = ({
	open,
	handleClose,
	title,
	content,
	contentText,
	onAccept,
	hideActions,
	hideCancel,
	hideAccept,
	actions,
	target,
}) => {
	const onSubmit = () => {
		onAccept();
		handleClose();
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{contentText}
				</DialogContentText>
				{content}
			</DialogContent>
			{!hideActions && (
				<DialogActions>
					{actions}
					{!hideCancel && (
						<BasicButton remix="black" onClick={handleClose}>
							Cancelar
						</BasicButton>
					)}
					{!hideAccept && (
						<BasicButton
							onClick={onSubmit}
							autoFocus
							remix={target === "delete" ? "cancel" : "contained"}
						>
							Aceptar
						</BasicButton>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};

export default BasicDialog;
