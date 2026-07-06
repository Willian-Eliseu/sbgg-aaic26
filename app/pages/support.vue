<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useSiteStore } from '~/stores/website';

const siteStore = useSiteStore();
const isSubmittingSupport = ref<boolean>(false);

const { showAlert } = useAlert();

interface SupportFormData {
  tratamento: string;
  nome: string;
  email: string;
  mensagem: string;
  ip: string;
  evento: number;
  pagina: string;
}

const formData = reactive<SupportFormData>({
  tratamento: '',
  nome: '',
  email: '',
  mensagem: '',
  ip: '',
  evento: 0,
  pagina: '',
});

const handleSupport = async () => {
  isSubmittingSupport.value = true;

  try {
    const data: any = await $fetch('https://eventos.tbr.com.br/apis/support/', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!data || data.estado != 1) {
      throw new Error(data?.message ?? 'Erro ao enviar mensagem');
    }

    await showAlert({
      title: 'Sucesso',
      message: 'Mensagem enviada com sucesso!',
      type: 'success'
    });

    formData.tratamento = '';
    formData.nome = '';
    formData.email = '';
    formData.mensagem = '';
    formData.ip = '';

  } catch (error) {
    await showAlert({
      title: 'Erro',
      message: (error as Error).message ?? 'Erro ao enviar mensagem.',
      type: 'error'
    });
  } finally {
    isSubmittingSupport.value = false;
  }
}

const getIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    formData.ip = data.ip
  } catch (error) {
    console.error('Erro ao verificar o IP:', error)
  }
}

onMounted(() => {
  const boxLeft: HTMLElement | null = document.getElementById('box_left')
  const boxRight: HTMLElement | null = document.getElementById('box_right')
  const size: number | undefined = boxLeft?.offsetHeight

  if (size && boxRight) boxRight.style.height = `${size}px`

  formData.evento = siteStore.eventId;
  formData.pagina = 'SBGG - Hightlights AAIC 2026';

  getIP()
})
</script>

<template>
  <div>
    <section class="support bg-body-tertiary">
      <div class="container py-3 py-lg-5">
        <!-- title and description -->
        <h1 class="text-center fw-bold text-purple">Suporte</h1>
        <p class="fs-5 text-center mb-3">
          Webinar Highlights do Congresso Alzheimer's Association <br> International Conference (AAIC​ 2026)
        </p>

        <!-- support formulary -->
        <p class="text-muted fw-bold py-3">
          Preencha os campos e clique em enviar:
          <br />
          Campos marcados com <span class="text-muted">*</span> são obrigatórios.
        </p>
        <form @submit.prevent="handleSupport" class="text-purple">
          <div class="row mb-3">
            <div class="col-md-6 mb-3" id="box_left">
              <div class="row g-3">
                <div class="col-12">
                  <label class="fw-bold">
                    <span class="text-secundario">*</span>
                    Como gostaria de ser tratado(a)?
                  </label>
                  <select class="form-select text-principal border-2 rounded-3 fs-5" v-model="formData.tratamento"
                    required>
                    <option value="">Selecione</option>
                    <option value="Dr">Dr.</option>
                    <option value="Dra">Dra.</option>
                    <option value="Prof">Prof.</option>
                    <option value="Profa">Profa.</option>
                    <option value="Sr">Sr.</option>
                    <option value="Sra">Sra.</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="fw-bold">
                    <span class="text-secundario">*</span>
                    Nome completo
                  </label>
                  <input type="text" class="form-control border-2 rounded-3 fs-5" v-model="formData.nome" required />
                </div>
                <div class="col-12">
                  <label class="fw-bold">
                    <span class="text-secundario">*</span>
                    Email
                  </label>
                  <input type="email" class="form-control border-2 rounded-3 fs-5" v-model="formData.email" required />
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-3" id="box_right">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Mensagem
              </label>
              <textarea class="form-control border-2 rounded-3 fs-5" v-model="formData.mensagem"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-3 mx-auto d-grid">
              <button class="btn btn-purple rounded-pill btn-lg bg-gradient" :disabled="isSubmittingSupport">
                {{ isSubmittingSupport ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
#box_right textarea {
  min-height: 90%;
}

.support {
  background-image: url(~/assets/images/Group229.png);
  background-position: center;
  background-repeat: repeat-y;
  background-size: contain;
}
</style>
