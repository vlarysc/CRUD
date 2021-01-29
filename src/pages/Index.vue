<template>
  <div class="q-pa-md">
    <q-table
      dense
      title="Pessoas"
      :data="pessoas"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div class="q-pa-sm q-gutter-sm">
            <q-btn
              size="sm"
              color="info"
              @click="update(props.row)"
              icon="create"
            />
            <q-btn
              size="sm"
              color="red"
              @click="remove(props.row.id)"
              text-color="white"
              icon="delete_forever"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="q-pa-md q-gutter-xl">
      <q-btn label="Adicionar" to="/cadastro/new" no-caps color="purple-14" />

      <q-dialog v-model="layout" full-width>
        <q-layout view="Lhh lpR fff" class="bg-white">
          <q-page>
            <div class="container-contact3">
              <div class="wrap-contact3">
                <form class="contact3-form validate-form">
                  <span class="contact3-form-title"> </span>

                  <div class="wrap-contact3-form-radio">
                    <div
                      class="contact3-form-radio m-r-42"
                      style="margin: 2px;"
                    >
                      <input
                        v-model="pessoa.tipoPessoa"
                        class="input-radio3"
                        id="radio1"
                        type="radio"
                        name="choice"
                        value="PF"
                        checked="checked"
                      />
                      <label class="label-radio3" for="radio1">
                        Pessoa Física
                      </label>
                    </div>

                    <div class="contact3-form-radio" style="margin: 2px;">
                      <input
                        v-model="pessoa.tipoPessoa"
                        class="input-radio3"
                        id="radio2"
                        type="radio"
                        name="choice"
                        value="PJ"
                      />
                      <label class="label-radio3" for="radio2">
                        Pessoa Jurídica
                      </label>
                    </div>
                  </div>

                  <div
                    class="wrap-input3 validate-input"
                    data-validate="Name is required"
                  >
                    <input
                      class="input3"
                      type="text"
                      name="name"
                      v-model="pessoa.name"
                      placeholder="Nome"
                    />
                    <span class="focus-input3"></span>
                  </div>

                  <div
                    class="wrap-input3 validate-input"
                    data-validate="Name is required"
                  >
                    <input
                      class="input3"
                      type="text"
                      v-model="pessoa.nickName"
                      name="nickName"
                      placeholder="Apelido"
                    />
                    <span class="focus-input3"></span>
                  </div>

                  <div
                    class="wrap-input3 validate-input"
                    data-validate="Valid email is required: ex@abc.xyz"
                  >
                    <input
                      class="input3"
                      type="text"
                      v-model="pessoa.email"
                      name="email"
                      placeholder="E-mail"
                    />
                    <span class="focus-input3"></span>
                  </div>

                  <div
                    class="wrap-input3 validate-input"
                    data-validate="name is required"
                  >
                    <input
                      class="input3"
                      type="text"
                      v-model="pessoa.telefone1"
                      name="telefone1"
                      placeholder="Telefone"
                    />
                    <span class="focus-input3"></span>
                  </div>

                  <div
                    class="wrap-input3 validate-input"
                    data-validate="name is required"
                  >
                    <input
                      class="input3"
                      type="cpf"
                      v-model="pessoa.documento1"
                      name="documento1"
                      placeholder="CPF ou CNPJ"
                    />
                    <span class="focus-input3"></span>
                  </div>

                  <div
                    class="wrap-input3 validate-input"
                    data-validate="name is required"
                  >
                    <input
                      class="input3"
                      type="date"
                      v-model="pessoa.nascimento"
                      name="nascimento"
                    />
                    <span class="focus-input3"></span>
                  </div>

                  <div class="container-contact3-form-btn">
                    <q-btn
                      v-if="!isEdit"
                      round
                      @click.prevent="salvar(pessoa)"
                      class="contact3-form-btn"
                    >
                      Adicionar Contato
                    </q-btn>
                    <q-btn
                      v-if="isEdit"
                      round
                      @click.prevent="updat(pessoa.documento1)"
                      class="contact3-form-btn"
                    >
                      Atualizar Contato
                    </q-btn>
                  </div>
                </form>
              </div>
            </div>
          </q-page>
        </q-layout>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar';
import Cadastro from '../components/Cadastro.vue';

export default {
  name: 'PageIndex',
  created() {
    let datas = localStorage.getItem('datasApp');
    if (datas) {
      datas = JSON.parse(datas);
      this.pessoas = datas;
    } else this.pessoas = [];
  },
  methods: {
    createPessoa() {
      this.creating = true;
      this.layout = true;
    },
    updatePessoa(pessoa) {
      this.creating = false;
      this.pessoa = pessoa;
      this.isEdit = true;
      this.layout = true;
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
    update(pessoa) {
      this.$router.push('cadastro/' + pessoa.id);
    },
    remove(pessoaId) {
      let datas = localStorage.getItem('datasApp');
      if (!datas) return;

      datas = JSON.parse(datas);

      datas = datas.filter(pessoa => {
        return pessoa.id != pessoaId;
      });

      this.pessoas = datas;

      localStorage.setItem('datasApp', JSON.stringify(datas));
    },
    salvar(pessoa) {
      let datas = localStorage.getItem('datasApp');

      pessoa.id = new Date().getTime();

      if (datas) {
        datas = JSON.parse(datas);
      } else datas = [];

      if (this.creating) {
        //aqui vai fazer a logica para quando for nova pessoa
        datas.push(pessoa);
        this.pessoas = datas;
      } else {
        //codigo para alterar os dados. logica para alterar a pessoa
        //achar o indice no array
        //index do datas
        //subistituir a pessoa pela atualizacao
      }

      localStorage.setItem('datasApp', JSON.stringify(datas));
      this.pessoa = this.novaPessoa();
      this.layout = false;
    }
  },
  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    }
  },
  data() {
    return {
      creating: false,
      isEdit: false,
      columns: [
        {
          name: 'tipoPessoa',
          label: 'Tipo',
          align: 'left',
          field: 'tipoPessoa',
          sortable: true
        },
        {
          name: 'nome',
          align: 'left',
          label: 'Nome',
          field: 'name',
          sortable: true
        },
        {
          name: 'nickName',
          align: 'left',
          label: 'Apelido',
          field: 'nickName',
          sortable: true
        },
        { name: 'email', align: 'center', label: 'E-mail', field: 'email' },
        {
          name: 'telefone1',
          align: 'center',
          label: 'Telefone(1)',
          field: 'telefone1'
        },
        {
          name: 'documento1',
          align: 'center',
          label: 'CPF ou CNPJ',
          field: 'documento1'
        },
        {
          name: 'nascimento',
          align: 'center',
          label: 'Data de Nascimento',
          field: 'nascimento',
          sortable: true
        },

        { name: 'option', align: 'center', label: 'Opções', sortable: false }
      ],
      pessoas: [
        {
          id: '',
          tipoPessoa: '',
          name: '',
          nickName: '',
          email: '',
          documento1: '',
          telefone1: '',
          nascimento: ''
        }
      ],
      pessoa: {
        id: '',
        tipoPessoa: '',
        name: '',
        nickName: '',
        email: '',
        documento1: '',
        telefone1: '',
        nascimento: ''
      },

      layout: false,

      moreContent: true,
      drawer: false,
      drawerR: false
    };
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: Poppins-Regular, sans-serif;
}
.abc {
  height: 100%;
  width: 100%;
}
/*---------------------------------------------*/
a {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
input:-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
input::-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

textarea::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
textarea:-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
textarea::-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
textarea:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Contact 2 ]*/
.bg-contact3 {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.container-contact3 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #2945c4;
}

.wrap-contact3 {
  width: 100%;
  background: #2945c4;
  background: -webkit-linear-gradient(45deg, #2945c4, #636fe0);
  background: -o-linear-gradient(45deg, #2945c4, #636fe0);
  background: -moz-linear-gradient(45deg, #2945c4, #636fe0);
  background: linear-gradient(45deg, #2945c4, #636fe0);
}

/*------------------------------------------------------------------
[  ]*/

.contact3-form {
  width: 50%;
  margin-bottom: 110px;
}

.contact3-form-title {
  font-family: Poppins-Bold;

  color: #fff;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
}

/*------------------------------------------------------------------
[  ]*/

.wrap-input3 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid rgba(255, 255, 255, 0.24);
  margin-bottom: 27px;
}

.input3 {
  display: block;
  width: 100%;
  background: transparent;
  font-family: Poppins-Regular;
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
  padding: 0 5px;
}

.focus-input3 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input3::before {
  content: '';
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #fff;
}

/*---------------------------------------------*/
input.input3 {
  height: 45px;
}

textarea.input3 {
  min-height: 115px;
  padding-top: 13px;
  padding-bottom: 13px;
}

.input3:focus + .focus-input3::before {
  width: 100%;
}

.has-val.input3 + .focus-input3::before {
  width: 100%;
}

/*------------------------------------------------------------------
[  ]*/
.container-contact3-form-btn {
}

.contact3-form-btn {
  font-family: Poppins-Medium;
  margin-left: 10px;
  color: #555555;
  line-height: 1.2;
  text-transform: uppercase;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;

  border-radius: 2px;
  position: relative;
  z-index: 1;
  background: #211994;
  background: #2945c4;
  background: -webkit-linear-gradient(45deg, #2945c4, #636fe0);
  background: -o-linear-gradient(45deg, #2945c4, #636fe0);
  background: -moz-linear-gradient(45deg, #2945c4, #636fe0);
  background: linear-gradient(45deg, #2945c4, #636fe0);

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.contact3-form-btn::before {
  content: '';
  display: block;
  position: absolute;
  z-index: -1;
  border-radius: 2px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  opacity: 1;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.contact3-form-btn:hover {
  color: #fff;
}

.contact3-form-btn:hover:before {
  opacity: 0;
}

/*------------------------------------------------------------------
[ Responsive ]*/

@media (max-width: 576px) {
  .wrap-contact3 {
    padding: 72px 15px 65px 15px;
  }
}

/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 2px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 0px;
  pointer-events: none;

  font-family: Poppins-Regular;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: '\f12a';
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 16px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

/*==================================================================
[ Restyle Radio ]*/
.wrap-contact3-form-radio {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 37px;
}

.input-radio3 {
  display: none;
}

.label-radio3 {
  display: block;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  font-family: Poppins-Medium;
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
}

.label-radio3::before {
  content: '';
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.1);
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}

.label-radio3::after {
  content: '';
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 6px solid transparent;
  background: rgba(255, 255, 255, 0.5);
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  display: none;
}

.input-radio3:checked + .label-radio3::after {
  display: block;
}

/*==================================================================
[ Input3 select ]*/

.input3-select {
  display: none;
}

/*//////////////////////////////////////////////////////////////////
[ Restyle Select2 ]*/

.select2-container {
  display: block;
  max-width: 100% !important;
  width: auto !important;
}

.select2-container .select2-selection--single {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  height: 45px;
  outline: none;
  position: relative;
}

/* in select */
.select2-container .select2-selection--single .select2-selection__rendered {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  padding-left: 5px;
  background-color: transparent;
}

.select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.select2-selection__arrow b {
  display: none;
}

.select2-selection__arrow::before {
  content: '';
  display: block;

  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid #e6e6e6;
  margin-bottom: 2px;
}

.select2-selection__arrow::after {
  content: '';
  display: block;

  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-top: 5px solid #e6e6e6;
}

/* dropdown option */
.select2-container--open .select2-dropdown {
  z-index: 1251;
  border: 1px solid #fff;
  border-radius: 0px;
  background-color: white;
}

.select2-container .select2-results__option[aria-selected] {
  padding-top: 10px;
  padding-bottom: 10px;
}

.select2-container .select2-results__option[aria-selected='true'] {
  background: #80c64a;
  background: -webkit-linear-gradient(45deg, #56ab2f, #a8e063);
  background: -o-linear-gradient(45deg, #56ab2f, #a8e063);
  background: -moz-linear-gradient(45deg, #56ab2f, #a8e063);
  background: linear-gradient(45deg, #56ab2f, #a8e063);
  color: white;
}

.select2-container .select2-results__option--highlighted[aria-selected] {
  background: #80c64a;
  background: -webkit-linear-gradient(45deg, #56ab2f, #a8e063);
  background: -o-linear-gradient(45deg, #56ab2f, #a8e063);
  background: -moz-linear-gradient(45deg, #56ab2f, #a8e063);
  background: linear-gradient(45deg, #56ab2f, #a8e063);
  color: white;
}

.select2-results__options {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #555555;
  line-height: 1.2;
}

.select2-search--dropdown .select2-search__field {
  border: 1px solid #aaa;
  outline: none;
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #555555;
  line-height: 1.2;
}
</style>
