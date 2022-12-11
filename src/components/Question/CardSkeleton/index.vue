<template>
  <div
    :class="
      'question-card background-' +
      (props.Index % 2) +
      ' border-radious-' +
      questionPosition(props.Index, props.Length)
    "
  >
    <div class="grid justify-contents-between align-items-center">
      <div class="skeleton-header col-11 md:col-6">
        <Skeleton class=""></Skeleton>
        <Skeleton class="ml-2"></Skeleton>
      </div>

      <div class="skeleton-header col-1 md:col-6 flex justify-content-end">
        <Skeleton class="w-2rem h-2rem hidden md:block"></Skeleton>
        <Skeleton class="w-2rem h-2rem m-1 hidden md:block"></Skeleton>
        <Skeleton class="w-2rem h-2rem m-1 hidden md:block"></Skeleton>
        <Skeleton class="w-2rem h-2rem m-1 block md:hidden"></Skeleton>
      </div>
    </div>

    <div class="p-0 m-0">
      <Skeleton class="w-1 mb-2"></Skeleton>

      <div class="">
        <Skeleton></Skeleton>
      </div>

      <Button class="p-button-text">
        <Skeleton></Skeleton>
      </Button>

      <div class="grid">
        <div class="col-6 flex flex-row align-items-center">
          <Skeleton></Skeleton>
        </div>

        <div class="col-6 flex flex-row align-items-center">
          <Skeleton></Skeleton>
        </div>

        <div class="col-6 flex flex-row align-items-center">
          <Skeleton></Skeleton>
        </div>

        <div class="col-6 flex flex-row align-items-center">
          <Skeleton></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["Length", "Index"]);

// Methods
const questionPosition = (index, length) => {
  if (index === 0) {
    return "first";
  } else if (index === length - 1) {
    return "last";
  } else {
    return "middle";
  }
};
</script>

<style scoped>
.question-card {
  min-height: 173px;
  padding: 32px;
}

.background-1 {
  background: #fafafe;
}

.background-0 {
  background: #ffffff;
}

.border-radious-first {
  border-radius: 12px 12px 0px 0px;
}

.border-radious-middle {
  border-radius: 0px;
}

.border-radious-last {
  border-radius: 0px 0px 12px 12px;
}

.skeleton-header {
  display: flex;
  align-items: center;
  align-content: flex-end;
  padding: 0px;
}
</style>
