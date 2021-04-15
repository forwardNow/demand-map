import Vue from 'vue';

import Render from './Render.vue';

const vueIns = new Vue({
    el: '#app',

    data: {
        position: 'world'
    },

    render(h) {
        return h(Render, {
            on: {
              close: () => {
                  console.log('close');
              }
            },

            props: {
                position: this.position,
            }
        });
    },
});

window.vueIns = vueIns;

window.addEventListener('mouseup', (event) => {

}, false);