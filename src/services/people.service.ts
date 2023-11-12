import { IPerson } from "../utils/types";
import { generateId } from "../utils/utils.app";
import { getData, setData } from "./localStorage.service";

const getAllPeople = (all = true) => {
	const people = getData("people") || [];

	const filteredPeople = people.filter((p: IPerson) => p.status === "Activo");
	return all ? people : filteredPeople;
};

const createPerson = (person: IPerson) => {
	const people = getAllPeople();

	people.push({ ...person, id: generateId("people") });

	setData("people", people);
};

const editPerson = (person: IPerson) => {
	const people = getAllPeople() as IPerson[];
	const index = people.findIndex((p) => p.id === person.id);
	people[index] = person;
	setData("people", people);
};

export { getAllPeople, createPerson, editPerson };
