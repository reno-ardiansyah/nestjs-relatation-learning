<template>
  <UModal
    v-model:open="store.dialogOpen"
    :title="store.dialogMode === 'create' ? 'Add Hobby' : 'Edit Hobby'"
  >
    <template #body>
    <UFormField label="Name" @submit="store.submitDialog()">
      <UInput v-model="store.dialogFormName" label="Name" class="w-full" :placeholder="store.dialogMode === 'create' ? 'Add Hobby' : 'Edit Hobby'" />
    </UFormField>
    </template>
    <template #footer>
      <UButton @click="store.closeDialog()" variant="outline">Cancel</UButton>
      <UButton @click="store.submitDialog()" :loading="store.loading">
        {{ store.dialogMode === "create" ? "Create" : "Save" }}
      </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const store = useHobbyStore();
</script>
