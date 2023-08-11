<script setup lang="ts">
const { business } = defineProps<{
  business: Business
}>()
</script>

<template>
  <div class="h-full rounded-xl bg-white px-4 py-8">
    <img :src="business.logoUrl" :alt="business.businessName" />
    <p class="mt-6 text-center text-lg font-bold">
      {{ business.businessName }}
    </p>
    <p class="mt-4 text-center text-sm text-gray-500">
      {{ business.businessCategoryName }}
    </p>
  </div>
</template>
