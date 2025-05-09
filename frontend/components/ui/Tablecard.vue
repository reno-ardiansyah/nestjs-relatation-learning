<template>
  <UCard variant="soft">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ title }}</span>
        <UButton
          icon="i-lucide-plus"
          color="primary"
          variant="soft"
          class="p-3"
          @click="$emit('add')"
        >
          {{ titleButton }}
        </UButton>
      </div>
    </template>

    <slot />

    <template #footer>
      <Placeholder class="h-8" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Manage Hobbies",
  },
  titleButton: {
    type: String,
    default: "Add Hobby",
  },
})

defineEmits(['add'])
</script>
