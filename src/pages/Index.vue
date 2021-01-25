<template>
  <div class="q-pa-md">
    <q-btn
      :loading="loading3"
      :percentage="percentage3"
      dark-percentage
      unelevated
      color="orange"
      text-color="grey-9"
      @click="startComputing(3)"
      icon="cloud_upload"
      style="width: 100px; margin: 10px;"
    />
    <q-table title="Treats" :data="data" :columns="columns" row-key="name">
      <template v-slot:header-selection="scope">
        <q-toggle v-model="scope.selected" />
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              round
              color="yellow-14"
              @click="clicou(props.row)"
              icon="create"
            />
            <q-btn
              round
              color="red"
              @click="clicou(props.row)"
              text-color="white"
              icon="delete_forever"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    clicou(props) {
      this.$q.notify({
        type: 'positive',
        message: `Clicou em ${props.name}`
      });
    }
  },
  data() {
    return {
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
          label: 'Sobrenome',
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
      data: [
        {
          tipoPessoa: 'PF',
          name: 'Manoel',
          nickName: 'Neto',
          email: 'manoelneto@gmail.com',
          documento1: 28009246588,
          telefone1: 54996901309,
          nascimento: 11071994
        }
      ],
      loading1: false,
      percentage1: 0,

      loading2: false,
      percentage2: 0,

      loading3: false,
      percentage3: 0
    };
  },
  methods: {
    startComputing(id) {
      this[`loading${id}`] = true;
      this[`percentage${id}`] = 0;
      this[`interval${id}`] = setInterval(() => {
        this[`percentage${id}`] += Math.floor(Math.random() * 8 + 10);
        if (this[`percentage${id}`] >= 100) {
          clearInterval(this[`interval${id}`]);
          this[`loading${id}`] = false;
        }
      }, 700);
    }
  },

  beforeDestroy() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }
};
</script>
