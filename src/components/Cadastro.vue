<template>
  <div>
    <div class="q-pa-md">
      <form>
        <div class="q-gutter-sm row items-center">
          <img
            size="46px"
            src="https://nurap.org.br/wp-content/uploads/2018/08/Logo_Construindo-Futuro_OFICIAL_Esta%CC%81gio-1-300x138.png"
          />
        </div>
        <hr class="sep" />
        <template>
          <div class="q-pa-md" style="margin-left: 355px; max-width: 300px">
            <div class="q-gutter-md">
              <q-badge color="indigo-10" multi-line>
                Model: "{{ model }}"
              </q-badge>

              <q-select
                filled
                v-model="model"
                :options="options"
                label="Standard"
                emit-value
                map-options
              />
            </div>
          </div>
        </template>

        <div class="q-pa-md">
          <div class="q-gutter-md row items-start">
            <q-input
              v-model="pessoa.name"
              style="width: 400px;"
              filled
              type="text"
              hint="Nome"
            />

            <q-input
              v-model="pessoa.nickName"
              style="width: 200px;"
              filled
              type="text"
              hint="Apelido"
            />
            <q-input
              v-model="pessoa.email"
              style="width: 400px;"
              filled
              type="email"
              hint="E-mail"
            />
          </div>

          <div class="q-gutter-md row items-start">
            <q-input
              v-model="pessoa.telefone1"
              filled
              type="tel"
              hint="Telefone"
            />

            <q-input
              v-model="pessoa.documento1"
              filled
              type="text"
              hint="Documento"
            />

            <q-input
              v-model="pessoa.nascimento"
              filled
              type="date"
              hint="Data de Nascimento"
            />
          </div>
        </div>

        <div class="q-pa-md q-gutter-sm">
          <q-btn
            v-if="!isEdit"
            @click.prevent="salvar(pessoa)"
            color="indigo-10"
            text-color="white"
            unelevated
            icon="person_add"
            label="Adicionar"
          >
          </q-btn>
          <q-btn
            v-if="isEdit"
            @click.prevent="updat(pessoa)"
            color="indigo-10"
            text-color="white"
            unelevated
            icon="system_update_alt"
            label="Atualizar"
          >
          </q-btn>
          <q-btn
            to="/"
            color="indigo-10"
            text-color="white"
            unelevated
            icon="arrow_back"
            label="Voltar"
          >
          </q-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Index from '../pages/Index';

export default {
  components: { Index },
  name: 'Cadastro',
  data() {
    return {
      model: null,
      options: [
        {
          label: 'Pessoa Física',
          value: 'PF'
        },
        {
          label: 'Pessoa Jurídica',
          value: 'PJ'
        }
      ],

      creating: false,
      isEdit: false,
      pessoa: {
        id: '',
        tipoPessoa: '',
        name: '',
        nickName: '',
        email: '',
        documento1: '',
        telefone1: '',
        nascimento: ''
      }
    };
  },
  mounted() {
    if (this.$route.params.id == 'new') this.creating = true;
    else {
      const datas = JSON.parse(localStorage.getItem('datasApp'));
      const pessoa = datas.find(
        pessoaMap => pessoaMap.id == this.$route.params.id
      );
      console.log(pessoa);
      this.pessoa = pessoa;
      this.isEdit = true;
    }
  },
  methods: {
    createPessoa() {
      this.creating = true;
    },
    updatePessoa(pessoa) {
      this.creating = false;
      this.pessoa = pessoa;
      this.isEdit = true;
    },
    novaPessoa() {
      return {
        tipoPessoa: '',
        name: '',
        nickName: '',
        email: '',
        documento1: '',
        telefone1: '',
        nascimento: ''
      };
    },
    updat(pessoa) {
      let pessoas = JSON.parse(localStorage.getItem('datasApp'));
      let datas = pessoas.map(pessoaMap => {
        if (pessoaMap.documento1 == pessoa.documento1) {
          return pessoa;
        } else {
          return pessoaMap;
        }
      });
      this.isEdit = false;

      localStorage.setItem('datasApp', JSON.stringify(datas));
      this.pessoa = this.novaPessoa();
      this.$router.go(-1);
    },

    salvar(pessoa) {
      let datas = localStorage.getItem('datasApp');

      if (datas) {
        datas = JSON.parse(datas);
      } else datas = [];

      pessoa.id = new Date().getTime();
      datas.push(pessoa);
      this.pessoas = datas;

      localStorage.setItem('datasApp', JSON.stringify(datas));
      this.pessoa = this.novaPessoa();

      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
*,
:before,
:after {
  box-sizing: border-box;
}

img {
margin-left: 350px;

}
</style>
