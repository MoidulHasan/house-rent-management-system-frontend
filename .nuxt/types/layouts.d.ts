import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "empty"
declare module "D:/vue/Building/FrontEnd/house-rent-management-system-frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}