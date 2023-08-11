<script setup lang="ts">
const { currentPage, totalPages } = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits(['onPageChange'])

const onSelectPage = (selectedPage: number) => {
  emit('onPageChange', selectedPage)
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="my-16 flex justify-center">
    <div class="join">
      <button
        v-for="page in totalPages"
        @click="() => onSelectPage(page)"
        class="join-item btn"
        :class="{ 'btn-active': page === currentPage }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
