import Vue from 'vue';
import VueBrazil from 'vue-brazil';
import { validateBr } from 'js-brasil';

Vue.prototype.$validateBR = validateBr;

Vue.use(VueBrazil);
