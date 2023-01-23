<template>
	<div>
		<DataTable
			ref="dt"
			:value="tableData"
			dataKey="_id"
			:paginator="true"
			:rows="10"
			:filters="filters"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
			responsiveLayout="scroll"
			class="w-full"
			headerClass="w-full"
		>
			<template #header>
				<div
					class="table-header flex align-items-center justify-content-between w-full"
				>
					<h5 class="mb-2 md:m-0 p-as-md-center">
						Manage Application
					</h5>

					<div>
						<Button
							label="Export"
							icon="pi pi-upload"
							class="p-button-help"
							@click="exportCSV($event)"
						/>
					</div>
				</div>
			</template>

			<Column header="Building Name" style="max-width: 10%">
				<template #body="slotProps">
					<a
						:href="
							'/admin/building/' +
							slotProps?.data?.apartment?.Building_Name
						"
					>
						{{ slotProps?.data?.apartment?.Building_Name }}
					</a>
				</template>
			</Column>

			<Column header="Apartment Name" style="max-width: 10%">
				<template #body="slotProps">
					<a
						:href="
							'/admin/apartments/' +
							slotProps?.data?.apartment?.Unit_Name
						"
					>
						{{ slotProps?.data?.apartment?.Unit_Name }}
					</a>
				</template>
			</Column>

			<Column header="Applicant Name" style="max-width: 10%">
				<template #body="slotProps">
					<a
						:href="
							'/admin/users/' + slotProps?.data?.user?._id
						"
					>
						{{ slotProps?.data?.user?.name }}
					</a>
				</template>
			</Column>

			<Column header="Applicant Email" style="max-width: 10%">
				<template #body="slotProps">
					<p>
						{{ slotProps?.data?.user?.email }}
					</p>
				</template>
			</Column>

			<Column
				field="application_date"
				header="Application Time"
				style="max-width: 10%"
			>
				<template #body="slotProps">
					<p>
						{{
							convertTime(
								slotProps?.data?.application_date
							)
						}}
					</p>
				</template>
			</Column>

			<Column
				field="application_status"
				header="Application Status"
				style="max-width: 10%"
			/>

			<Column
				:exportable="false"
				style="min-width: 15%"
				header="Action"
			>
				<template #body="slotProps">
					<Button
						icon="pi pi-check"
						class="p-button-rounded p-button-success mr-2"
						@click="acceptApplication(slotProps.data?._id)"
						:disabled="
							slotProps.data.application_status !==
							'Pending'
						"
					/>
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-danger text-white"
						@click="rejectApplication(slotProps.data?._id)"
						:disabled="
							slotProps.data.application_status !==
							'Pending'
						"
					/>
				</template>
			</Column>

			<template #empty>
				<EmptyContent />
			</template>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import { FilterMatchMode } from "primevue/api";
	import { Application } from "~~/constants/Types";
	import { convertTime } from "~~/src/utils";

	// define props
	const props = defineProps<{
		tableData: Application[] | null;
	}>();

	//  define events
	const emits = defineEmits<{
		(e: "acceptApplication", id: string): void;
		(e: "rejectApplication", id: string): void;
	}>();

	// define states
	const dt = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	// methods
	const exportCSV = () => {
		dt.value.exportCSV();
	};

	const rejectApplication = (id: string) => {
		emits("rejectApplication", id);
	};

	const acceptApplication = (id: string) => {
		emits("acceptApplication", id);
	};
</script>

<style scoped></style>
