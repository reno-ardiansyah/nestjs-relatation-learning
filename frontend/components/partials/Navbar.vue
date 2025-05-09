<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = [
  {
    label: "Home",
    icon: "i-lucide-home",
    to: "/",
  },
  {
    label: "Hobbies",
    icon: "i-lucide-gamepad-2",
    to: "/hobbies",
  },
  {
    label: "People",
    icon: "i-lucide-users",
    to: "/people",
  },
  {
    label: "Phone Number",
    icon: "i-lucide-phone",
    to: "/phonenumber",
  },
] satisfies NavigationMenuItem[];
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center mb-5">
  </UNavigationMenu>
</template>
