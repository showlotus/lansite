<template>
  <div class="h-lvh p-4 flex flex-col justify-center items-center gap-4">
    <input
      type="text"
      v-model="url"
      class="p-4 w-full border border-solid rounded-md"
      @keydown.enter="handleEnter"
    />
    <div class="flex-1 w-full flex border border-solid rounded-md overflow-hidden">
      <div v-show="loading" class="flex-1 flex justify-center items-center">loading...</div>
      <iframe
        v-show="!loading"
        class="w-full h-full"
        :srcdoc="html"
        @load="handleIframeLoad"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
const url = ref('https://www.baidu.com/')
const html = ref('')
const loading = ref(false)

const fetchPage = (url: string) => {
  return $fetch('/api/url', {
    method: 'get',
    params: { url },
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

const handleEnter = async (e: KeyboardEvent) => {
  console.log('open', url.value)
  ;(e.target as HTMLInputElement)?.blur()
  loading.value = true
  console.time(`fetch page ${url.value}`)
  const data = await fetchPage(url.value)
  console.timeEnd(`fetch page ${url.value}`)
  html.value = data
  console.time(`render page ${url.value}`)
  // console.log(data)
}

const handleIframeLoad = () => {
  console.timeEnd(`render page ${url.value}`)
  loading.value = false
}

onMounted(() => {
  handleEnter(new KeyboardEvent('keydown'))
})
</script>

<style></style>
