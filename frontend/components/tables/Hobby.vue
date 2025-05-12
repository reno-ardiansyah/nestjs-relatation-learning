<script setup lang="ts">
import { h, resolveComponent, computed, onMounted } from "vue";
import { ref } from "vue";
import type { Column, SortingState } from "@tanstack/vue-table";
import { getPaginationRowModel } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";
import type { Hobbie } from '~/types/hobby'

// Components
const UCheckbox = resolveComponent("UCheckbox");
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

// Refs & State
const table = useTemplateRef("table");
const globalFilter = ref("");
const rowSelection = ref({});
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});
const sorting = ref<SortingState>([
  {
    id: "",
    desc: true,
  },
]);

// Store
const hobbyStore = useHobbyStore();
const hobbies = computed(() => hobbyStore.hobbies);

// Global filtering from raw data
const filteredHobbies = computed(() => {
  if (!globalFilter.value) return hobbies.value;
  console.log(globalFilter.value);

  return hobbies.value.filter((h) =>
    h.name.toLowerCase().includes(globalFilter.value.toLowerCase())
  );
});

// Pagination Options
const paginationOptions = {
  getPaginationRowModel: getPaginationRowModel(),
};

// Table columns
const columns: TableColumn<Hobbie>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => getHeader(column, "Hobby Name"),
    enableSorting: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => getHeader(column, "Created At"),
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        hour12: true,
      }),
    enableSorting: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => getHeader(column, "Updated At"),
    cell: ({ row }) =>
      new Date(row.getValue("updated_at")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        hour12: true,
      }),
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      // two buttons in a flex container
      return h("div", { class: "flex space-x-2" }, [
        h(UButton, {
          icon: "i-lucide-edit",
          color: "primary",
          variant: "soft",
          label: "Edit",
          onClick: () => {
            hobbyStore.openEditDialog(row.original);
          },
        }),
        h(UButton, {
          icon: "i-lucide-trash-2",
          color: "error",
          variant: "soft",
          label: "Delete",
          onClick: () => {
            hobbyStore.openDeleteDialog(row.original.id);
          },
        }),
      ]);
    },
  },
];

// Sorting header dropdown
function getHeader(column: Column<Hobbie>, label: string) {
  const isSorted = column.getIsSorted();

  return h(
    UDropdownMenu,
    {
      content: { align: "start" },
      "aria-label": "Sorting menu",
      items: [
        {
          label: "Asc",
          type: "checkbox",
          icon: "i-lucide-arrow-up-narrow-wide",
          checked: isSorted === "asc",
          onSelect: () => {
            if (isSorted === "asc") column.clearSorting();
            else column.toggleSorting(false);
          },
        },
        {
          label: "Desc",
          type: "checkbox",
          icon: "i-lucide-arrow-down-wide-narrow",
          checked: isSorted === "desc",
          onSelect: () => {
            if (isSorted === "desc") column.clearSorting();
            else column.toggleSorting(true);
          },
        },
      ],
    },
    () =>
      h(UButton, {
        color: "neutral",
        variant: "ghost",
        label,
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5 data-[state=open]:bg-elevated",
        "aria-label": `Sort by ${label}`,
      })
  );
}
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <!-- Filter -->
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />
    </div>

    <!-- Table -->
    <UTable
      v-if="filteredHobbies.length"
      ref="table"
      v-model:sorting="sorting"
      v-model:pagination="pagination"
      v-model:rowSelection="rowSelection"
      :data="filteredHobbies"
      :columns="columns"
      :pagination-options="paginationOptions"
      :loading="hobbyStore.loading"
      loading-color="primary"
      loading-animation="carousel"
    />

    <!-- Footer -->
    <div
      v-if="filteredHobbies.length"
      class="px-4 flex justify-between py-3.5 border-t border-accented text-sm text-muted"
    >
      <div>
        {{
          table?.tableApi
            ?.getPaginationRowModel()
            .rows.filter((row) => row.getIsSelected()).length || 0
        }}
        of
        {{ table?.tableApi?.getPaginationRowModel().rows.length || 0 }} row(s)
        selected.
      </div>

      <div>
        <UPagination
          v-show="(table?.tableApi?.getPageCount() || 0) > 1"
          :default-page="
            (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
          "
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>
  </div>
</template>
