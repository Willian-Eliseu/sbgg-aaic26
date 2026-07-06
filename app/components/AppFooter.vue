<script setup lang="ts"></script>

<template>
  <footer class="site-footer">
    <div class="container py-5">
      <div class="row">
        <!-- SBGG & AAIC Logos -->
        <div class="col-12 text-center mb-4">
          <img src="@/assets/images/sbgg_logo.png" alt="SBGG" height="60" class="mx-3" />
          <img src="@/assets/images/aaic_logo.webp" alt="AAIC26" height="60" class="mx-3" />
        </div>

        <!-- Navigation Links -->
        <div class="col-12 text-center mb-4">
          <div class="d-flex justify-content-center flex-wrap gap-3">
            <NuxtLink to="/" class="footer-link text-white fw-bold mx-2 text-decoration-none">EVENTO</NuxtLink>
            <NuxtLink to="/subscribe" class="footer-link text-white fw-bold mx-2 text-decoration-none">INSCRIÇÃO
            </NuxtLink>
            <NuxtLink to="/certificate" class="footer-link text-white fw-bold mx-2 text-decoration-none">CERTIFICADO
            </NuxtLink>
            <NuxtLink to="/support" class="footer-link text-white fw-bold mx-2 text-decoration-none">SUPORTE</NuxtLink>
            <a href="https://www.sbgg.org.br/" target="_blank"
              class="footer-link text-white fw-bold mx-2 text-decoration-none">SBGG</a>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="col-12 text-center mb-4">
          <div class="text-white-50">
            <p class="mb-1">E-mail: <a href="mailto:associados@sbgg.org.br"
                class="text-white text-decoration-none">associados@sbgg.org.br</a></p>
            <p>Telefone/WhatsApp: <a href="wa.me/+5521984857655" class="text-white text-decoration-none">+55 (21)
                98485-7655</a></p>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="row justify-content-between">
        <div class="col-lg-auto text-start">
          <p class="text-white-50 small mb-0">
            &copy; 2026 Sociedade Brasileira de Geriatria e Gerontologia. Todos os direitos reservados.
          </p>
        </div>

        <div class="col-lg-auto text-end">
          <p class="text-white-50 small mb-0">
            Desenvolvido por <a href="https://tbr.com.br" target="_blank"
              class="text-white-50 text-decoration-none fw-bold">TBR Produções</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #6b3d90;
}

.footer-link:hover {
  color: #e0e0e0 !important;
}
</style>
