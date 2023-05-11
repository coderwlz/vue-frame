import { computed, reactive } from 'vue'

function getConfig() {
  let configObj = window.GLOBAL_CONFIG_SETTING
  let config = reactive({})
  for (let key in configObj) {
    config[key] = computed(() => {
      return configObj[key]
    })
  }
  return config
}

export default {
  install: (app) => {
    app.config.globalProperties.config = getConfig()
  }
}
