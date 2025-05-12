<template>
  <UiTablecard
    title="Manage Hobbies"
    titleButton="Add Hobby"
    @add="usePeopleStore().openCreateDialog()"
  >
    <TablesPeople />
    <DialogPeople />
    <DialogDelete
      v-model="usePeopleStore().deleteConfirmOpen"
      title="Delete Hobby?"
      description="Are you sure you want to delete this hobby? This action cannot be undone."
      @save="usePeopleStore().confirmDelete()"
      @cancel="usePeopleStore().closeDeleteDialog()"
      :loading="usePeopleStore().loading"
    />
  </UiTablecard>
</template>

<script setup lang="ts">
onMounted(() => {
  useHobbyStore().fetchItems();
  usePeopleStore().fetchItems();
});
</script>
