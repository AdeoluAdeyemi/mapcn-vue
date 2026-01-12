<script setup lang="ts">
interface TocSection {
  id: string
  title: string
}

defineProps<{
  sections: TocSection[]
}>()
</script>

<template>
  <aside class="hidden xl:block w-44 shrink-0">
    <nav class="sticky top-28">
      <div class="flex flex-col gap-2.5 text-sm">
        <p class="text-muted-foreground text-xs font-medium mb-1">On This Page</p>
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :href="`#${section.id}`"
          :class="[
            'hover:text-foreground text-[0.8rem] no-underline transition-colors',
            index === 0 ? 'text-foreground' : 'text-muted-foreground'
          ]"
        >
          {{ section.title }}
        </a>
      </div>
    </nav>
  </aside>
</template>
