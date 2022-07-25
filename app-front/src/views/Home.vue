<template>
  <v-row class="h100">
    <v-col
      cols="6"
      class="vFlex"
      style="background-color: #6475c9"
      id="formImg"
    >
      <v-img
        alt="Form"
        class="shrink mr-2"
        contain
        src="../assets/img/form.png"
        transition="scale-transition"
        width="40%"
      />
    </v-col>
    <v-col cols="12" md="6" class="vFlex">
      <v-card elevation="24" class="cardi" outlined>
        <v-card-title>
          <h3 class="titles">Cadastrar Novo Usuário</h3>
          <hr />
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="fullName"
                  label="Nome Completo"
                  maxlength="20"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="dateBirthday"
                  label="Data de Nascimento"
                  v-mask="'##/##/####'"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"
                ><v-btn
                  block
                  color="indigo"
                  class="mr-4 text-white"
                  type="button"
                  :disabled="invalid"
                  @click="cadastrar()"
                >
                  Cadastrar
                </v-btn></v-col
              >
              <v-col cols="6"
                ><v-btn block color="primary" class="text-white" @click="clear">
                  Cancelar
                </v-btn></v-col
              >
              <v-snackbar
                right
                v-model="snackbar"
                timeout="2500"
                :color="corPopUp"
                class="text-center"
              >
                {{ text }}
              </v-snackbar>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      fullName: "",
      dateBirthday: "",
      snackbar: false,
      text: `Cadastro Efetuado com sucesso!`,
      corPopUp: "#f0932b",
    };
  },

  methods: {
    getAge() {
      let ageFormatada = this.dateBirthday.split("/");
      var ano_atual, mes_atual, dia_atual, quantos_anos;
      var d = new Date();
      ano_atual = d.getFullYear();
      mes_atual = d.getMonth() + 1;
      dia_atual = d.getDate();
      (ageFormatada[2] = +ageFormatada[2]),
        (ageFormatada[1] = +ageFormatada[1]),
        (ageFormatada[0] = +ageFormatada[0]),
        (quantos_anos = ano_atual - ageFormatada[2]);

      if (
        mes_atual < ageFormatada[1] ||
        (mes_atual == ageFormatada[1] && dia_atual < ageFormatada[0])
      ) {
        quantos_anos--;
      }

      return quantos_anos < 0 ? 0 : quantos_anos;
    },

    clear() {
      this.fullName = "";
      this.dateBirthday = "";
    },

    cadastrar() {
      const user = {
        fullName: this.fullName,
        dateBirthday: this.dateBirthday,
        age: this.getAge(),
      };

      if (
        user.fullName == null ||
        user.fullName == "" ||
        user.dateBirthday == ""
      ) {
        this.snackbar = true;
        this.text = "Verificar Campos em brancos!";
        this.corPopUp = "#f0932b";
      } else {
        axios
          .post("http://192.168.0.19:5000/cadastrar", user)
          .then((response) => {
            if (response.data.msg) {
              this.snackbar = true;
              this.text = response.data.msg;
              this.clear();
              this.corPopUp = "#46CC6B";
            }
          });
      }
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: capitalize !important;
}
.cardi {
  width: 460px !important;
}
@media (max-width: 800px) {
  #formImg {
    display: none !important;
  }
}
</style>
