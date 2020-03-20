import directive from './directives'
import { directive as clickOutside } from 'v-click-outside-x'

const importDirective = Vue => {
    /**
     * 拖拽指令 v-draggable="options"
     * options = {
     *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
     *  body:    /这里传入需要移动容器的CSS选择器/,
     *  recover: /拖动结束之后是否恢复到原来的位置/
     * }
     */
    Vue.directive('draggable', directive.draggable)
    /**
     * clipboard指令 v-clipboard="options"
     * options = {
     *  value:    /在输入框中使用v-model绑定的值/,
     *  success:  /复制成功后的回调/,
     *  error:    /复制失败后的回调/
     * }
     */
    Vue.directive('clipboard', directive.clipboard)
    /**
     * waves指令 v-waves
     */
    Vue.directive('waves', directive.waves)
    /**
     * active指令 v-active
     */
    Vue.directive('active', directive.active)
    /**
     * load指令 v-load
     */
    Vue.directive('load', directive.load)
    /**
     * repeat指令 v-repeat
     */
    Vue.directive('repeat', directive.repeat)
    /**
     * title指令 v-title
     */
    Vue.directive('title', directive.title)
    /**
     * clickOutside指令 v-clickOutside
     */
    Vue.directive('clickOutside',clickOutside)
}

export default importDirective
