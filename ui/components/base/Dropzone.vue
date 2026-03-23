<template>
  <div class="row mb-2" v-if="preview && files.length">
    <div
      class="col-3 preview"
      v-for="(fl, index) in files"
      :key="`image-preview-${index}`"
    >
      <span
        class="icon_trash_alt position-absolute"
        @click="removeFile(fl.file)"
      ></span>
      <img width="100" :src="fl.preview" />
    </div>
  </div>

  <div
    class="upload"
    v-bind="getRootProps()"
    :style="{
      borderColor: borderColor,
    }"
  >
    <input v-bind="getInputProps()" :multiple="multiple" />

    <h5 class="text-muted">Drop files here or click to upload</h5>
    <span class="text-muted">
      (Supported files:
      {{
        allowedTypes
          .map((type) => type.replace(".", ""))
          .join(", ")
          .toUpperCase()
      }})
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDropzone } from "vue3-dropzone";
import { generatePreview } from "~/composables/global";

export default defineComponent({
  setup(props, { emit }) {
    const { allowedTypes, multiple, preview, maxSize } = props;
    const { $toast } = useNuxtApp();

    const files: any = ref([]);

    const onDrop = async (acceptFiles: any, rejectReasons: any) => {
      if (rejectReasons && rejectReasons.length > 0) {
        for (const r of rejectReasons) {
          for (const e of r.errors) {
            if (e.code == "file-too-large") {
              const size = formatBytes(maxSize);
              $toast.error(`Please, upload a file smaller than ${size}`);
            } else {
              $toast.error(e.message);
            }
          }
        }
      } else {
        if (multiple) {
          if (preview) {
            for (const f of acceptFiles) {
              const result = await generatePreview(f);
              files.value.push({ file: f, preview: result });
            }
          }
          emit("on-selected", acceptFiles);
        } else {
          if (preview) {
            const f = acceptFiles[0];
            const result = await generatePreview(f);
            files.value = [{ file: f, preview: result }];
          }
          emit("on-selected", acceptFiles[0]);
        }
      }
    };

    const removeFile = (file: any) => {
      files.value = files.value.filter((f: any) => f.file != file);
      emit("on-removed", file);
    };

    const { getRootProps, getInputProps, ...rest } = useDropzone({
      onDrop,
      maxSize,
      accept: allowedTypes,
    });

    return {
      files,
      removeFile,
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
  props: {
    allowedTypes: {
      type: Array<string>,
      default: () => ["*"],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    isInValid: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 1048576,
    },
  },
  emits: ["on-selected", "on-removed"], // <--- add this line
  computed: {
    borderColor() {
      if (this.isValid) {
        return "#28a745";
      } else if (this.isInValid) {
        return "#dc3545";
      } else {
        return "#efefef";
      }
    },
  },
});
</script>

<style scoped>
.upload {
  padding: 16px;
  border: 2px dashed #efefef;
  border-radius: 0.357rem;
  cursor: pointer;
}

.icon_trash_alt {
  position: absolute;
  top: 0;
  right: 35px;
  cursor: pointer;
}
</style>
