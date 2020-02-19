import './directives.css'

export default {
  bind(el,binding) {
    // el.style.position = 'relative'
    el.className += ' activeElement'
  }
}
