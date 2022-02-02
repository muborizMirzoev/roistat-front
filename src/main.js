import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import App from './App.vue'
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  store,
  beforeCreate () {
    this.$store.commit('initialiseStore')
  }
}).$mount('#app')
