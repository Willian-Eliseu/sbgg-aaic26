<script setup lang="ts">
import { ref } from 'vue';
import { useSiteStore } from '~/stores/website';

const { showAlert } = useAlert();
const siteStore = useSiteStore();
const isSubmitingLogin = ref<boolean>(false);
const email = ref<string>('');

const handleLogin = async () => {
  //handle the login 
}
</script>

<template>
  <div>
    <section class="login bg-body-tertiary">
      <div class="container py-3 py-lg-5">
        <!-- title and description -->
        <h1 class="text-center fw-bold text-purple">Login</h1>
        <p class="fs-5 text-center mb-3">
          Webinar Highlights do Congresso Alzheimer's Association <br> International Conference (AAIC​ 2026)
        </p>
        <!-- login formulary -->
        <form @submit.prevent="handleLogin" class="text-purple mb-3">
          <div class="row mb-3 justify-content-center">
            <div class="col-md-6">
              <p class="text-muted fw-bold py-3 small">
                Use seu email cadastrado para acessar
              </p>
              <label class="fw-bold" for="email">
                <span class="">*</span>
                Email
              </label>
              <input type="email" id="email" v-model="email" class="form-control rounded-3 fs-5 border-2 text-principal"
                required />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-3 mx-auto d-grid">
              <button class="btn btn-purple rounded-pill btn-lg bg-gradient" :disabled="isSubmitingLogin">
                {{ isSubmitingLogin ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
          </div>
        </form>
        <p class="text-center pt-3">
          Ainda não se cadastrou? Faça seu cadastro <NuxtLink to="/subscribe" class="fw-bold text-purple">AQUI
          </NuxtLink>
        </p>
        <p class="text-center">
          Precisa de ajuda? <NuxtLink to="/support" class="fw-bold text-purple">ENTRE EM CONTATO</NuxtLink>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login {
  background-image: url(~/assets/images/Group229.png);
  background-position: center;
  background-repeat: repeat-y;
  background-size: contain;
}
</style>
