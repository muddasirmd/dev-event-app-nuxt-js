<template>
    <section id="event">
        <div class="header">
            <h1>Event Description</h1>
            <p>{{ description }}</p>
        </div>

        <div class="details">
            <!-- Left Side - Event Content  -->
             <div class="content">
                <NuxtImg :src="image" alt="Event Banner" width="800" height="800" class="banner" />

                <section class="flex-col-gap-2">
                    <h2>Overview</h2>
                    <p>{{ overview }}</p>
                </section>

                <section class="flex-col-gap-2">
                    <h2>Event Details</h2>

                     <EventDetailItem :icon="'/icons/calendar.svg'" :alt="'calendar'" :label="date" />
                     <EventDetailItem :icon="'/icons/clock.svg'" :alt="'clock'" :label="time" />
                     <EventDetailItem :icon="'/icons/pin.svg'" :alt="'pin'" :label="location" />
                     <EventDetailItem :icon="'/icons/mode.svg'" :alt="'mode'" :label="mode" />
                     <EventDetailItem :icon="'/icons/audience.svg'" :alt="'audience'" :label="audience" />
                </section>

                <EventAgenda :agenda-items="agenda" />

                <section class="flex-col-gap-2">
                    <h2>About the Organizer</h2>
                    <p>{{ organizer }}</p>
                </section>

                <EventTags :tags="tags" />

             </div>

             <!-- Right Side - Booking Form -->
              <aside class="booking">
                <div class="signup-card">
                    <h2>Book Your Spot</h2>
                    <p v-if="bookings > 0" class="text-sm">Join {{ bookings }} people who have already booked their sopt!</p>
                    <p v-else class="text-sm">Be the first to book your spot!</p>
                    
                </div>

              </aside>
        </div>
    </section>
</template>


<script setup lang="ts">

const route = useRoute()
const { slug } = route.params

const config = useRuntimeConfig()
const BASE_URL = config.public.baseUrl;

let event;

try{
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);

    if(!request.ok){
        if(request.status === 404){
            notFound()
        }
        throw new Error(`Failed to fetch event: ${request.statusText}`)
    }

    const response = await request.json()
    event = response.event;

    if(!event){
        notFound()
    }
}
catch (error){
    console.log("Error fetching event:", error)
}


const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event;

const bookings = 10;

const similarEvents = await fetch(`${BASE_URL}/api/events/similar?slug=${slug}`)


function notFound(){

    const error = useError()

    error.value = createError({
        statusCode: 404,
        statusMessage: 'Ooops Page Not Found'
    })
}

</script>