const Vue = require('vue')
const vuePages = require('vue-pages')


new Vue({
  data() {
    return {
      url1: '#',
      url2: '?param=pages',
      pageParam:'page',
      total: 27,
      counts: 10,
      current1: 11,
      current2: 5
    }
  },
  methods: {
    fn1(d, e){
      this.current1 = d
    },
    fn2(d, e){
      e.preventDefault()
      this.current2 = d
    }
  },
  components: {
    vuePages
  }
}).$mount('#app')