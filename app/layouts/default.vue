<template>
  <div>
    <!-- Example: Navbar -->
    <Navbar />

    <div class="absolute inset-0 top-0 z-[-1] min-h-screen">
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
    </div>

    <!-- Page content -->
    <NuxtPage />

  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
/* Add layout-specific styles */
</style>
