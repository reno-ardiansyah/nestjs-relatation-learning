<script setup lang="ts">
const hobbyStore = useHobbyStore();

onMounted(() => hobbyStore.fetchItems());
</script>

<template>
  <UiTablecard
    title="Manage Hobbies"
    titleButton="Add Hobby"
    @add="hobbyStore.openCreateDialog()"
  >
    <TablesHobby />
    <DialogHobby />
    <DialogDelete
      v-model="hobbyStore.deleteConfirmOpen"
      title="Delete Hobby?"
      description="Are you sure you want to delete this hobby? This action cannot be undone."
      @save="hobbyStore.confirmDelete()"
      @cancel="hobbyStore.closeDeleteDialog()"
      :loading="hobbyStore.loading"
    />
  </UiTablecard>
</template>
