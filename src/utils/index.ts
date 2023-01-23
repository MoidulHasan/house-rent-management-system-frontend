export const convertTime = (dateTime: string) => {
	const months: string[] = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const time = new Date(dateTime);

	let date: number | string = time?.getDate();
	if (date < 10) date = "0" + date;

	const month = time?.getMonth();

	const year = time?.getFullYear();

	let hour: number | string = time?.getHours() % 12;
	if (hour < 10) hour = "0" + hour;

	let minute: number | string = time?.getMinutes();
	if (minute < 10) minute = "0" + minute;

	let seconds: number | string = time?.getSeconds();
	if (seconds < 10) seconds = "0" + seconds;

	return (
		date +
		" " +
		months[month] +
		" " +
		year +
		", " +
		hour +
		":" +
		minute +
		" " +
		(time.getHours() / 12 === 0 ? "AM" : "PM")
	);
};

export const formatedDate = (value) => {
	const date = new Date(value);
	return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};
