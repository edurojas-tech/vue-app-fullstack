<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <div class="d-flex align-center">
        <v-img
          alt="DG Logo"
          class="shrink mr-2"
          contain
          src="https://dgsolutions.com.br/wp-content/uploads/2021/04/logo-dg-solutions-branca.png.webp"
          transition="scale-transition"
          width="50"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn :to="pagina" @click="this.currentPage" text>
        <span class="mr-2 text-white">
          {{ descBTN }}
        </span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="vFlex">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      descBTN: "Usuários",
      pagina: "/registros",
    };
  },
  methods: {
    currentPage() {
      if (location.pathname == "/registros") {
        this.descBTN = "Novo";
        this.pagina = "/";
      } else {
        this.descBTN = "Usuários";
        this.pagina = "/registros";
      }
    },
  },
};
</script>
<style scoped>
@import url("./assets/global.css");
</style>
