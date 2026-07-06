<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSiteStore } from '~/stores/website';

interface ApiResponse<T> {
    estado: number;
    message?: string;
    dados: T;
}

interface UserData {
    firstname: string;
    lastname: string;
    treatment: string;
    categoria: string;
    valor: string;
    enable: number;
}

interface PaymentResponse {
    estado: number;
    message?: string;
    link: string;
}

const siteStore = useSiteStore();
const { showAlert } = useAlert();
//const { navigateTo } = useNuxtApp();

const fullName = ref<string>('');
const treatment = ref<string>('');
const category = ref<string>('');
const value = ref<string>('');
const linkPagamento = ref<string>('');
const eventId = ref<number>(0);

const payNow = (): void => {
    window.location.href = linkPagamento.value;
}

const getPaymentLink = async (): Promise<void> => {
    try {
        const response = await $fetch<PaymentResponse>(`https://eventos.tbr.com.br/apis/payment`, {
            method: 'POST',
            body: {
                email: siteStore.email,
                evento: siteStore.eventId,
                empresa: 13,
                descricao: 'Inscrição - Highlights AAIC 2026',
                urlretorno: 'https://eventos.tbr.com.br/sbgg-aaic26/paymentreturn'
            }
        });

        if (!response) {
            throw new Error('Erro ao obter o link de pagamento.');
        }

        if (response.estado != 1) {
            throw new Error(response.message || 'Erro ao obter o link de pagamento.');
        }

        linkPagamento.value = response.link;
    } catch (error) {
        await showAlert({
            title: 'Error',
            message: (error as Error).message,
            type: 'error'
        });
    }
}

const verifyLogin = async (): Promise<void> => {
    try {
        const response = await $fetch<ApiResponse<UserData>>(`https://eventos.tbr.com.br/apis/login/?evento=${siteStore.eventId}&email=${siteStore.email}`);

        if (!response) {
            throw new Error('Erro ao verificar o login.');
        }

        if (response.estado != 1) {
            throw new Error(response.message || 'Erro ao verificar o login.');
        }

        const dados = response.dados;
        fullName.value = dados.firstname + ' ' + dados.lastname;
        treatment.value = dados.treatment;
        category.value = dados.categoria;
        value.value = dados.valor;

        if (dados.enable == 1) {
            await navigateTo({
                path: '/content'
            });
        } else {
            await getPaymentLink();
        }

    } catch (error) {
        await showAlert({
            title: 'Error',
            message: (error as Error).message,
            type: 'error'
        });
    }
}

onMounted(() => {
    eventId.value = siteStore.eventId;
    verifyLogin();
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

                <div class="row justify-content-center">
                    <div class="col-md-9 col-lg-6">
                        <p class="text-center fs-5 text-principal">
                            Bem vindo(a) {{ treatment }} {{ fullName }}
                        </p>
                        <table class="table w-100 table-bordered">
                            <tr>
                                <td>Cadastro na categoria:</td>
                                <td>{{ category }}</td>
                            </tr>
                            <tr>
                                <td>Taxa de inscrição:</td>
                                <td>R$ {{ value }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-auto d-grid mx-auto">
                        <button class="btn btn-lg text-light btn-principal px-5 bg-gradient" v-show="linkPagamento"
                            @click="payNow">
                            Pagar agora
                        </button>
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
