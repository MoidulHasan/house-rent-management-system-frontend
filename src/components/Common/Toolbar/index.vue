<template>
  <div class="toolbar">
    <div class="title-container">
      <span class="page-title">{{ title }}</span>
    </div>

    <div>
      <span v-show="searchQuestion" class="p-input-icon-right">
        <InputText
          @keyup="searchTextChangeHandler"
          type="text"
          v-model="searchInput"
          placeholder="Search"
        />
      </span>

      <Button
        v-show="!searchQuestion"
        @click="searchButtonClicked"
        label=""
        icon="pi pi-search"
        class="p-button-text"
      />

      <Button
        v-show="searchQuestion"
        @click="searchButtonClicked"
        label=""
        icon="pi pi-times"
        class="p-button-text"
      />

      <Button label="" icon="pi pi-filter" class="p-button-text" />
      <NuxtLink :to="createPageUrl">
        <Button
          :label="addButtonLabel"
          icon="pi pi-plus-circle"
          class="p-button hidden md:inline"
        />
      </NuxtLink>

      <Button label="" icon="pi pi-plus-circle" class="p-button md:hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
// props
const props = defineProps<{
  title: string;
  addButtonLabel: string;
  createPageUrl: string;
}>();

// events
const emits = defineEmits<{
  (e: "filterTextChange", filterText: string): void;
}>();

// States
const searchQuestion = ref(false);
const searchInput = ref("");

// methods
const searchTextChangeHandler = () => {
  emits("filterTextChange", searchInput.value);
};

const searchButtonClicked = () => {
  searchQuestion.value = !searchQuestion.value;
  searchInput.value = "";
  emits("filterTextChange", searchInput.value);
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-radius: 6px;
  height: 52px;
  padding-left: 24px;
  padding-right: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
  margin: 0;
}

.title-container {
  align-content: middle;
  margin: 0;
  padding: 0;
}

.page-title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #3e3e3e;
  margin: 0;
  padding: 0;
}
</style>
