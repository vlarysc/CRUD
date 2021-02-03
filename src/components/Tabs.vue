<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs v-model="tab" class="text-teal">
        <q-tab
          name="mails"
          icon="
app_registration"
          label="Cadastro"
        />
        <q-btn flat to="/enderecos" class="q-ml-xs">
          <q-tab name="alarms" icon="place" label="Endereço" />
        </q-btn>
      </q-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 'mails'
    };
  }
};
</script>

<style></style>
