<template>
  <q-form @submit="salvar(enderecos)" class="q-gutter-md">
    <Tabs />
    <div class="q-pa-xl">
      <hr class="sep" />
      <div class="row q-pa-xs q-ma-sm ">
        <div class="col-xs-12 col-md-2">
          <q-input
            class="q-pa-xs"
            filled
            @blur="consultar"
            v-model="enderecos.cep"
            label="CEP"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-md-8">
          <q-input
            class="q-pa-xs"
            filled
            v-model="enderecos.logradouro"
            label="Rua"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-md-2">
          <q-input
            class="q-pa-xs"
            filled
            v-model="enderecos.numero"
            label="N°"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
      </div>
      <div class="row q-pa-xs q-ma-sm">
        <div class="col-xs-12 col-md-5">
          <q-input
            class="q-pa-xs"
            filled
            v-model="enderecos.bairro"
            label="Bairro"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
        <div class="col-md-4 col-xs-12 ">
          <q-input
            class="q-pa-xs"
            filled
            v-model="enderecos.cidade"
            label="Cidade"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-md-3">
          <q-select
            class="q-pa-xs"
            filled
            v-model="enderecos.uf"
            :options="options"
            label="UF"
            emit-value
            map-options
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-pa-xs q-ma-sm">
        <div class="col-xs-12">
          <q-input
            class="q-pa-xs"
            filled
            v-model="enderecos.complemento"
            label="Complemento"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
      </div>
    </div>

    <div>
      <q-btn
        label="Finalizar"
        @click="consultar"
        color="yellow-9"
        text-color="black"
      />
      <q-btn
        label="Finalizar"
        type="submit"
        color="yellow-9"
        text-color="black"
      />
      <q-btn
        label="Voltar"
        @click="back"
        color="yellow-9"
        text-color="black"
        class="q-ml-sm"
        icon="arrow_back"
      />
    </div>
  </q-form>
</template>

<script>
import axios from 'axios';
import Tabs from './Tabs';

export default {
  components: { Tabs },
  created() {},
  data() {
    return {
      model: null,
      options: [
        {
          label: 'Acre',
          value: 'AC'
        },
        {
          label: 'Alagoas',
          value: 'AL'
        },
        {
          label: 'Amapá',
          value: 'AP'
        },
        {
          label: 'Amazonas',
          value: 'AM'
        },
        {
          label: 'Bahia',
          value: 'BA'
        },
        {
          label: 'Ceará',
          value: 'CE'
        },
        {
          label: 'Brasília',
          value: 'DF'
        },
        {
          label: 'Espírito Santo',
          value: 'ES'
        },
        {
          label: 'Goiás',
          value: 'GO'
        },
        {
          label: 'Maranhão',
          value: 'MA'
        },
        {
          label: 'Mato Grosso',
          value: 'MT'
        },
        {
          label: 'Mato Grosso do Sul',
          value: 'MS'
        },
        {
          label: 'Minas Gerais',
          value: 'MG'
        },
        {
          label: 'Pará',
          value: 'PA'
        },
        {
          label: 'Paraíba',
          value: 'PB'
        },
        {
          label: 'Paraná',
          value: 'PR'
        },
        {
          label: 'Pernambuco',
          value: 'PE'
        },
        {
          label: 'Piauí',
          value: 'PI'
        },
        {
          label: 'Rio de Janeiro',
          value: 'RJ'
        },
        {
          label: 'Rio Grande do Norte',
          value: 'RN'
        },
        {
          label: 'Rio Grande do Sul',
          value: 'RS'
        },
        {
          label: 'Rondônia',
          value: 'RO'
        },
        {
          label: 'Roraima',
          value: 'RR'
        },
        {
          label: 'Santa Catarina',
          value: 'SC'
        },
        {
          label: 'São Paulo',
          value: 'SP'
        },
        {
          label: 'Sergipe',
          value: 'SE'
        },
        {
          label: 'Tocantins',
          value: 'TO'
        }
      ],

      enderecos: {
        id: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
      },
      name: null,
      age: null,

      accept: false
    };
  },

  methods: {
    back() {
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
    },
    async consultar() {
      const result = await this.$axios
        .get(`http://viacep.com.br/ws/${this.enderecos.cep}/json/`)
        .then(res => res)
        .catch(error => error);
      if (result.status == 200 && !result.data.erro) {
        const data = result.data;
        this.enderecos.logradouro = data.logradouro;
        this.enderecos.bairro = data.bairro;
        this.enderecos.cidade = data.localidade;
        this.enderecos.uf = data.uf;
      } else {
        this.$q.notify('Erro ao consultar o CEP');
      }
      console.log(result);
    }
  }
};
</script>

<style></style>
