<template>
    <div class="flex-row-gap-2 items-center"> 
        <Image :src="icon" :alt="alt" width="17" height="17" />
        <p>{{ label }}</p>
    </div>

</template>

<script setup lang="ts">


interface Props {
    icon: string,
    alt: string,
    label: string
}

const { icon, alt, label  } = defineProps<Props>()

</script>