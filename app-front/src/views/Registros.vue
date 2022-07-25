<template>
  <v-row class="h100">
    <v-col
      cols="4"
      class="vFlex"
      style="background-color: #6475c9"
      id="formImg"
    >
      <v-img
        alt="Form"
        class="shrink mr-2"
        contain
        src="../assets/img/team.png"
        transition="scale-transition"
        width="40%"
      />
    </v-col>
    <v-col cols="12" md="8" class="pl-4 pr-4 pt-4">
      <h1 class="titles pt-2 pb-2 text-center">Usuários</h1>
      <v-container style="width: 80%">
        <v-text-field
          class="mb-4"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="usuarios"
          :search="search"
        ></v-data-table>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    axios
      .get("http://192.168.0.19:5000/users")
      .then((response)=>{
        console.log(response)
        return this.usuarios = response.data
      });
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nome",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Data Nascimento", value: "birthday" },
        { text: "Idade", value: "age" },
      ],
      usuarios: []
    };
  },
};
</script>
<style scoped>
@media (max-width: 800px) {
  #formImg {
    display: none !important;
  }
}
</style>
