<template>
  <section>
    <h1 class="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
    <p class="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

    <ExploreBtn />

    <div class="mt-20 space-y-7">
      <h3>Featured Events</h3>

      <ul class="events">
        
      </ul>
    </div>
  </section>
</template>

<script setup>

const config = useRuntimeConfig()

const BASE_URL = config.public.baseUrl;

const response = await useFetch('/api/events')


</script>

<style scoped>

</style>