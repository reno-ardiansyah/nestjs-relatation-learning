import type { JsonResponse } from '~/types/api'
import type { Person } from '~/types/people'

export const usePeopleStore = defineStore('peopleStore', {
  state: () => ({
    people: [] as Person[],
    loading: false,
    error: null as Error | null,

    // Dialog state for create/edit
    dialogOpen: false,
    dialogMode: 'create' as 'create' | 'edit',
    dialogForm: {
      name: '',
      dob: '' as string | undefined,
      idCardNumber: '' as string | undefined,
      hobbies: [] as number[],
    },
    editingId: null as number | null,

    // Delete confirmation
    deleteConfirmOpen: false,
    deleteId: null as number | null,
  }),

  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null
      try {
        const res = await useApi<Person[]>()('GET', 'people')
        this.people = res
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async createItem() {
      this.loading = true
      try {
        const payload = {
          name: this.dialogForm.name,
          dob: this.dialogForm.dob,
          idCardNumber: this.dialogForm.idCardNumber,
          hobbies: this.dialogForm.hobbies,
        }
        const res = await useApi<JsonResponse<Person>>()('POST', 'people', payload)
        this.people.push(res.data)
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async updateItem() {
      if (this.editingId == null) return
      this.loading = true
      try {
        const payload = {
          name: this.dialogForm.name,
          dob: this.dialogForm.dob,
          idCardNumber: this.dialogForm.idCardNumber,
          hobbies: this.dialogForm.hobbies,
        }
        const res = await useApi<JsonResponse<Person>>()('PUT', `people/${this.editingId}`, payload)
        const idx = this.people.findIndex(p => p.id === this.editingId)
        if (idx !== -1) this.people[idx] = res.data
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async deleteItem() {
      if (this.deleteId == null) return
      this.loading = true
      try {
        await useApi<JsonResponse<null>>()('DELETE', `people/${this.deleteId}`)
        this.people = this.people.filter(p => p.id !== this.deleteId)
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Dialog handlers
    openCreateDialog() {
      this.dialogMode = 'create'
      this.dialogForm = { name: '', dob: undefined, idCardNumber: undefined, hobbies: [] }
      this.editingId = null
      this.dialogOpen = true
    },

    openEditDialog(person: Person) {
      this.dialogMode = 'edit'
      this.editingId = person.id
      this.dialogForm = {
        name: person.name,
        dob: person.dob?.toString(),
        idCardNumber: person.idCardNumber?.number,
        hobbies: person.hobbies?.map((h: any) => h.hobbie_id) ?? [],
      }
      this.dialogOpen = true
    },

    closeDialog() {
      this.dialogOpen = false
    },

    async submitDialog() {
      if (!this.dialogForm.name) return
      if (this.dialogMode === 'create') {
        await this.createItem()
      } else {
        await this.updateItem()
      }
      this.closeDialog()
    },

    // Delete confirm handlers
    openDeleteDialog(id: number) {
      this.deleteId = id
      this.deleteConfirmOpen = true
    },
    closeDeleteDialog() {
      this.deleteConfirmOpen = false
    },
    async confirmDelete() {
      await this.deleteItem()
      this.closeDeleteDialog()
    },
  },
})
