<template>
  <div class="flex flex-col flex-1 w-full">
    <!-- Filter -->
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput
        v-model="globalFilter"
        class="max-w-sm"
        placeholder="Filter people..."
      />
    </div>

    <!-- Table -->
    <UTable
      v-if="filteredPeople.length"
      ref="table"
      v-model:sorting="sorting"
      v-model:pagination="pagination"
      v-model:rowSelection="rowSelection"
      :data="filteredPeople"
      :columns="columns"
      :pagination-options="paginationOptions"
      :loading="store.loading"
      loading-color="primary"
      loading-animation="carousel"
    />

    <!-- Footer -->
    <div
      v-if="filteredPeople.length"
      class="px-4 flex justify-between py-3.5 border-t border-accented text-sm text-muted"
    >
      <div>
        {{
          table?.tableApi
            .getPaginationRowModel()
            .rows.filter((r) => r.getIsSelected()).length || 0
        }}
        of
        {{ table?.tableApi.getPaginationRowModel().rows.length || 0 }} row(s)
        selected.
      </div>
      <UPagination
        v-show="table?.tableApi.getPageCount() > 1"
        :default-page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="filteredPeople.length"
        @update:page="(p) => (pagination.pageIndex = p - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, resolveComponent, onMounted } from 'vue'
import type { Column, SortingState } from '@tanstack/vue-table'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { Person } from '~/types/person'

// Components
const UInput = resolveComponent('UInput')
const UPagination = resolveComponent('UPagination')

// Table refs & state
const table = useTemplateRef('table')
const globalFilter = ref('')
const rowSelection = ref({})
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const sorting = ref<SortingState>([])
const paginationOptions = { getPaginationRowModel: getPaginationRowModel() }

// Store & data
const store = usePeopleStore()
onMounted(() => { store.fetchItems() })
const people = computed(() => store.people)

// Filtered data
const filteredPeople = computed(() => {
  if (!globalFilter.value) return people.value
  return people.value.filter(p =>
    p.name.toLowerCase().includes(globalFilter.value.toLowerCase())
  )
})

// Columns definition
const columns: TableColumn<Person>[] = [
  { accessorKey: 'id', header: 'ID', enableSorting: true },
  { accessorKey: 'name', header: 'Name', enableSorting: true },
  {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ row }) => new Date(row.getValue('dob')).toLocaleDateString(),
    enableSorting: true,
  },
  {
    accessorKey: 'IdCard.number',
    header: 'ID Card',
    enableSorting: false,
  },
  {
    id: 'hobbies',
    header: 'Hobbies',
    cell: ({ row }) => row.original.hobbies.map(h => h.hobbie.name).join(', '),
    enableSorting: false,
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => h(
      'div', { class: 'flex space-x-2' }, [
        h(resolveComponent('UButton'), {
          icon: 'i-lucide-edit', variant: 'soft', color: 'primary', label: 'Edit',
          onClick: () => store.openEditDialog(row.original)
        }),
        h(resolveComponent('UButton'), {
          icon: 'i-lucide-trash-2', variant: 'soft', color: 'destructive', label: 'Delete',
          onClick: () => store.openDeleteDialog(row.original.id)
        })
      ])
    
  }
]
</script>
