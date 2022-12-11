<template>
  <div class="flex flex-wrap gap-1">
    <p
      :class="
        backgroundWhite ? 'off-white item max-w-full' : 'white item max-w-full'
      "
      v-for="idx in Math.min(3, values?.length)"
      :key="idx"
    >
      {{ values[idx - 1]?.name }}
    </p>

    <div
      v-show="!collapsed"
      v-for="index in Math.max(values?.length - 3, 3)"
      :key="index"
      :class="
        backgroundWhite ? 'off-white item max-w-full' : 'white item max-w-full'
      "
    >
      {{ values[index + 2]?.name }}
    </div>

    <div class="w-full">
      <CommonLoadMore
        v-if="values?.length > 3"
        :collapsed="collapsed"
        @on-click="collapsed = !collapsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModelTestSubject } from "~~/constants/Types";

// define props
const props = defineProps<{
  values: ModelTestSubject[];
  backgroundWhite: boolean;
}>();

// states
const collapsed = ref(true);
</script>

<style scoped>
.item {
  /* display: flex; */
  /* flex-direction: row; */
  /* align-items: flex-start; */
  padding: 0px 12px;
  /* gap: 10px; */

  /* height: 30px; */
  /* max-width: 193px; */

  border-radius: 4px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  color: #616161;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.white {
  background: #ffffff;
}

.off-white {
  background: #f7f7f7;
}
</style>
