<script setup>
import { ref, computed } from "vue";
import Compressor from "compressorjs";

import { uploadPicture } from "../../api/dish";
import { baseUrl } from "../../status/data";

const props = defineProps(["pictureUrl"]);

const emit = defineEmits(["update:pictureUrl"]);

const pictureUrl = ref("");

pictureUrl.value = props.pictureUrl;
const picture = computed(() => {
  return baseUrl + pictureUrl.value;
});

const pictureUpload = async (a) => {
  let file = null
  console.log(a.file)
  let pictureSize = a.file.size / 1048576; //MB
  if (pictureSize > 2) {
    await ElMessageBox.confirm("图片大小过大，不得超过2M。", "无法上传", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  }
  new Compressor(a.file, {
    convertSize: 1000000,
    convertTypes: ["image/png", "image/webp"],
    success(result) {
      file = result
    },
    error(err) {
      ElMessageBox.confirm("图片压缩失败。", "上传失败", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
    },
  })
  await new Promise((resolve, reject) => {
    setInterval(() => {
      if (file !== null){
        resolve()
      }
    }, 10);
  })
  let res = ""
  console.log(file)
  await uploadPicture(file)
    .then((k) => {
      res = k;
    })
    .catch((err) => {
      console.error(err);
      return;
    });

  if (pictureUrl.value) {
    await ElMessageBox.confirm(
      "是否重新上传图片？重新上传将覆盖已有图片。",
      "重新上传确认",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        pictureDelete();
        emit("update:pictureUrl", res);
        pictureUrl.value = res;
      })
      .catch(() => {
        return;
      });
  } else {
    emit("update:pictureUrl", res);
    pictureUrl.value = res;
  }
};

const pictureDelete = async () => {
  emit("update:pictureUrl", "");
  pictureUrl.value = "";
};

const removeCheck = () => {
  return ElMessageBox.confirm("是否删除该图片？", "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      pictureDelete();
    })
    .catch(() => {
      console.warn("取消删除");
    });
};
</script>

<template>
  <div class="upload">
    <el-upload
      action="#"
      :before-remove="removeCheck"
      :http-request="pictureUpload"
      :show-file-list="false"
      ref="upload"
    >
      <template #trigger>
        <el-button type="primary">上传</el-button>
      </template>
    </el-upload>
    <el-card class="card" shadow v-if="pictureUrl">
      <div style="display: grid" h="100%">
        <div style="margin: 1rem" flex items-center>
          <el-image
            :src="picture"
            style="height: 15vh"
            :fit="cantain"
            :preview-src-list="[picture]"
          />
          <div flex flex-col v-if="pictureUrl">
            <span grow style="margin-left: 1rem"
              >点击图片可预览大图，点击右上角可删除图片。</span
            >
          </div>
        </div>
        <div v-if="pictureUrl" class="pictureRemoveDiv" @click="removeCheck">
          X
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.upload:deep(.el-card__body) {
  padding: 0;
}

.pictureRemoveDiv {
  position: absolute;
  top: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  color: black;
  z-index: 3;
  transition: opacity 0.3s;
  display: none;
  justify-content: center;
  align-items: center;
}

.card {
  height: 20vh;
  margin: 1.5vw;
  width: 35vw;
  position: relative;
}

.card:hover .pictureRemoveDiv {
  display: flex;
}
</style>
