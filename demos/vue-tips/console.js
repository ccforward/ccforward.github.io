Vue.prototype.$log = console.log.bind(console);

// <input @keydown="$log" @keyup="$log" placeholder="input something">