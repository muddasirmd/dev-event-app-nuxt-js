<template>
    <div class="flex flex-row gap-1.5 flex-wrap">
        <div v-for="tag in tags" :key="tag" class="pill">
            {{ tag }}
        </div>
    </div>

</template>

<script setup lang="ts">

interface Props{
    tags: string[]
}

const { tags } = defineProps<Props>()
</script>