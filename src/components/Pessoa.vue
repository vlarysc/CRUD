<template>
  <q-form ref="myForm" @submit="salvar">
    <div class="q-pa-xl">
      <hr class="sep" />

      <div class="row q-pa-xs q-ma-sm ">
        <div class="col-sm-3">
          <q-select
            class="q-pa-xs"
            filled
            v-model="pessoa.tipoPessoa"
            :options="options"
            label="Tipo Pessoa"
            emit-value
            map-options
          />
        </div>
        <div class="col-sm-3">
          <q-input
            class="q-pa-xs"
            :mask="
              pessoa.tipoPessoa == 'PF'
                ? '###.###.###-##'
                : '##.###.###/####-##'
            "
            v-model="pessoa.documento1"
            filled
            unmasked-value
            type="text"
            :label="pessoa.tipoPessoa == 'PF' ? 'CPF' : 'CNPJ'"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-sm-3">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.documento2"
            :mask="pessoa.tipoPessoa == 'PF' ? '#.###.###-#' : ''"
            filled
            type="text"
            :label="pessoa.tipoPessoa == 'PF' ? 'RG' : 'Inscrição Estadual'"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-sm-3">
          <q-input
            class="q-pa-xs"
            v-if="pessoa.tipoPessoa == 'PJ'"
            v-model="pessoa.documento3"
            filled
            type="text"
            label="Inscrição Municipal"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
      </div>

      <div class="row q-pa-xs q-ma-sm">
        <div class="col-8">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.name"
            filled
            type="text"
            :label="pessoa.tipoPessoa == 'PF' ? 'Nome' : 'Razão Social'"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.nascimento"
            filled
            type="text"
            mask="##/##/####"
            :label="
              pessoa.tipoPessoa == 'PF'
                ? 'Data de Nascimento'
                : 'Data de Fundação'
            "
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
      </div>
      <div class="row q-pa-xs q-ma-sm">
        <div class="col-6 q-pa-xs">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.nickName"
            filled
            type="text"
            :label="pessoa.tipoPessoa == 'PF' ? 'Apelido' : 'Nome Fantasia'"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-6 q-pa-xs">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.email"
            filled
            type="email"
            label="E-mail"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
      </div>
      <div class="row q-pa-xs q-ma-sm">
        <div class="col-4">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.telefone1"
            filled
            mask="(##) # ####-####"
            type="tel"
            label="Telefone"
            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.telefone2"
            filled
            mask="(##) # ####-####"
            type="tel"
            label="Telefone (Opcional)"
          />
        </div>
        <div class="col-4">
          <q-input
            class="q-pa-xs"
            v-model="pessoa.telefone3"
            filled
            mask="(##) # ####-####"
            type="tel"
            label="Telefone (Opcional)"
          />
        </div>
      </div>
    </div>

    <q-btn
      class="q-ml-sm"
      v-if="!isEdit"
      type="submit"
      @click.prevent="salvar(pessoa)"
      color="yellow-9"
      text-color="black"
      icon="person_add"
      label="Continuar"
    >
    </q-btn>
    <q-btn
      class="q-ml-sm"
      v-if="isEdit"
      @click.prevent="updat(pessoa)"
      color="yellow-9"
      text-color="black"
      type="submit"
      icon="system_update_alt"
      label="Atualizar"
    >
    </q-btn>
    <q-btn
      class="q-ml-sm"
      to="/"
      color="yellow-9"
      text-color="black"
      icon="arrow_back"
      label="Voltar"
    >
    </q-btn>
  </q-form>
</template>

<script>
import Tabs from './Tabs';
import Index from '../pages/Index';
import { validarCNPJ } from 'src/utils/validaCNPJ';
import { validateCPF } from 'src/utils/validaCPF';
import { mapState, mapActions } from 'Vuex';

export default {
  components: { Index, Tabs },
  name: 'Cadastro',
  data() {
    return {
      ruleCpnj: [
        val => val.length > 0 || val.length < 18 || 'Campo Obrigatório',
        val => validarCNPJ(val) || 'CNPJ Inválido!'
      ],
      ruleCpf: [
        val => val.length > 0 || val.length < 14 || 'Campo Obrigatório',
        val => $validateBR.cpf(val) || 'CPF Inválido!'
      ],
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
        documento2: '',
        documento3: '',
        telefone1: '',
        telefone2: '',
        telefone3: '',
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
      if (this.pessoa.documento1.length == 11) {
        this.pessoa.tipoPessoa = 'PF';
      } else {
        this.pessoa.tipoPessoa = 'PJ';
      }
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
    voltar() {
      this.$router.go(-1);
    },

    salvar(pessoa) {
      this.$refs.myForm.validate().then(success => {
        if (success) {
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
        } else {
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped></style>
