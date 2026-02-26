<template>
    <div id="book-event">
        <p v-if="submitted">Thank you for booking your spot!</p>
        <form @submit="handleSubmit">

        </form>
    </div>
</template>

<script setup lang="ts">

interface Props{
    eventId: string,
    slug: string
}

const {eventId, slug} = defineProps<Props>()

const email = ref("")
const submitted = ref(false)

const config = useRuntimeConfig()
const BASE_URL = config.public.baseUrl;

async function handleSubmit(e){

    e.preventDefault();

    // TODO : From Here
    await fetch(`${BASE_URL}/api/bookings`, {
        method: 'POST',
        body: JSON.stringify({ name: 'John' }),
        headers: { 'Content-Type': 'application/json' }
        })

    
}
</script>