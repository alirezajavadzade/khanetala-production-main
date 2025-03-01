import './assets/main.css'
import './assets/font.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import { fa } from 'vuetify/locale';
import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';
import VueApexCharts from 'vue3-apexcharts'





import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  locale: {
    locale: 'fa',
    messages: { fa },
  },
  theme: {
    defaultTheme: 'light',
  },
})



app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(
  VuePersianDatetimePicker, {
  name: 'persian-date-picker',
  props: {
    format: 'YYYY-MM-DD',
    displayFormat: 'jYYYY-jMM-jDD',
    editable: false,
    inputClass: 'form-control my-perian-datepicker',
    placeholder: 'تاریخ تولد',
    altFormat: 'YYYYMMDD',
    color: '#ae8947',
    autoSubmit: true,
  }
}
);
app.use(VueApexCharts)

app.mount('#app')
