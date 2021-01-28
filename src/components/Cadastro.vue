<template>
  <div>
    <div class="wrapper">
      <form>
        <div class="q-gutter-sm row items-center">
          <q-btn round flat>
            <img
              size="46px"
              src="https://nurap.org.br/wp-content/uploads/2018/08/Logo_Construindo-Futuro_OFICIAL_Esta%CC%81gio-1-300x138.png"
            />
          </q-btn>
        </div>
        <hr class="sep" style="margin-left: 160px;" />

        <div class="group items-center">
          <select name="tipoPessoa" id="tipoPessoa" required="required">
            <option v-model="pessoa.tipoPessoa" value="PF"
              >Pessoa Física</option
            >
            <option v-model="pessoa.tipoPessoa" value="PJ"
              >Pessoa Jurídica</option
            ></select
          ><span class="highlight"></span><span class="bar"></span>
        </div>
        <div class="group">
          <input
            type="text"
            required="required"
            name="name"
            v-model="pessoa.name"
          /><span class="highlight"></span><span class="bar"></span>
          <label>Nome</label>
        </div>
        <div class="group">
          <input
            type="text"
            name="nickName"
            required="required"
            v-model="pessoa.nickName"
          /><span class="highlight"></span><span class="bar"></span>
          <label>Apelido</label>
        </div>
        <div class="group">
          <input
            type="email"
            name="email"
            required="required"
            v-model="pessoa.email"
          /><span class="highlight"></span><span class="bar"></span>
          <label>Email</label>
        </div>

        <div class="group">
          <input
            type="text"
            v-model="pessoa.telefone1"
            name="telefone1"
            required="required"
          /><span class="highlight"></span><span class="bar"></span>
          <label>Telefone</label>
        </div>
        <div class="group">
          <input
            type="text"
            v-model="pessoa.documento1"
            name="documento1"
            required="required"
          /><span class="highlight"></span><span class="bar"></span>
          <label>Documento</label>
        </div>
        <div class="group">
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
</template>

<script>
import Index from '../pages/Index';

export default {
  components: { Index },
  name: 'Cadastro',
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
      }
    };
  },
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
    updat(pessoa) {
      let datas = this.pessoas.map(pessoaMap => {
        if (pessoaMap.documento1 == pessoa.documento1) {
          return pessoa;
        } else {
          return pessoaMap;
        }
      });

      this.pessoas = datas;
      this.isEdit = false;

      localStorage.setItem('datasApp', JSON.stringify(datas));

      this.pessoa = this.novaPessoa();
      this.layout = false;
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
  }
};
</script>

<style lang="stylus" scoped>
*,
:before,
:after {
  box-sizing: border-box;
}

body {
  background: #424242;
}

form {
  width: 320px;
  margin: 45px auto;
}
form h1 {
  font-size: 3em;
  font-weight: 300;
  text-align: center;
  color: #2196F3;
}
form h5 {
  text-align: center;
  text-transform: uppercase;
  color: #c6c6c6;
}
form hr.sep {
  background: #2196F3;
  box-shadow: none;
  border: none;
  height: 2px;
  width: 25%;
  margin: 0px auto 45px auto;
}
form .emoji {
  font-size: 1.2em;
}

.group {
  position: relative;
  margin: 45px 0;
}

textarea {
  resize: none;
}

input,
textarea {
  background: none;
  color: #c6c6c6;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 320px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;
}
input:focus,
textarea:focus {
  outline: none;
}
input:focus ~ label, input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  top: -14px;
  font-size: 12px;
  color: #2196F3;
}
input:focus ~ .bar:before,
textarea:focus ~ .bar:before {
  width: 320px;
}

input[type=password] {
  letter-spacing: 0.3em;
}

label {
  color: #c6c6c6;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
}

.bar {
  position: relative;
  display: block;
  width: 320px;
}
.bar:before {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: #2196F3;
  transition: 300ms ease all;
  left: 0%;
}

.btn {
  background: #fff;
  color: #959595;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.btn:hover {
  color: #8b8b8b;
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
}
.btn.btn-link {
  background: #2196F3;
  color: #d3eafd;
}
.btn.btn-link:hover {
  background: #0d8aee;
  color: #deeffd;
}
.btn.btn-submit {
  background: #2196F3;
  color: #bce0fb;
}
.btn.btn-submit:hover {
  background: #0d8aee;
  color: #deeffd;
}
.btn.btn-cancel {
  background: #eee;
}
.btn.btn-cancel:hover {
  background: #e1e1e1;
  color: #8b8b8b;
}

.btn-box {
  text-align: center;
  margin: 50px 0;
}
</style>
