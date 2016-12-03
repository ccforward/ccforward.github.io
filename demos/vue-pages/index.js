const Vue = require('vue')
const vuePages = require('vue-pages')


new Vue({
  data() {
    return {
      url1: '#',
      url2: '?param=pages',
      pageName:'p',
      total: 27,
      counts: 10,
      current1: 11,
      current2: 5
    }
  },
  methods: {
    fn1(d, e){
      console.log('demo1: ' + d)
      this.current1 = d
    },
    fn2(d, e){
      e.preventDefault()
      console.log('demo2: ' + d)
      this.current2 = d
    }
  },
  components: {
    vuePages
  }
}).$mount('#app')