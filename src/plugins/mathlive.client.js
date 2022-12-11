import Mathfield from "mathlive/dist/vue-mathlive.mjs";
import * as Mathlive from "mathlive";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Mathlive, Mathfield);
});
