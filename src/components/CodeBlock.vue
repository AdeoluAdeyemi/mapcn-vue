<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { highlightCode } from '@/lib/highlight'

interface Props {
  code: string
  lang?: string
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'vue'
})

const highlightedCode = ref('')

onMounted(async () => {
  highlightedCode.value = await highlightCode(props.code, props.lang)
})
</script>

<template>
  <div class="relative">
    <pre class="bg-muted/20 p-4 rounded-lg overflow-x-auto"><div v-html="highlightedCode"></div></pre>
  </div>
</template>
