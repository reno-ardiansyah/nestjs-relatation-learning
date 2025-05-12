<template>
  <UModal
    :open="modelValue"
    :title="title"
    :description="description"
    :ui="{ footer: 'justify-end' }"
  >
    <!-- Custom header with close button -->
    <template #header>
      <div class="flex w-full justify-between items-center">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <UButton
          icon="i-lucide-x"
          variant="ghost"
          size="sm"
          @click="onCancel"
        />
      </div>
    </template>

    

    <template #footer>
      <UButton
        label="Cancel"
        variant="outline"
        @click="onCancel"
      />
      <UButton
        label="Delete"
        color="destructive"
        :loading="loading"
        @click="onSave"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const UModal = resolveComponent('UModal')
const UButton = resolveComponent('UButton')

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Delete Hobby?',
  },
  description: {
    type: String,
    default: 'This action cannot be undone.',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function onSave() {
  emit('save')
}
</script>
