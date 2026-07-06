<script setup lang="ts"></script>

<template>
  <AppNavbar />
  <main class="main-content">
    <slot />
  </main>
  <AppFooter />
</template>

<style scoped>
.main-content {
  min-height: calc(100vh - 417px);
}
</style>
