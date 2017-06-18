new Vue({
  el: '#app',
  data: {
    input: '2**10 + 10'
  },
  computed: {
   exp () {
     var type = /[^\d*\/+\(\)-]/g
     var pow = /(\d+)\*\*(\d+)/g
     return this.input.replace(type, ' ').replace(pow, 'Math.pow($1, $2)')
   },

   result () {
     try {
       return eval(this.exp)
     } catch (e) {
       return e.message
     }
   }
  }
})


// <div id="app">
//   <h2></h2>
//   <input v-model="input">
//   <p>{{exp}} = {{result}}</p>
// </div>