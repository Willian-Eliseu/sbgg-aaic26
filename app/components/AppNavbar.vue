<script setup lang="ts">
import { useSiteStore } from '../stores/website';
const siteStore = useSiteStore();

const logout = () => {
  siteStore.logout();
  navigateTo('/');
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div class="container">
        <NuxtLink class="navbar-brand" to="/">
          <img src="@/assets/images/sbgg_logo.png" alt="SBGG" height="50" />
          <img src="@/assets/images/aaic_logo.webp" alt="AAIC26" height="50" />
        </NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdownButton"
          aria-controls="navbarDropdownButton" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarDropdownButton">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item ms-lg-3">
              <NuxtLink class="nav-link fw-bold text-purple" to="/">EVENTO</NuxtLink>
            </li>
            <li class="nav-item ms-lg-3">
              <NuxtLink class="nav-link fw-bold text-purple" to="/subscribe">INSCRIÇÃO</NuxtLink>
            </li>
            <!-- <li class="nav-item ms-lg-3">
              <NuxtLink class="nav-link fw-bold text-purple" to="/certificate">CERTIFICADO</NuxtLink>
            </li> -->
            <li class="nav-item ms-lg-3">
              <NuxtLink class="nav-link fw-bold text-purple" to="/support">SUPORTE</NuxtLink>
            </li>
            <li class="nav-item ms-lg-3" v-if="siteStore.isAuthenticated">
              <NuxtLink class="nav-link fw-bold text-purple" to="/content">CONTEÚDO</NuxtLink>
            </li>
            <li class="nav-item ms-lg-3" v-if="!siteStore.isAuthenticated">
              <NuxtLink class="btn btn-purple rounded-4 fw-bold" to="/login">LOGIN</NuxtLink>
            </li>
            <li class="nav-item ms-lg-3" v-if="siteStore.isAuthenticated">
              <button class="btn btn-secondary rounded-4 fw-bold" @click="logout">SAIR</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
