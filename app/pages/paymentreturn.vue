<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSiteStore } from '~/stores/website';

const siteStore = useSiteStore();
const { showAlert } = useAlert();
const email = ref<string>('');
const evento = ref<number>(0);
const validado = ref<number>(0);

const updatePayment = async (): Promise<void> => {
  try {
    const response: any = await $fetch('https://eventos.tbr.com.br/apis/paymentreturn/', {
      method: 'POST',
      body: {
        email: email.value,
        evento: evento.value
      }
    });

    const data = JSON.parse(response);

    if (data.estado != 1) {
      throw new Error(data.message || 'O pagamento não pôde ser processado');
    }

    validado.value = 1;
  } catch (error) {
    await showAlert({
      title: 'Error',
      message: (error as Error).message,
      type: 'error'
    })
  }
}

onMounted(() => {
  email.value = siteStore.email;
  evento.value = siteStore.eventId;
  updatePayment();
})
</script>

<template>
  <div>
    <section class="payment bg-body-tertiary">
      <div class="container py-3 py-lg-5">
        <!-- title and description -->
        <h1 class="text-center fw-bold text-purple">Pagamento</h1>
        <p class="fs-5 text-center mb-3">
          Webinar Highlights do Congresso Alzheimer's Association <br> International Conference (AAIC​ 2026)
        </p>
        <p class="mt-5 fs-5 text-center text-principal" v-if="validado == 1">
          <b>Seu pagamento foi verificado com sucesso!</b>
          <br><br>
          O evento será transmitido ao vivo no dia 21 de agosto de 2025
        </p>
        <p class="mt-5 fs-5 text-center text-principal" v-else>
          <b>Seu pagamento não pôde ser verificado</b>
          <br>
          Por favor entre em contato com o suporte.
        </p>
        <div class="row py-3" v-if="validado == 1">
          <div class="col-auto mx-auto">
            <NuxtLink to="/content" class="btn btn-lg btn-principal text-light bg-gradient">Acesse o conteúdo</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.payment {
  background-image: url(~/assets/images/Group229.png);
  background-position: center;
  background-repeat: repeat-y;
  background-size: contain;
  min-height: 536px;
}
</style>
