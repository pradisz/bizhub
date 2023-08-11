<script setup lang="ts">
const emit = defineEmits(['onSelectCategories'])

const categoryData = ref<BusinessCategory[]>([])
const loading = ref(false)

const selectedCategories = computed(() => {
  return categoryData.value
    .filter((cat) => cat.selected)
    .map((cat) => cat.paramCode)
})

onMounted(() => fetchData())

const fetchData = async () => {
  try {
    const res: GetBusinessCategoryResponse = await $fetch('/api/categories')
    if (res) {
      loading.value = false
      categoryData.value = res.data.map((cat) => ({ ...cat, selected: false }))
    }
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = () => {
  emit('onSelectCategories', selectedCategories.value)
}

const onReset = () => {
  categoryData.value = categoryData.value.map((cat) => ({
    ...cat,
    selected: false,
  }))
  emit('onSelectCategories', [])
}
</script>

<template>
  <div class="indicator">
    <span
      v-if="selectedCategories.length > 0"
      class="indicator-item badge badge-secondary"
      >{{ selectedCategories.length }}
    </span>
    <button class="btn btn-primary" onclick="categoryFilterModal.showModal()">
      FILTER
    </button>
  </div>
  <dialog id="categoryFilterModal" class="modal">
    <form method="dialog" class="modal-box max-w-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">FILTER KATEGORI</h3>
        <button class="btn btn-sm btn-circle btn-ghost">✕</button>
      </div>

      <div class="my-8">
        <div v-for="category in categoryData">
          <div class="form-control">
            <label class="label cursor-pointer hover:font-bold">
              <span class="label-text">{{ category.paramName }}</span>
              <input
                type="checkbox"
                v-model="category.selected"
                class="checkbox hover:border-gray-500"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="modal-action item-center flex gap-x-1">
        <button @click="onSubmit" class="btn btn-primary">TERAPKAN</button>
        <button @click="onReset" class="btn">RESET</button>
      </div>
    </form>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
