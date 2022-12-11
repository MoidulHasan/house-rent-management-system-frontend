<template>
  <div>
    <div class="relative">
      <div
        class="absolute my-3"
        style="top: -25px; right: 0px; transform: rotate(0deg)"
      >
        <Badge
          v-if="status === 'Scheduled'"
          value="Scheduled Live"
          severity="success"
          class="text-white"
        />
        <Badge
          v-if="status === 'Expiered'"
          value="Expiered"
          severity="danger"
          class="text-white"
        />
        <Badge
          v-if="status === 'Non Live'"
          value="Non Live"
          severity="info"
          class="text-white"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModelTestSchedule } from "~~/constants/Types";

const props = defineProps<{
  schedule: ModelTestSchedule;
}>();

const status = computed(() => {
  const currentTime = Date.now();
  const startTime = Date.parse(props.schedule?.start_at);
  const endTime = Date.parse(props.schedule?.end_at);

  if (startTime > currentTime && startTime !== NaN && endTime !== NaN)
    return "Scheduled";
  else if (endTime < currentTime && startTime !== NaN && endTime !== NaN)
    return "Expiered";
  else return "Non Live";
});
</script>

<style scoped></style>
