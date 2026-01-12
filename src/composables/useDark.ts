// Composable for detecting dark mode
import { useDark as useVueDark, useToggle } from '@vueuse/core'

export function useDark() {
  return useVueDark()
}

export function useToggleDark() {
  const isDark = useDark()
  return useToggle(isDark)
}
