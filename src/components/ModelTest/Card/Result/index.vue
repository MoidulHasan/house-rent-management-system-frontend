<template>
  <div class="result-time flex align-items-center">
    <span class="icon">
      <img
        width="24"
        height="24"
        :src="'/images/icons/alert.svg'"
        alt=""
        srcset=""
      />
    </span>

    <div>
      <span class="label">Result Published At :</span>
      <span class="time"> {{ convertTime(value) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertTime } from "~~/src/helpers/utils";

// props
const props = defineProps<{
  value: string;
}>();
</script>

<style lang="scss" scoped>
.result-time {
  max-width: 745px;
  min-height: 38px;

  background: rgba(245, 132, 0, 0.08);
  border-radius: 4px;
  padding-top: 7px;
  padding-bottom: 7px;
}

.icon {
  padding-left: 12px;
  padding-right: 12px;
}

.label {
  max-width: 182px;
  min-height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  color: #616161;
}
.time {
  max-width: 200px;
  min-height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  color: #616161;
}
</style>
