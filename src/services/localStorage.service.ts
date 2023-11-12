const getData = (entity: string) =>
	JSON.parse(localStorage.getItem(entity) || "[]");

const setData = (entity: string, data = [] as any) =>
	localStorage.setItem(entity, JSON.stringify(data));

export { getData, setData };
