function debounce (fn, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      fn.apply(this, arguments)
    }, delay)
  }
}