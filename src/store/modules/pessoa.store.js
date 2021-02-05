import Router from '../../router/index';

export const namespaced = true;

export const state = {
  pessoas: [],
  pessoa: {
    enderecos: []
  }
};

export const getters = {
  getEnderecos: state => state.pessoa.enderecos,
  getPessoas: state => state.pessoas,
  getPessoa: state => state.pessoa
};

export const mutations = {
  setPessoas: (state, pessoas) => (state.pessoas = pessoas),
  setAddPessoa: (state, pessoa) => state.pessoas.push(pessoa),
  setEnderecos: (state, enderecos) => (state.pessoas = enderecos),
  setAddEnderecos: (state, enderecos) => state.pessoas.enderecos.push(enderecos)
};
//dispatch - executar uma acao
//commit - executar uma mutation
//{commit,dispatch}
export const actions = {
  addPessoa: async ({ commit }, pessoa) => {
    commit('setAddPessoa', pessoa);
    // commit('conveniados/SET_LOGADO', data)
  },
  addPessoas: async ({ commit }, pessoas) => {
    commit('setPessoas', pessoas);
  },
  addEnderecos: async ({ commit }, enderecos) => {
    commit('setAddEnderecos', enderecos);
  }
};
