<template>
    <div id="book-event">
        <p v-if="submitted">Thank you for booking your spot!</p>
        <form @submit="handleSubmit">
            <div>
                <label for="email">Email Address</label>
                <input type="email" id="email" v-model="email" placeholder="Enter your email address"/>
            </div>
            <button type="submit" class="button-submit">Submit</button>
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

    const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        eventId,
        slug,
        email
    })
    })

    const data = await response.json()

    
}
</script>