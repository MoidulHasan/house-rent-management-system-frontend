export interface User {
	role: string;
	active: boolean;
	_id: string;
	name: string;
	email: string;
}

export interface Apartment {
	_id: string;
	Unit_Name: string;
	Descriptions: string;
	Building_Name: string;
	Category: string;
	Status: string;
	Rent_Charge: number;
	Number_of_room: number;
	Abailable_From: string;
	Billing: [];
	applications: [];
}

export interface Application {
	_id: string;
	application_date: string;
	application_status: string;
	apartment: Apartment;
	user: User;
}
