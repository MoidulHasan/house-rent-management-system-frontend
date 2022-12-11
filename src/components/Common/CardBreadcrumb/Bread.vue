<template>
  <div class="flex align-items-center">
    <span v-if="!start" class="arrow">
      <i class="pi pi-angle-right" />
    </span>

    <span>
      <a
        :href="breadCrumbItem?.url"
        class="bread-text"
        v-if="breadCrumbItem?.item"
      >
        <span class="icon" v-if="breadCrumbItem?.icon">
          <i :class="breadCrumbItem?.icon" />
        </span>
        <span class="icon">{{ breadCrumbItem?.label }}</span>
      </a>

      <span v-else class="bread-text">
        <span class="icon" v-if="breadCrumbItem?.icon">
          <i :class="breadCrumbItem?.icon" />
        </span>
        <span class="icon">{{ breadCrumbItem?.label }}</span>
      </span>
    </span>

    <span>
      <CommonCardBreadcrumbBread
        v-if="typeof breadCrumbItem?.item !== 'undefined'"
        :start="false"
        :bread-crumb-item="breadCrumbItem?.item"
      />
    </span>
  </div>
</template>

<script setup>
const props = defineProps(["start", "breadCrumbItem"]);
</script>

<style lang="scss" scoped>
.icon {
  height: 27px;
  // color: #aaaaaa;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.icon i {
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
}

.arrow {
  padding-right: 0.875rem;
  padding-left: 0.875rem;
}

.bread-text {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
}
</style>
