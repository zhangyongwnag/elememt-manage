import './directives.css'

export default function (el,binding,vNode){
  if (binding.value) {
    let div = document.createElement('div')
    div.className = 'common_loading_box_wrap'
    el.style.position = 'relative'
    div.innerHTML = '<div id="loading_box_common"><div class="loader-inner ball-pulse"> <div></div><div></div><div></div></div></div>'
    let node = document.getElementsByClassName('common_loading_box_wrap')
    !node.length ? el.appendChild(div) : ''
  } else{
    if (document.getElementsByClassName('common_loading_box_wrap').length) {
      let node = document.getElementsByClassName('common_loading_box_wrap')
      el.removeChild(node[0])
    }
  }
}
