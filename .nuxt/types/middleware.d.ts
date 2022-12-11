import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "guest"
declare module "/home/antukhan/Work/personal-project/house-rent-management-system/frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}