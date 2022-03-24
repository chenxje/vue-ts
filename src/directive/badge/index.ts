
import { createApp, ref, DirectiveBinding } from "vue";
// import { DirectiveBinding } from "vue/type/options"

const SUCCESS = '#72c140'
const ERROR = '#ed5b56'
const WARNING = '#f0af41'
const INFO = '#4091f7'

import Badge from './Badge.vue'

export default {
    updated(el: HTMLElement, binding: DirectiveBinding) {
        const {
            modifiers,
            value
        } = binding
        const modifiersKey = Object.keys(modifiers)
        const isDot = modifiersKey.includes('dot')
        let backgroundColor = ''
        if (modifiersKey.includes('success')) {
            backgroundColor = SUCCESS
        } else if (modifiersKey.includes('warning')) {
            backgroundColor = WARNING
        } else if (modifiersKey.includes('info')) {
            backgroundColor = INFO
        } else {
            backgroundColor = ERROR
        }
        //创建一个文本节点
        var textNode = document.createElement('div');
        textNode.id = 'badge'
        el.appendChild(textNode)
        const badgeApp = createApp(Badge).mount(textNode)

        const _badgeApp = ref(badgeApp.$data)
        const _obj: any = _badgeApp.value
        _obj.isDot = isDot
        _obj.value = value
        _obj.backgroundColor = backgroundColor
        el.style.position = el.style.position || 'relative'
    }
}
