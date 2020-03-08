import Vue from 'vue'
import Loading from './Loading.vue'

const loadingConstructor = Vue.extend(Loading);

let instance = new loadingConstructor({
  el: document.createElement('div')
});

instance.isShow = false;

document.body.appendChild(instance.$el);

const loading = {
  show() {
    instance.display = true;
    setTimeout(() => {
      instance.isShow = true;
    },200);
  },
  hide() {
    instance.display = false;
    setTimeout(() => {
      instance.isShow = false;
    },200);
  }
};

export default loading;