export const useMenus = () => {
	return [
		{
			items: [
				{
					label: "Dashboard",
					icon: "dashboard",
					iconType: "image",
					to: "/",
				},
				{
					label: "Apartments",
					icon: "pi pi-building",
					to: "/apartments",
				},
				{
					label: "Renters",
					icon: "pi pi-user",
					to: "/renters",
				},
			],
		},
	];
};
