<template>
  <div>
    <NavBar />
    <NuxtPage />
  </div>
</template>

<script setup></script>

<style>
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease;
}
</style>