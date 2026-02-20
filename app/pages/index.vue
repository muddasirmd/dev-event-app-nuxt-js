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
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EventsResponse {
  message: string
  events: IEvent[]
}

const config = useRuntimeConfig()

const {data} = await useFetch<EventsResponse>('/api/events')
const events = data.value?.events ?? []

console.log('Fetched events:', events)


</script>

<style scoped>

</style>