<template>
    <div id="book-event">
        <p v-if="submitted">Thank you for booking your spot!</p>
        <form @submit.prevent="handleSubmit">
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

async function handleSubmit(){
try {
  const response = await fetch(`${BASE_URL}/api/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      eventId: eventId,
      slug: slug,
      email: email.value
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

} catch (error) {
  console.error('Error submitting form:', error);
}

    
}
</script>