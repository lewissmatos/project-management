import { FormControl, Chip, Box, MenuItem, Typography } from "@mui/material/";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";

import { BasicIconButton, BasicSelect, BasicSkeleton } from "./IndexBasic";
import { Colors } from "../../styles/colors";
import { PaginationResult } from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";

const chipStyles = {
	padding: 0,
	margin: 3,
	borderRadius: "6px",
	border: "none",
};
export type PaginationProps = {
	paginationInstance: PaginationResult;
	paginationOptions?: {
		quantities?: number[];
		hideLabel?: boolean;
		chipLimit?: number;
	};
	accentColor?: string;
};

export const BasicPagination: React.FC<PaginationProps> = ({
	paginationInstance,
	accentColor = Colors.accent,
	paginationOptions: {
		quantities = [10, 50, 100],
		hideLabel = false,
		chipLimit = 0,
	} = {},
}) => {
	const { t } = useTranslation();
	const {
		pageNumber,
		firstPage,
		previousPage,
		nextPage,
		lastPage,
		pageSize,
		setPageSize,
		currentPage,
		totalPages,
		totalCountInDB,
		pagesQuantity,
		setPageNumber,
		firstElementInRange,
		lastElementInRange,
	} = paginationInstance;

	const setElements = (e: any) => {
		let size = Number(e.target.value);
		if (size >= totalCountInDB) {
			size = totalCountInDB;
		}
		setPageSize(size);
		if (size >= totalCountInDB) {
			setPageNumber(1);
		}
	};

	const isLoading = isNaN(firstElementInRange);

	const disableAll = isLoading || firstElementInRange <= 0;
	const disableButtons = {
		disableFirstPage: pageNumber === 1 || disableAll,
		disablePreviousPage: pageNumber <= 1 || disableAll,
		disableNextPage: pageNumber === totalPages || disableAll,
		disableLastPage: pageNumber === totalPages || disableAll,
	};

	const {
		disableFirstPage,
		disablePreviousPage,
		disableNextPage,
		disableLastPage,
	} = disableButtons;

	const counterLabel =
		firstElementInRange <= 0
			? t("noElements")
			: `${firstElementInRange}-${lastElementInRange} ${t("of")}
	${totalCountInDB}`;

	return (
		<>
			{isLoading ? (
				<BasicSkeleton sx={{ width: 300, height: 40, p: 1 }} />
			) : (
				<Box
					sx={{
						borderRadius: "6px",
						p: 0.5,
						width: { xs: "100%", md: "auto" },
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						alignContent: "center",
					}}
				>
					{!hideLabel ? (
						<Box
							sx={{
								px: 0,
								py: 0.5,
								display: "flex",
								justifyContent: "space-between",
								gap: "4px",
							}}
						>
							<Typography
								variant="body2"
								sx={{
									marginLeft: 1,
									fontWeight: 400,
									color: "#747474",
								}}
							>
								{counterLabel}
							</Typography>
						</Box>
					) : null}

					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<FormControl sx={{ mx: 1, p: 0 }}>
								<BasicSelect
									disabled={disableAll}
									style={{ height: 30 }}
									value={pageSize}
									onChange={setElements}
								>
									{quantities?.map((value) => (
										<MenuItem key={value} value={value}>
											{value}
										</MenuItem>
									))}
									<hr className="m-0" />
									<MenuItem value={pageSize}>{pageSize}</MenuItem>
								</BasicSelect>
							</FormControl>
						</Box>
						<Box
							sx={{
								display: "inline",
								justifyContent: "center",
								alignItems: "center",
								mt: { xs: 1, md: 0 },
							}}
						>
							<BasicIconButton
								remix="text"
								size="small"
								onClick={firstPage}
								title={t("firstPage")}
								disabled={disableFirstPage}
							>
								<FirstPageRoundedIcon fontSize="small" />
							</BasicIconButton>

							<BasicIconButton
								remix="text"
								size="small"
								onClick={previousPage}
								title={t("previousPage")}
								disabled={disablePreviousPage}
							>
								<ChevronLeftRoundedIcon fontSize="small" />
							</BasicIconButton>

							<Box sx={{ display: "inline-block" }}>
								{pagesQuantity?.slice(0, chipLimit).map((page, i) => {
									if (
										[
											currentPage - 1,
											currentPage - 2,
											currentPage,
											currentPage + 1,
											currentPage + 2,
											...quantities,
										].includes(page)
									) {
										if (quantities?.includes(page)) {
											return (
												<>
													{page !== currentPage &&
														page !== currentPage + 1 &&
														page !== currentPage + 2 &&
														page !== currentPage - 1 &&
														page !== currentPage - 2 &&
														currentPage + 1 !== page - 1 &&
														currentPage + 2 !== page - 1 &&
														"..."}
													<Chip
														size="small"
														variant={
															page === currentPage ? "outlined" : "filled"
														}
														style={{
															...chipStyles,
															color: page === currentPage ? "white" : "black",
															backgroundColor:
																page === currentPage
																	? accentColor
																	: "#00000014",
														}}
														key={page}
														onClick={() => {
															setPageNumber(page);
														}}
														label={page}
													/>
													{page !== currentPage &&
														currentPage !== page + 1 &&
														page === currentPage / 2 &&
														i + 1 < currentPage &&
														"..."}
												</>
											);
										}
										return (
											<Chip
												size="small"
												variant={page === currentPage ? "outlined" : "filled"}
												style={{
													...chipStyles,
													color: page === currentPage ? "white" : "black",
													backgroundColor:
														page === currentPage ? accentColor : "#00000014",
												}}
												key={page}
												onClick={() => {
													setPageNumber(page);
												}}
												label={page}
											/>
										);
									} else return null;
								})}
							</Box>
							<BasicIconButton
								remix="text"
								size="small"
								onClick={nextPage}
								title={t("nextPage")}
								disabled={disableNextPage}
							>
								{<ChevronRightRoundedIcon fontSize="small" />}
							</BasicIconButton>

							<BasicIconButton
								remix="text"
								size="small"
								title={t("lastPage")}
								disabled={disableLastPage}
								onClick={lastPage}
							>
								<LastPageRoundedIcon fontSize="small" />
							</BasicIconButton>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};
