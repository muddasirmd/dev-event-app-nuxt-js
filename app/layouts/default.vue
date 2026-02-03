<template>
  <div>

    <Navbar />

    <div class="absolute inset-0 top-0 z-[-1] min-h-screen">
      <ClientOnly>
        <LightRays
          rays-origin="top-center"
          rays-color="#00ffff"
          :rays-speed="1.5"
          :light-spread="0.8"
          :ray-length="1.2"
          :follow-mouse="true"
          :mouse-influence="0.1"
          :noise-amount="0.1"
          :distortion="0.05"
          class-name="custom-rays"
        />
      </ClientOnly>
    </div>

    <!-- Page content -->
    <main>
      <NuxtPage />
    </main> 
    

  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
/* Add layout-specific styles */
</style>
