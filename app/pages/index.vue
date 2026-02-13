<template>
  <section>
    <h1 class="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
    <p class="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

    <ExploreBtn />

    <div class="mt-20 space-y-7">
      <h3>Featured Events</h3>

      <ul class="events">
        <template v-if="events && events.length">
          <li v-for="event in events" :key="event._id" class="list-none">
            <EventCard v-bind="event" />
          </li>
        </template>
        
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">

interface IEvent {
  _id: string
  title: string
}

const config = useRuntimeConfig()

const BASE_URL = config.public.baseUrl;

const response = await useFetch<IEvent[]>('/api/events')
const {events} = response.data.value

console.log('Fetched events:', events)


</script>

<style scoped>

</style>