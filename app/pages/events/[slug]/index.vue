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
                </section>

             </div>
        </div>
    </section>
</template>


<script setup lang="ts">
const Child = {
    props: ['title'],
    template: `<div> {{ title }} </div>`
}
</script>