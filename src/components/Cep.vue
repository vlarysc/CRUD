<template>
  <div></div>
</template>

<script>
export default {
  created: function() {
    axios.get(this.cep).then(res => {
      this.cep = resultado.cep;
      this.logradouro = resultado.logradouro;
      this.bairro = resultado.bairro;
      this.localidade = resultado.cidade;
      this.uf = resultado.uf;
    });
  }
};
</script>

<style></style>
