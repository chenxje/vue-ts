import { App } from 'vue'

import focus from "./focus";
import badge from './badge'

const directives = {
    focus,
    badge
}

export default (app: App<Element>) => {
    Object.keys(directives).forEach(name => app.directive(name, directives[name]))
}