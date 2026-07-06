<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useSiteStore } from '~/stores/website';

const { showAlert } = useAlert();

const siteStore = useSiteStore();
const isSubmittingSubscribe = ref<boolean>(false);
const emailCheckedClass = ref<string>('');

type Categories = 'associado' | 'nao_associado';

interface DataCategory {
  id: number;
  name: string;
}

const Categories: Record<Categories, DataCategory> = {
  associado: {
    id: 1184,
    name: 'Associado(a) quite'
  },
  nao_associado: {
    id: 1185,
    name: 'Não associado(a) ou não quite'
  }
}

interface SubscribeFormData {
  dataCategory: DataCategory | null;
  dataTreatment: string;
  dataCellphone: string;
  dataCpf: string;
  dataName: string;
  dataCouncilNumber: string;
  dataCouncilState: string;
  dataEmail: string;
  dataEmailConfirm: string;
  dataOccupation: string;
  dataInstitution: string;
  dataEvento: number;
  dataIp: string;
  dataPagina: string;
  dataContatoTbr: boolean;
  dataEnable: number;
}

const formData = reactive<SubscribeFormData>({
  dataCategory: Categories.nao_associado,
  dataTreatment: '',
  dataCellphone: '',
  dataCpf: '',
  dataName: '',
  dataCouncilNumber: '',
  dataCouncilState: '',
  dataEmail: '',
  dataEmailConfirm: '',
  dataOccupation: '',
  dataInstitution: '',
  dataEvento: 0,
  dataIp: '',
  dataPagina: '',
  dataContatoTbr: false,
  dataEnable: 0,
});

const CPFFormatter = (event: Event): void => {
  let value = formData.dataCpf.replace(/\D/g, '');
  value = (value.length > 11) ? value.slice(0, 11) : value;
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
  formData.dataCpf = value;
}

const checkEmail = (): void => {
  if (formData.dataEmail !== formData.dataEmailConfirm) {
    emailCheckedClass.value = 'border-danger border-3';
  } else {
    emailCheckedClass.value = '';
  }
}

const handleSubscribe = async (): Promise<void> => {
  isSubmittingSubscribe.value = true;
  try {
    const response: any = await $fetch('https://eventos.tbr.com.br/apis/subscribe/', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response) {
      throw new Error('Erro ao se inscrever.');
    }

    const data = JSON.parse(response);

    if (data.code != 1) {
      throw new Error(data.message || 'Erro ao se inscrever.');
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
      message: 'Inscrição realizada com sucesso!',
      type: 'success'
    });

    formData.dataTreatment = '';
    formData.dataCellphone = '';
    formData.dataCpf = '';
    formData.dataName = '';
    formData.dataCouncilNumber = '';
    formData.dataCouncilState = '';
    formData.dataEmail = '';
    formData.dataOccupation = '';
    formData.dataInstitution = '';
    formData.dataIp = '';
    formData.dataPagina = '';
    formData.dataEnable = 0;

    await navigateTo({
      path: '/payment'
    });
  } catch (error) {
    await showAlert({
      title: 'Error',
      message: (error as Error).message,
      type: 'error'
    });
  } finally {
    isSubmittingSubscribe.value = false;
  }
}

const associationCheck = async (): Promise<void> => {
  try {
    const data: any = await $fetch(`https://eventos.tbr.com.br/apis/sbgg/associacao.php?cpf=${formData.dataCpf}`);

    if (!data) {
      throw new Error('Erro ao verificar a associação.');
    }

    if (data.code == 1) {
      formData.dataCategory = Categories.associado;
    } else {
      formData.dataCategory = Categories.nao_associado;
    }

    formData.dataPagina = 'SBGG - Highlights AAIC 2026';
    handleSubscribe();
  } catch (error) {
    await showAlert({
      title: 'Error',
      message: (error as Error).message,
      type: 'error'
    });
  }
}

const getIP = async (): Promise<void> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    formData.dataIp = data.ip;
  } catch (error) {
    console.error('Erro ao verificar o IP:', error);
  }
}

onMounted(() => {
  getIP();
})
</script>

<template>
  <div>
    <section class="subscribe bg-body-tertiary">
      <div class="container py-3 py-lg-5">
        <!-- title and description -->
        <h1 class="text-center fw-bold text-purple">Inscrição</h1>
        <p class="fs-5 text-center mb-3">
          Webinar Highlights do Congresso Alzheimer's Association <br> International Conference (AAIC​ 2026)
        </p>

        <p class="fs-5 fw-semibold fst-italic text-center mb-0">
          * Associados adimplentes da SBGG - Valor da inscrição R$ 49,90
        </p>
        <p class="fs-5 fw-semibold fst-italic text-center">
          * Não Associados ou Não quites - Valor da inscrição R$ 179,90
        </p>

        <!-- support formulary -->
        <p class="text-muted fw-bold py-3">
          Preencha os campos e clique em enviar:
          <br />
          Campos marcados com <span class="text-muted">*</span> são obrigatórios.
        </p>
        <form @submit.prevent="associationCheck" class="text-purple">
          <div class="row g-3 mb-3">
            <div class="col-md-6 col-lg-3">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Categoria
              </label>
              <select class="form-select text-principal boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataCategory" required>
                <option value="">Selecione</option>
                <option :value="Categories.associado">ASSOCIADO(A) QUITE</option>
                <option :value="Categories.nao_associado">NÃO ASSOCIADO(A) OU NÃO QUITE</option>
              </select>
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Como gostaria de ser tratado(a)?
              </label>
              <select class="form-select text-principal boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataTreatment" required>
                <option value="">Selecione</option>
                <option value="Dr">Dr.</option>
                <option value="Dra">Dra.</option>
                <option value="Prof">Prof.</option>
                <option value="Profa">Profa.</option>
                <option value="Sr">Sr.</option>
                <option value="Sra">Sra.</option>
              </select>
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Celular
              </label>
              <input type="tel" class="form-control boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataCellphone" placeholder="(99) 99999-9999" required />
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                CPF
              </label>
              <input type="text" class="form-control boder-secondary border-2 rounded-3 fs-5" @keyup="CPFFormatter"
                v-model="formData.dataCpf" placeholder="999.999.999-99" required />
            </div>
            <div class="col-md-6">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Nome completo
              </label>
              <input type="text" class="form-control boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataName" required />
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Número do conselho
              </label>
              <input type="text" class="form-control boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataCouncilNumber" required />
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                UF do conselho
              </label>
              <input type="text" class="form-control boder-secondary border-2 rounded-3 fs-5" maxlength="2"
                v-model="formData.dataCouncilState" required />
            </div>
            <div class="col-md-6">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Email
              </label>
              <input type="email" class="form-control boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataEmail" required />
            </div>
            <div class="col-md-6">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Confirme seu email
              </label>
              <input type="email" class="form-control boder-secondary border-2 rounded-3 fs-5"
                :class="emailCheckedClass" v-model="formData.dataEmailConfirm" @input="checkEmail" id="confirm_email"
                required />
            </div>
            <div class="col-md-6">
              <label class="fw-bold">
                <span class="text-secundario">*</span>
                Profissão
              </label>
              <input type="text" class="form-control boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataOccupation" required />
            </div>
            <div class="col-md-6">
              <label class="fw-bold">
                <span class="text-secundario"></span>
                Local de trabalho
              </label>
              <input type="text" class="form-control boder-secondary border-2 rounded-3 fs-5"
                v-model="formData.dataInstitution" />
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-12">
              <input type="checkbox" v-model="formData.dataContatoTbr" id="contact_organization"
                class="form-check-input fs-4 boder-secondary border-2" />
              <label class="align-bottom ps-2 fs-5 text-dark" for="contact_organization">
                Aceito receber informações de eventos conforme apresentado na
                <a href="https://privacidade.tbr.com.br/" target="_blank" class="text-purple">política de
                  privacidade</a>
                da TBR;
              </label>
            </div>
            <div class="col-12">
              <input type="checkbox" id="accept_terms" class="form-check-input fs-4 boder-secondary border-2"
                required />
              <label class="align-bottom ps-2 fs-5 text-dark" for="accept_terms">Declaro, para os devidos fins, a
                veracidade das
                informações preenchidas.</label>
            </div>
            <div class="col-12">
              <p class="text-dark">Um email de confirmação será enviado após a realização da sua inscrição.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-3 mx-auto d-grid">
              <button type="submit" class="btn btn-purple rounded-pill btn-lg bg-gradient"
                :disabled="isSubmittingSubscribe">
                {{ isSubmittingSubscribe ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.subscribe {
  background-image: url(~/assets/images/Group229.png);
  background-position: center;
  background-repeat: repeat-y;
  background-size: contain;
}
</style>
