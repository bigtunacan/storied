import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

// Storybook supports `addons` for a host of additional functionality.
// In this example, I have included the notes addon, which 
// provides a convenient way to include additional documentation for
// components using Markdown.
//
// Additional addons can be found in the gallery
// https://storybook.js.org/addons/addon-gallery/
//     or
// You can always roll your own!
import { withMarkdownNotes } from '@storybook/addon-notes';

import MfkInput from '../components/mfk-input.vue';

let mfkStore = [
   { alias: "Invalid MFK", mfk: "111-22-3333-12345-44444444-5555-666-77777-88-9999" },
   { alias: "Many 111s",   mfk: "111-11-1111-12345-11111111-5555-666-77777-88-9999" },
   { alias: "No Org",      mfk: "444--6666-12345-11111111-5555-666-77777-88-9999" },
   { alias: "Valid MFK",   mfk: "260-43-5064-40100-00000000-6026-520-20100-00-0000" }
];

// Storybook decorators provide a way to easily wrap
// up a set of stories with the same customization.
//
// For the sake of brevity this decorator has been included inline 
// with the stories, but it could just as easily be extracted out
// to it's own module.
//
// When the decorator is applied to a story, the story template
// will be injected into the <story/> slot.
const VuetifyDecorator = () => (
  {
    template: `<div>
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
      <link href='https://unpkg.com/vuetify/dist/vuetify.min.css' rel="stylesheet">
      <story/>
    </div>`
  }
);

const BootstrapDecorator = () => (
  {
    template: `<div>
      <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
      <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>
      <script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
      <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
      <story/>
    </div>`
  }
);

storiesOf('MfkInput Plain', module)
  .add('Simple inline MFK',withMarkdownNotes(`
    This is the most basic example of an MfkInput, using vue-strap.
  `)(() => ({
    component: { MfkInput },
    data: function() {
      return {
        mfk: "123-22"
      };
    },
    template: `<mfk-input style="display:inline-block" v-model="mfk"></mfk-input>`
  })));

storiesOf('MfkInput Vuetify', module)
  .addDecorator(VuetifyDecorator)
  .add('Simple inline MFK',withMarkdownNotes(`
  This is the most basic example of an MfkInput.
      `)(() => ({
      component: { MfkInput },
      data: function() {
        return {
          mfk: "123-22"
        };
      },
      template: `<mfk-input style="display:inline-block" v-model="mfk"></mfk-input>`
    })))
  .add('MFK with support for favorites', withMarkdownNotes(`
### MFK Favorites

This is a more complex example that makes use of favorites.

Here we bind to an array of "favorite" MFKs that can easily 
be updated through the add & remove method bindings.

~~~html
<mfk-input style="display:inline-block"
           v-model="mfk"
           :favorites="favorites"
           @favorite-mfk-added="add"
           @favorite-mfk-removed="remove">
</mfk-input>
~~~
      `)(() => ({
      component: { MfkInput },
      data: function() {
        return {
          mfk: "123-22",
          favorites: mfkStore,
        };
      },
      methods: {
        add: function(mfk) {
          mfkStore.push(mfk);
        },
        remove: function(mfk) {
          let index = mfkStore.indexOf(mfk);
          if (index > -1){ mfkStore.splice(index, 1); }
        }
      },
      template: `<mfk-input style="display:inline-block" v-model="mfk" :favorites="favorites" @favorite-mfk-added="add" @favorite-mfk-removed="remove"></mfk-input>`
  })));

storiesOf('MfkInput Bootstrap', module)
  .addDecorator(BootstrapDecorator)
  .add('Simple inline MFK',withMarkdownNotes(`
    This is the most basic example of an MfkInput, using vue-strap.
  `)(() => ({
    component: { MfkInput },
    data: function() {
      return {
        mfk: "123-22"
      };
    },
    template: `<mfk-input style="display:inline-block" v-model="mfk"></mfk-input>`
  })));
