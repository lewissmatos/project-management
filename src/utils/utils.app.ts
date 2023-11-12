import { getData } from "../services/localStorage.service";

export const generateId = (
	entity: string,
	options?: { min: number; max: number }
) => {
	const { min = 2, max = 8 } = options || {};

	const generateRandomId = () => {
		const randomId = Math.floor(
			Math.pow(10, min - 1) +
				Math.random() * (Math.pow(10, max) - Math.pow(10, min - 1) - 1)
		).toString();
		return randomId.replace(/[^0-9]/g, ""); // Remove unwanted non-numeric characters
	};

	let id = generateRandomId();

	// Analyze whether a capitalized letter needs to be added
	const addCapital = Math.random() < 0.1; // 10% chance of adding a capitalized letter

	if (addCapital) {
		const capitalLetter = String.fromCharCode(
			65 + Math.floor(Math.random() * 26)
		);
		id = capitalLetter + id;
	}

	const isIdExist = getData(entity).find((item: any) => item.id === id);

	if (isIdExist) {
		id = generateId(entity, { min, max });
	}

	return id;
};
