<template>
  <div class="grid flex align-items-center w-full">
    <div
      :class="
        backgroundWhite
          ? 'off-white flex align-items-center justify-content-center col-12 md:col-6'
          : 'white flex align-items-center justify-content-center col-12 md:col-6'
      "
    >
      <div class="text grid w-full flex align-items-center">
        <div class="col-12 md:col-4">Start Time:</div>
        <div class="col-12 md:col-8" v-if="schedule?.start_at">
          {{ convertTime(schedule?.start_at) }}
        </div>
        <div class="col-12 md:col-8" v-if="!schedule?.start_at">
          Not Applicable
        </div>
      </div>
    </div>

    <div
      class="text-to col-12 md:col-2 md:flex align-items-center justify-content-center hidden"
    >
      To
    </div>

    <div
      :class="
        backgroundWhite
          ? 'off-white flex align-items-center justify-content-center col-12 md:col-5 mt-2 md:mt-0 md:ml-2'
          : 'white flex align-items-center justify-content-center col-12 md:col-5 mt-2 md:mt-0 md:ml-2'
      "
    >
      <div class="text grid w-full flex align-items-center">
        <div class="col-12 md:col-4">End Time:</div>
        <div class="col-12 md:col-8" v-if="schedule?.end_at">
          {{ convertTime(schedule?.end_at) }}
        </div>
        <div class="col-12 md:col-8" v-if="!schedule?.end_at">
          Not Applicable
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModelTestSchedule } from "~~/constants/Types";
import { convertTime } from "~~/src/helpers/utils";

// props
const props = defineProps<{
  schedule: ModelTestSchedule;
  backgroundWhite: boolean;
}>();
</script>

<style lang="scss" scoped>
.white {
  max-width: 351px;
  min-height: 38px;

  background: #ffffff;
  border-radius: 4px;
}

.off-white {
  max-width: 351px;
  min-height: 38px;

  background: #f7f7f7;
  border-radius: 4px;
}

.text {
  min-height: 27px;
  max-width: 351px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 27px;
  /* identical to box height */

  color: #616161;
}

.text-to {
  width: 19px;
  height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  color: #616161;

  margin-left: 12px;
  margin-right: 12px;
}
</style>
