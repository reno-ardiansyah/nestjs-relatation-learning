<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">Nama Section</span>
        <UButton icon="i-lucide-plus" color="primary" variant="soft" size="sm" />
      </div>
    </template>

    <Placeholder class="h-32" />

    <template #footer>
      <Placeholder class="h-8" />
    </template>
  </UCard>
</template>

<script setup lang="ts"></script>
