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
                </section>

             </div>
        </div>
    </section>
</template>


<script setup lang="ts">

const image = ""
const overview = "Overflow asd"
const description = "Description asd"
const date = "2025-01-03"

const route = useRoute()
const { slug } = route.params

const config = useRuntimeConfig()
const BASE_URL = config.public.baseUrl;

let event;

try{
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);

    console.log(request)

    if(!request.ok){

        if(request.status === 404){
            throw createError({
                status: 404,
                statusText: 'Ooops Page Not Found',
                fatal: true
            })
        }
        throw new Error(`Failed to fetch event: ${request.statusText}`)
    }
}
catch (error){
    console.log("Error fetching event:", error)
}


</script>