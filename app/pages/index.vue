<script setup lang="ts">
const speakersData = ref<Array<{ id: number, name: string, type: string, photo: string, about: string }>>([
  {
    id: 1,
    name: 'Dra. Isabela Trindade',
    type: 'Moderadora',
    photo: '@/assets/images/speakers/isabela-trindade.png',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
  },
  {
    id: 2,
    name: 'Dr. Charlys Barbosa Nogueira',
    type: 'Palestrante',
    photo: '@/assets/images/speakers/charlys-barbosa-nogueira.png',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
  },
  {
    id: 3,
    name: 'Dra. Lais Bertola',
    type: 'Palestrante',
    photo: '@/assets/images/speakers/lais-bertola.png',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
  },
  {
    id: 4,
    name: 'Dr. Leonardo Brandão de Oliva',
    type: 'Palestrante',
    photo: '@/assets/images/speakers/leonardo-brandao-de-oliva.png',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
  },
  {
    id: 5,
    name: 'Dra. Maria Aparecida Bicalho',
    type: 'Palestrante',
    photo: '@/assets/images/speakers/maria-aparecida-bicalho.png',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
  },
])
</script>

<template>
  <div>
    <!-- hero section -->
    <section class="hero">
      <div class="container py-3">
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-8 col-lg-6">
            <p class="text-center mb-0 py-3 fs-4">
              <span class="border border-white text-white border-3 rounded-pill px-4 py-1 fw-semibold">
                WEBINAR
              </span>
            </p>
            <img src="@/assets/images/aaic_white_art.webp" alt="Arte do AAIC 2026" class="w-75 d-block mx-auto">
            <p class="text-center mb-0 py-3 fs-3 fw-semibold text-white">
              Terça-feira, dia 04 de agosto de 2026
              <br>
              19h30 - 21h
            </p>
            <div class="row">
              <div class="col-auto mx-auto">
                <button class="btn btn-secondary rounded-pill px-4 py-2 fs-5 fw-semibold">
                  Inscrições abertas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- about section -->
    <section class="about">
      <div class="container py-3 py-lg-5">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-bold text-purple">Sobre</h2>
            <p class="fs-5 mb-0">
              A SBGG reuniu os principais destaques do Alzheimer’s Association International Conference® 2026 (AAIC®), o
              maior e mais relevante evento mundial sobre Alzheimer e outras demências, realizado entre os dias 12 e 15
              de julho, em Londres.
            </p>
            <p class="fs-5">
              Participe do nosso webinar exclusivo, com os insights selecionados pela SBGG e certificado de participação
              incluso.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- speakers section -->
    <section class="speakers">
      <div class="container py-3 py-lg-5">
        <div class="row mb-3">
          <div class="col-12">
            <h2 class="fw-bold text-purple">Palestrantes</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4" v-for="speaker in speakersData" :key="speaker.id">
            <div class="p-3">
              <img :src="speaker.photo" :alt="`Foto do palestrante - ${speaker.name}`" class="w-75 d-block mx-auto">
              <h4 class="fw-semibold text-center text-purple mb-0">
                {{ speaker.name }}
              </h4>
              <p class="text-center mb-1 small">
                {{ speaker.type }}
              </p>
              <p class="text-center mb-0">
                {{ speaker.about }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- call to action -->
    <section class="call-to-action">
      <div class="container py-3 py-lg-5">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-bold text-purple mb-3 text-center">Inscreva-se para participar do evento</h2>
            <p class="fs-5 fw-semibold fst-italic text-center mb-0">
              * Associados adimplentes da SBGG - Valor da inscrição R$ 49,90
            </p>
            <p class="fs-5 fw-semibold fst-italic text-center">
              * Não Associados ou Não quites - Valor da inscrição R$ 179,90
            </p>
            <p class="mb-0 py-3 d-flex justify-content-center">
              <NuxtLink class="btn btn-purple rounded-pill px-4 py-2 fs-5 fw-semibold btn-lg px-4 px-md-5 mx-3"
                to="/subscribe">Inscreva-se
              </NuxtLink>
              <NuxtLink class="btn btn-purple rounded-pill px-4 py-2 fs-5 fw-semibold btn-lg px-4 px-md-5 mx-3"
                to="/login">Login</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background-image: url('@/assets/images/bghero.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.speakers {
  background-image: url('@/assets/images/speakers.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
