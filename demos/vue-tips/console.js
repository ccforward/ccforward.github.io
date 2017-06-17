Vue.prototype.$log = console.log.bind(console);
new Vue({el: '#app'})

// <input @keydown="$log" @keyup="$log" placeholder="input something">