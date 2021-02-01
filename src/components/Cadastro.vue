<template>
  <div>
    <div class="q-pa-md">
      <form>
        <div class="q-gutter-sm row items-center">
          <img
            size="46px"
            src="https://github.com/vlarysc/CRUD/blob/main/src/assets/Logo.png?raw=true"
          />
        </div>
        <hr class="sep" />
        <template>
          <div class="q-pa-md" style="margin-left: 355px; max-width: 300px">
            <div class="q-gutter-md">
              <q-badge color="yellow-9" text-color="black" multi-line>
                Model: "{{ model }}"
              </q-badge>

              <q-select
                filled
                v-model="pessoa.tipoPessoa"
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
              :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
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
              mask="(##) # ####-####"
              unmasked-value
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
            color="yellow-9"
            text-color="black"
            icon="person_add"
            label="Adicionar"
          >
          </q-btn>
          <q-btn
            v-if="isEdit"
            @click.prevent="updat(pessoa)"
            color="yellow-9"
            text-color="black"
            icon="system_update_alt"
            label="Atualizar"
          >
          </q-btn>
          <q-btn
            to="/"
            color="yellow-9"
            text-color="black"
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
import { fasFilePrescription } from '@quasar/extras/fontawesome-v5';
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
    const datas = JSON.parse(localStorage.getItem('datasApp'));
    const pessoa = datas.find(
      pessoaMap => pessoaMap.documento1 == this.$route.params.id
    );
    if (pessoa) {
      console.log(pessoa);
      this.pessoa = pessoa;
      this.isEdit = true;
    } else {
      this.creating = true;
      this.pessoa.documento1 = this.$route.params.id;
      this.isEdit = false;
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
