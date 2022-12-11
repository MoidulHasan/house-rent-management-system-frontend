<template>
  <div v-if="imageShow">
    <label v-if="image === null" class="drop-container">
      <span class="drop-title"> {{ props.title }} </span>
      <input type="file" @change="imageChanged" accept="image/*" />
    </label>

    <div v-else-if="image !== null" class="image-preview">
      <Image :src="image.data" height="25" preview />

      <Button
        :onclick="deleteImage"
        icon="pi pi-times"
        class="p-button-rounded p-button-danger p-button-text"
      />
    </div>
    <p v-if="submitForm && required && !imageFile" class="text-red-500">
      Image is required
    </p>
  </div>
</template>

<script lang="ts" setup>
const image = ref(null);
const imageFile = ref(null);
const imageShow = ref(true);

const props = defineProps<{
  value?: object;
  title: string;
  required?: boolean;
  submitForm?: boolean;
  imageType?: string;
}>();

const emits = defineEmits(["imageChange"]);

// methods
const urlReader = async (file) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      return resolve({
        data: fileReader.result,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    };

    fileReader.readAsDataURL(file);
  });
};

const imageChanged = async (event) => {
  imageShow.value = false;

  image.value = await urlReader(event.target.files[0]);
  imageFile.value = event.target.files[0];

  await nextTick();

  imageShow.value = true;

  if (props.imageType === "option") {
    emits("imageChange", imageFile.value);
  }
};

const deleteImage = () => {
  image.value = null;
  imageFile.value = null;
  emits("imageChange", image.value);
};

onMounted(async () => {
  if (props.value) {
    image.value = await urlReader(props.value);
    imageFile.value = props.value;
  }
});

onUpdated(async () => {
  if (props.value && !image.value) {
    image.value = await urlReader(props.value);
  }

  if (props.submitForm === true) {
    emits("imageChange", imageFile.value);
  }
});
</script>

<style lang="scss" scoped>
.drop-container {
  position: relative;
  display: flex;
  gap: 1px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  border: 0.1px dashed #555;
  color: #444;
  cursor: pointer;
  transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
}

.drop-container:hover {
  background: #eee;
  border-color: #111;
}

.drop-container:hover .drop-title {
  color: #222;
}

.drop-title {
  color: #444;
  font-size: 15px;
  text-align: center;
  transition: color 0.2s ease-in-out;
}

.image-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.small {
  height: 10px;
}
</style>
