import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

export function useMobile() {
  const { width } = useWindowSize()
  return computed(() => width.value < 768)
}
