<template>
  <q-page class="container">
    <q-page class="">
      <div class="row">
        <q-form @submit="cadastrado" @reset="resetar" class=""> </q-form>
      </div>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-4">
            <q-input filled v-model="form.name" label="Nome" />
          </div>
          <div class="col-4">
            <q-input filled v-model="form.nickName" label="Sobrenome" />
          </div>
          <div class="col-4">
            <q-input
              class="e-mail"
              filled
              v-model="form.email"
              type="email"
              label="Email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-input filled v-model="form.documento1" label="CPF ou CNPJ" />
          </div>
          <div class="col-4">
            <q-input filled v-model="form.documento2" label="RG ou IE" />
          </div>
          <div class="col-4">
            <q-input filled v-model="form.documento3" label="IM" />
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <q-input
              v-model.number="form.telefone1"
              filled
              type="tel"
              label="Telefone 1"
              :rules="[myRule]"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="form.telefone2"
              filled
              type="tel"
              label="Telefone 2"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="form.telefone3"
              filled
              type="tel"
              label="Telefone 3"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-input
              v-model="form.cep"
              @blur="buscaCep"
              filled
              type="tel"
              label="CEP"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="form.cidade"
              filled
              type="tel"
              label="Cidade"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="form.bairro"
              filled
              type="tel"
              label="Bairro"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="form.logradouro"
              filled
              type="tel"
              label="Rua"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="form.complemento"
              filled
              type="tel"
              label="Complemento"
            />
          </div>
          <div class="col-4">
            <q-input v-model="form.uf" filled type="tel" label="UF" />
            <select name="uf" v-model="form.uf">
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col">
        <q-btn
          color="amber"
          type="reset"
          glossy
          label="Cadastrar"
          class="float-right"
        />
      </div>
    </q-page>

    <router-view />
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PageIndex',
  props: {
    pessoa: {
      nome: 'string',
      nickName: 'string',
      email: 'string', //com validacao de formato de email
      tipoPessoa: 'string', //(PF,PJ)
      documento1: 'string', //campo unico
      documento2: 'string',
      documento3: 'string',
      telefone1: 'string', // campo obrigatorio
      telefone2: 'string',
      telefone3: 'string',
      enderecos: [
        {
          cep: 'string',
          logradouro: 'string',
          complemento: 'string',
          bairro: 'string',
          cidade: 'string',
          uf: 'string'
        }
      ]
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      cadastrado: false,
      form: {
        documento1: '',
        documento2: '',
        documento3: '',
        telefone1: '',
        telefone2: '',
        telefone3: '',
        email: '',
        date: '',
        text: '',
        model: '',
        name: '',
        nickName: '',
        enderecos: []
      }
    };
  },

  methods: {
    buscaCep() {
      resultado = axios
        .get(`http://viacep.com.br/ws/${this.form.cep}/json/`)
        .then(res => res)
        .catch(error => error);
      this.resultado.data.ce = cep;

      this.resultado.data.longadouro = longadouro;
      this.resultado.data.complemento = complemento;
      this.resultado.data.bairro = bairro;
      this.resultado.data.cidade = cidade;
      this.resultado.data.uf = uf;

      this.form.enderecos.push(this.enderecos);
    },
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
        documento1: '',
        documento2: '',
        documento3: '',
        telefone1: '',
        telefone2: '',
        telefone3: '',
        password: '',
        email: '',
        name: '',
        nickName: '',
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
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

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
.row + .row
  margin-top: 1rem
</style>
