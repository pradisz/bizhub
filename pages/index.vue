<script setup lang="ts">
useHead({
  title: 'BIZHUB',
})

const search = ref('')
const page = ref(1)
const totalPage = ref(1)
const lastPage = ref(false)
const loading = ref(false)
const businessData = ref<Business[]>([])
const listCategory = ref<string[]>([])
let timeoutId: any = null

onMounted(() => fetchData())

const fetchData = async () => {
  loading.value = true
  try {
    const res: GetBusinessParentResponse = await $fetch('/api/business', {
      method: 'POST',
      body: {
        ...(search.value !== ''
          ? {
              businessName: search.value,
            }
          : {
              size: 9,
              page: page.value,
            }),
        listCategory: listCategory.value,
      },
    })
    if (res) {
      loading.value = false
      businessData.value = res.data.content
      totalPage.value = res.data.totalPages
      lastPage.value = res.data.last
    }
  } catch (error) {
    console.log(error)
  }
}

const onSearchInputChange = (event: Event) => {
  clearTimeout(timeoutId)
  businessData.value = []
  page.value = 1
  search.value = (event.target as HTMLInputElement).value
  timeoutId = setTimeout(() => fetchData(), 300)
}

const onSearchInputKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    fetchData()
  }
}

const onSelectCategories = (catIds: string[]) => {
  businessData.value = []
  listCategory.value = catIds
  fetchData()
}

const onPageChange = (newPage: number) => {
  page.value = newPage
  fetchData()
}
</script>

<template>
  <div class="min-h-screen bg-[#F8F8F8] px-4 py-8 md:px-16">
    <h1 class="mb-16 text-center text-4xl font-extrabold tracking-wider">
      BIZHUB
    </h1>

    <div class="my-16 flex items-center justify-center gap-x-4">
      <input
        type="text"
        placeholder="Cari nama bisnis.."
        v-model="search"
        @input="onSearchInputChange"
        :onkeydown="onSearchInputKeyDown"
        class="input w-full max-w-md"
      />
      <CategoryFilterDialog @onSelectCategories="onSelectCategories" />
    </div>

    <div v-if="loading" class="mb-16 flex justify-center">
      <span
        class="loading loading-spinner loading-lg text-primary mx-auto"
      ></span>
    </div>

    <div
      v-if="businessData.length > 0"
      class="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="item in businessData">
        <BusinessListItem :business="item" />
      </div>
    </div>

    <div
      v-if="!loading && !businessData.length"
      class="mt-40 text-center font-semibold"
    >
      Data tidak ditemukan
    </div>

    <Pagination
      v-if="totalPage > 1 && !loading && businessData.length"
      :totalPages="totalPage"
      :currentPage="page"
      @onPageChange="onPageChange"
    />
  </div>
</template>
