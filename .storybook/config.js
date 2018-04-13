import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

// Import your custom components.
import MfkInput from '../src/components/mfk-input.vue';
import MfkFavorite from '../src/components/mfk-favorite.vue';

// Install Vue plugins.
Vue.use(Vuex);
Vue.use(Vuetify);

// Register custom components.
Vue.component('mfk-input', MfkInput);
Vue.component('mfk-favorite', MfkFavorite);

function loadStories() {
  // You can require as many stories as you need...
  require('../src/stories');
}

configure(loadStories, module);
