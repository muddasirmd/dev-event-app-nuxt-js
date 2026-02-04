<template>
    <NuxtLink :to="`events/${slug}`" id="event-card">
        <NuxtImg :src="image" :alt="title" width="410" height="300" class="poster" />

        <div class="flex flex-row gap-2">
            <NuxtImg src="/icons/pin.svg" alt="location" width="14" height="14"/>
            <p>{{ location }}</p>
        </div>

        <p class="title">{{ title }}</p>

        <div class="datetime">
            <div>
                <NuxtImg src="/icons/calender.svg" alt="date" width="14" height="14" />
                <p>{{ date }}</p>
            </div>
            <div>
                <NuxtImg src="/icons/clock.svg" alt="time" width="14" height="14"` />
                <p>{{ time }}</p>
            </div>
        </div>

    </NuxtLink>
</template>

<script setup lang="ts">

interface Props {
    title: string,
    image: string,
    slug: string,
    location: string,
    date: string,
    time: string
}

const { title, image, slug, location, date, time  } = defineProps<Props>()

</script>