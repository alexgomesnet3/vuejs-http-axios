// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import axios from 'axios'

// ABAIXO A DECLARAÇÃO DO AXIOS DE FORMA GLOBAL NA APLICAÇÃO

//axios.defaults.baseURL = 'https://your.url.firebaseio.com/'
//axios.defaults.headers.common['Authorization'] = 'Your_Token_Authorization'
//axios.defaults.headers.get['Accepts'] = 'application/json'


// ABAIXO A DECLARAÇÃO DO AXIOS POR INSTÂNCIA NA APLICAÇÃO
Vue.use({
  install(Vue) {
    //Vue.prototype.$api = axios
    Vue.prototype.$api = axios.create({
      baseURL: 'https://your.url.firebaseio.com/',
      headers: {
        'Accepts':'application/json'
      }
    })
    // INTERCEPTANDO REQUESTS 
    Vue.prototype.$api.interceptors.request.use(config => {
      //console.log('Request Method: ', config.method)
      return config
    }, error => Promise.reject(error))
    // INTERCEPTANDO RESPONSES
    Vue.prototype.$api.interceptors.response.use(res => {
      /* const array = []
      for (let index in res.data) {
        array.push({
          id: index,
          ...res.data[index]
        })
      }
      res.data = array */
      return res
    }, error => Promise.reject(error))
  }
})