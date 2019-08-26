import Vue from 'vue'
import Demo from './Demo'

Vue.use(require('../src').default)

Vue.config.productionTip = false

new Vue({
    render: h => h(Demo)
}).$mount('#app')
