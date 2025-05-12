import type { JsonResponse } from '~/types/api'
import type { Hobbie } from '~/types/hobby'

export const useHobbyStore = defineStore('hobbyStore', {
  state: () => ({
    // Hobbies data
    hobbies: [] as Hobbie[],
    loading: false,
    error: null as Error | null,

    // Dialog state for create/edit
    dialogOpen: false,
    dialogMode: 'create' as 'create' | 'edit',
    dialogFormName: '',
    editingId: null as number | null,

    // Delete confirmation state
    deleteConfirmOpen: false,
    deleteId: null as number | null,
  }),

  actions: {
    // Fetch all items
    async fetchItems() {
      this.loading = true
      this.error = null
      try {
        const res = await useApi<JsonResponse<Hobbie[]>>()('GET', 'hobbie')
        this.hobbies = res.data
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Basic CRUD
    async createItem(data: Partial<Hobbie>) {
      this.loading = true
      try {
        const res = await useApi<JsonResponse<Hobbie>>()('POST', 'hobbie', data)
        this.hobbies.push(res.data)
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async updateItem(id: number, data: Partial<Hobbie>) {
      this.loading = true
      try {
        const res = await useApi<JsonResponse<Hobbie>>()('PUT', `hobbie/${id}`, data)
        const idx = this.hobbies.findIndex(h => h.id === id)
        if (idx !== -1) this.hobbies[idx] = res.data
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async deleteItem(id: number) {
      this.loading = true
      try {
        await useApi<JsonResponse<null>>()('DELETE', `hobbie/${id}`)
        this.hobbies = this.hobbies.filter(h => h.id !== id)
      } catch (err: any) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Dialog handlers
    openCreateDialog() {
      this.dialogMode = 'create'
      this.dialogFormName = ''
      this.editingId = null
      this.dialogOpen = true
    },
    openEditDialog(hobby: Hobbie) {
      this.dialogMode = 'edit'
      this.editingId = hobby.id
      this.dialogFormName = hobby.name
      this.dialogOpen = true
    },
    closeDialog() {
      this.dialogOpen = false
    },
    async submitDialog() {
      if (!this.dialogFormName) return
      if (this.dialogMode === 'create') {
        await this.createItem({ name: this.dialogFormName })
      } else if (this.editingId != null) {
        await this.updateItem(this.editingId, { name: this.dialogFormName })
      }
      this.closeDialog()
    },

    // Delete confirmation handlers
    openDeleteDialog(id: number) {
      this.deleteId = id
      this.deleteConfirmOpen = true
    },
    closeDeleteDialog() {
      this.deleteConfirmOpen = false
    },
    async confirmDelete() {
      if (this.deleteId != null) {
        await this.deleteItem(this.deleteId)
      }
      this.closeDeleteDialog()
    }
  }
})
