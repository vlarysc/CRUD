<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-tabs v-model="tab" class="text-teal">
        <q-tab
          name="cadastro"
          icon="
app_registration"
          label="Dados"
        />
        <q-tab name="endereco" icon="place" label="Endereço" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="cadastro">
          <Pessoa></Pessoa>
        </q-tab-panel>

        <q-tab-panel name="endereco">
          <Enderecos></Enderecos>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import Pessoa from './Pessoa.vue';
import Enderecos from './Enderecos.vue';
export default {
  components: { Enderecos, Pessoa },
  data() {
    return {
      tab: 'cadastro'
    };
  }
};
</script>

<style></style>
