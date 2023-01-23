export const useMenus = () => {
	return [
		{
			items: [
				{
					label: "Dashboard",
					icon: "dashboard",
					iconType: "image",
					to: "/admin/",
				},
				{
					label: "Building",
					icon: "pi pi-building",
					to: "/admin/building",
				},
				{
					label: "Apartments",
					icon: "pi pi-building",
					to: "/admin/apartments",
				},
				{
					label: "Renters",
					icon: "pi pi-user",
					to: "/admin/renters",
				},
				{
					label: "Rental Application",
					icon: "pi pi-file",
					to: "/admin/applications",
				},
			],
		},
	];
};
