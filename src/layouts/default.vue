<template>
  <div :class="containerClass" @click="onWrapperClick">
    <ClientOnly>
      <ConfirmDialog />
      <Toast />
    </ClientOnly>
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <AppTopBar @menu-toggle="onMenuToggle" />

      <div class="layout-main">
        <slot />
      </div>
      <AppFooter />
    </div>

    <!-- <AppConfig :layout-mode="layoutMode" @layout-change="onLayoutChange" /> -->
    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import AppTopBar from "~/components/layouts/default/AppTopbar.vue";
import AppMenu from "~/components/layouts/default/AppMenu.vue";
import AppConfig from "~/components/layouts/default/AppConfig.vue";
import AppFooter from "~/components/layouts/default/AppFooter.vue";

const layoutMode = ref("static");
const staticMenuInactive = ref(false);
const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const menu = useMenus();
const menuClick = ref(false);

// methods
onMounted(() => {
  window.onpopstate = function () {
    location.reload();
  };
});

const containerClass = computed(() => {
  return [
    "layout-wrapper",
    {
      "layout-overlay": layoutMode.value === "overlay",
      "layout-static": layoutMode.value === "static",
      "layout-static-sidebar-inactive":
        staticMenuInactive.value && layoutMode.value === "static",
      "layout-overlay-sidebar-active":
        overlayMenuActive.value && layoutMode.value === "overlay",
      "layout-mobile-sidebar-active": mobileMenuActive.value,
    },
  ];
});

onBeforeMount(() => {
  if (mobileMenuActive.value) {
    addClass(document.body, "body-overflow-hidden");
  } else {
    removeClass(document.body, "body-overflow-hidden");
  }
});

const onWrapperClick = () => {
  if (!menuClick.value) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }

  menuClick.value = false;
};

const onMenuToggle = () => {
  menuClick.value = true;

  if (isDesktop()) {
    if (layoutMode.value === "overlay") {
      if (mobileMenuActive.value === true) {
        overlayMenuActive.value = true;
      }

      overlayMenuActive.value = !overlayMenuActive.value;
      mobileMenuActive.value = false;
    } else if (layoutMode.value === "static") {
      staticMenuInactive.value = !staticMenuInactive.value;
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value;
  }

  event.preventDefault();
};

const onSidebarClick = () => {
  menuClick.value = true;
};

const onMenuItemClick = (event) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }
};

const onLayoutChange = (layoutMode) => {
  layoutMode.value = layoutMode;
};

const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
};

const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(
      new RegExp(`(^|\\b)${className.split(" ").join("|")}(\\b|$)`, "gi"),
      " "
    );
  }
};

const isDesktop = () => {
  return window.innerWidth >= 992;
};

const isSidebarVisible = () => {
  if (isDesktop()) {
    if (layoutMode.value === "static") {
      return !staticMenuInactive.value;
    } else if (layoutMode.value === "overlay") {
      return overlayMenuActive.value;
    }
  }

  return true;
};
</script>

<style lang="scss">
@import "~/assets/styles/App.scss";
</style>
