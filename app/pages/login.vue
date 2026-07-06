<script setup lang="ts">
import { ref } from 'vue';
import { useSiteStore } from '~/stores/website';

const { showAlert } = useAlert();
const siteStore = useSiteStore();
const isSubmitingLogin = ref<boolean>(false);
const email = ref<string>('');

const handleLogin = async () => {
  isSubmitingLogin.value = true;
  try {
    const response: any = await $fetch(`https://eventos.tbr.com.br/apis/login/?evento=${siteStore.eventId}&email=${email.value}`);
    const data = JSON.parse(response);
    if (!data || data.estado != 1) {
      throw new Error('Não foi possível realizar o login, verifique seu email!');
    }

    let dados = data.dados;

    siteStore.login({
      isEnabled: dados.enable == 1 ? true : false,
      firstname: dados.firstname,
      lastname: dados.lastname,
      email: dados.email,
      category: dados.subscribe_training_center,
      userId: dados.id,
      userHash: dados.control_hash,
      userCity: dados.city,
      userState: dados.state,
      userIp: dados.ip
    })

    await showAlert({
      title: 'Sucesso',
      message: 'Login realizado com sucesso!',
      type: 'success'
    })

    email.value = '';

    await navigateTo({
      path: '/content'
    })
  } catch (error) {
    await showAlert({
      title: 'Error',
      message: (error as Error).message,
      type: 'error'
    })
  } finally {
    isSubmitingLogin.value = false;
  }
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
              <button type="submit" class="btn btn-purple rounded-pill btn-lg bg-gradient" :disabled="isSubmitingLogin">
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
