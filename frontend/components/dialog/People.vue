<template>
  <UModal
    v-model:open="store.dialogOpen"
    :title="store.dialogMode === 'create' ? 'Add Person' : 'Edit Person'"
    :description="
      store.dialogMode === 'create'
        ? 'Fill the form to add a new person.'
        : 'Update the person details.'
    "
    :ui="{ footer: 'justify-end' }"
  >
    <!-- <form @submit.prevent="store.submitDialog()"> -->
    <template #body>
      <div class="space-y-4">
        <UFormField label="Name">
          <UInput
            v-model="store.dialogForm.name"
            placeholder="Enter full name"
            :disabled="store.loading"
          />
        </UFormField>

        <UFormField label="Date of Birth">
          <UInput
            v-model="store.dialogForm.dob"
            type="date"
            :disabled="store.loading"
          />
        </UFormField>

        <UFormField label="ID Card Number">
          <UInput
            v-model="store.dialogForm.idCardNumber"
            placeholder="Enter ID card number"
            :disabled="store.loading"
          />
        </UFormField>

        <UFormField label="Hobbies">
          <USelect
            v-model="store.dialogForm.hobbies"
            :items="hobbyStore.hobbies"
            value-key="id"
            multiple 
            placeholder="Select hobbies"
            :disabled="store.loading"
          />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <UButton
        @click="store.closeDialog()"
        variant="outline"
        :disabled="store.loading"
      >
        Cancel
      </UButton>
      <UButton
        @click="store.submitDialog()"
        color="primary"
        :loading="store.loading"
      >
        {{ store.dialogMode === "create" ? "Create" : "Save" }}
      </UButton>
    </template>
    <!-- </form> -->
  </UModal>
</template>

<script setup lang="ts">
const store = usePeopleStore()
const hobbyStore = useHobbyStore()

// Prepare options for select from hobbyStore.hobbies
const hobbyOptions = computed(() =>

  hobbyStore.hobbies.map(h => ({ label: h.name, value: h.id }))
)
  console.log(hobbyStore.hobbies);
</script>
