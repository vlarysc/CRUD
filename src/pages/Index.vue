<template>
  <q-page class="container">
    <q-page class="q-pa-md">
      <div class="q-pa-md">
        <q-form
          @submit="cadastrado"
          @reset="resetar"
          class="q-gutter-md column items-start"
        >
          <q-toggle v-model="accept" label="PJ" />

          <q-input filled v-model="name" label="Nome" />
          <q-input filled v-model="nickName" label="Sobrenome" />

          <q-input
            class="senha"
            filled
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Senha"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            class="e-mail"
            filled
            v-model="email"
            type="email"
            label="Email"
          />

          <q-input
            v-model.number="tel1"
            filled
            type="tel"
            label="Telefone 1"
            :rules="[myRule]"
          />
          <q-input v-model.number="tel2" filled type="tel" label="Telefone 2" />
          <q-input v-model.number="tel3" filled type="tel" label="Telefone 3" />

          <q-input v-model="date" filled type="date" />

          <div class="col-12">
            <q-btn
              color="amber"
              type="reset"
              glossy
              label="Cadastrar"
              class="float-right"
            />
          </div>
        </q-form>
      </div>
    </q-page>

    <router-view />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      pessoa: {
        id: 0,
        nome: 'string',
        nickName: 'string',
        email: 'string', //com validacao de formato de email
        tipoPessoa: 'PF', //(PF,PJ)
        documento1: 'string', //campo unico
        documento2: 'string',
        documento3: 'string',
        telefone1: 'string', // campo obrigatorio
        telefone2: 'string',
        telefone3: 'string',
        enderecos: [
          {
            id: 0,
            cep: 'string',
            lagradouro: 'string',
            complemento: 'string',
            bairro: 'string',
            cidade: 'string',
            uf: 'string',
            lat: 0,
            lon: 0
          }
        ]
      },

      leftDrawerOpen: false,
      isPwd: true,
      cadastrado: false,
      form: {
        password: '',
        email: '',
        tel1: '',
        tel2: '',
        tel3: '',
        date: '',
        text: '',
        model: '',
        name: '',
        nickName: '',
        accept: false
      }
    };
  },
  methods: {
    myRule(val) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(!!val || '* Campo Obrigatório');
        }, 500);
      });
    },

    reset() {
      this.$refs.input.resetValidation();
    },
    resetar() {
      (this.form = {
        password: '',
        email: '',
        tel1: '',
        tel2: '',
        tel3: '',
        date: '',
        text: '',
        model: '',
        name: '',
        nickName: '',
        accept: false
      }),
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        });
    }
  }
};
</script>

<style>
.senha {
  width: 185px;
}
.e-mail {
  width: 185px;
}
</style>
