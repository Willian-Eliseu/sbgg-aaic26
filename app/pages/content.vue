<script setup lang="ts">
import { useSiteStore } from '~/stores/website';
const { showAlert } = useAlert();
const siteStore = useSiteStore();
const isLive = ref<boolean>(false);

definePageMeta({
  middleware: 'auth'
});

const verifyLiveEvent = async (): Promise<void> => {
  try {
    const response: any = await $fetch('https://eventos.tbr.com.br/apis/livestatus/index.php', {
      method: 'POST',
      body: {
        id: siteStore.tbreadId
      }
    })
    const data = JSON.parse(response);
    isLive.value = data.live == 1 ? true : false;
  } catch (error: any) {
    showAlert({
      title: 'Ocorreu um erro',
      message: error.message || "Ocorreu um erro ao verificar o status do evento",
      type: 'error'
    })
  }
}

onMounted(() => {
  //verifyLiveEvent();
})
</script>

<template>
  <div>
    <section class="content">
      <div class="container py-3 py-lg-3">
        <h1 class="text-center fw-bold text-purple">SBGG</h1>
        <p class="fs-5 text-center mb-3 text-purple">
          Webinar Highlights do Congresso Alzheimer's Association <br> International Conference (AAIC​ 2026)
        </p>
        <p class="text-center">
          O Webinar vai ao ar no dia 04 de agosto de 2026 a partir das 19h30h
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content {
  background-image: url(~/assets/images/Group229.png);
  background-position: center;
  background-repeat: repeat-y;
  background-size: contain;
  min-height: 536px;
}
</style>
