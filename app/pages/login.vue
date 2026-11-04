<script setup lang="ts">
import LoginPage from "~/components/login/LoginPage.vue";

definePageMeta({
  layout: false,
});

const router = useRouter();
const { $toast } = useNuxtApp();
</script>

<template>
  <div class="">
    <LoginPage />
  </div>
</template>
