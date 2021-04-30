import Vue from 'vue'
import { consoleWarn } from '../util/console'

// child: string, parent: string
function generateWarning(child, parent) {
  return () => consoleWarn(`The ${child} component must be used inside a ${parent}`)
}

// (namespace: T, child?: string, parent?: string)
export function inject(namespace, child, parent) {
  const defaultImpl =
    child && parent
      ? {
          register: generateWarning(child, parent),
          unregister: generateWarning(child, parent),
        }
      : null

  return Vue.extend({
    name: 'registrable-inject',

    inject: {
      [namespace]: {
        default: defaultImpl,
      },
    },
  })
}

export function provide(namespace, self = false) {
  return Vue.extend({
    name: 'registrable-provide',

    methods: self
      ? {}
      : {
          register: null,
          unregister: null,
        },
    provide() {
      return {
        [namespace]: self
          ? this
          : {
              register: this.register,
              unregister: this.unregister,
            },
      }
    },
  })
}
