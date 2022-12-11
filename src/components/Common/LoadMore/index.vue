<template>
  <div>
    <Button
      :onclick="collapsedButtonClicked"
      v-show="collapsed"
      class="p-button-text"
    >
      <span class="view-more">Load More</span>
      <span
        class="flex align-items-center"
        style="color: #4296ac; margin-left: 1px"
      >
        <i class="pi pi-angle-down" />
      </span>
    </Button>

    <Button
      :onclick="collapsedButtonClicked"
      v-show="collapsed === false"
      class="p-button-text"
    >
      <span class="view-more">View Less</span>
      <span
        class="flex align-items-center"
        style="color: #4296ac; margin-left: 1px"
      >
        <i class="pi pi-angle-up" />
      </span>
    </Button>
  </div>
</template>

<script setup>
const props = defineProps(["collapsed"]);

const emits = defineEmits(["onClick"]);

const collapsedButtonClicked = () => {
  emits("onClick");
};
</script>

<style lang="scss" scoped>
.view-more {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  text-align: center;
  text-decoration-line: underline;

  color: #4296ac;

  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>
