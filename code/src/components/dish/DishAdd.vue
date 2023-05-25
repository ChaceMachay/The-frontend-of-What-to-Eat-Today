<script setup>
import { ref, computed, watch } from "vue";

import {
  addDishWindowStatus,
  checkPriceByBlur,
  checkPriceByInput,
  windowsList,
} from "../../status/data.js";
import { convertToChinaNum } from "../../api/etc.js";

import DishUpload from "./DishUpload.vue";
import { addDish, initialdishManangeInformation } from "../../api/dish";

const labelList = ref([
  { labelName: "汤类", labelClass: "green" },
  { labelName: "辣", labelClass: "red" },
  { labelName: "+", labelClass: "yellow" },
]);

const userDishAddInput = ref({
  dish_name: "待定",
  muslim: false,
  windows_id: "110101",
  level: 1,
  price: "0",
  picture: "/static/1683350245.2072906.jpg",
  sparePicture: "",
  date: {
    morning: false,
    noon: false,
    night: false,
  },
});

const canteenList = computed(() => {
  let i = 0;
  return windowsList.value.map((a) => {
    return {
      value: i++,
      label: a.canteen_name,
    };
  });
});

const canteenIndex = ref(0);
const levelIndex = ref(0);

userDishAddInput.value.windows_id =
  windowsList.value[0].levels_information[0].windows_information[0].window_id;
let canteenIndexSrc = windowsList.value.findIndex(
  (a) => a.canteen_id === userDishAddInput.value.windows_id.slice(0, 2)
);
let levelIndexSrc = 0
userDishAddInput.value.level = windowsList.value[0].levels_information[0].level
canteenIndex.value = canteenIndexSrc;
levelIndex.value = levelIndexSrc;

const levelList = computed(() => {
  let i = 0;
  return windowsList.value[canteenIndex.value].levels_information.map((a) => {
    return {
      value: i++,
      label: convertToChinaNum(a.level) + "层",
    };
  });
});
const windowList = computed(() => {
  console.log(
    levelIndex.value,
    windowsList.value[canteenIndex.value].levels_information[levelIndex.value]
  );
  return windowsList.value[canteenIndex.value].levels_information[
    levelIndex.value
  ].windows_information.map((a) => {
    return {
      value: a.window_id,
      label: a.window + "号窗口",
    };
  });
});

watch(windowList, (newVal) => {
  userDishAddInput.value.windows_id = newVal[0].value;
});
watch(userDishAddInput.value.windows_id, (newVal) => {
  if (newVal.slice(1, 2) * 1 !== canteenIndex.value) {
    levelIndex.value = 0;
  } else if (newVal.slice(1, 2) * 1 === canteenIndex.value) {
    console.log(newVal.slice(1, 2) * 1);
  }
});

const finalSet = () => {
  userDishAddInput.value.price *= 1;
  userDishAddInput.value["name"] = userDishAddInput.value.dish_name;
  delete userDishAddInput.value.dish_name;
  userDishAddInput.value["photos"] = userDishAddInput.value.picture;
  delete userDishAddInput.value.picture;
  userDishAddInput.value["spare_photos"] = userDishAddInput.value.sparePicture;
  delete userDishAddInput.value.sparePicture;
  userDishAddInput.value["morning"] = userDishAddInput.value.date.morning;
  userDishAddInput.value["noon"] = userDishAddInput.value.date.noon;
  userDishAddInput.value["night"] = userDishAddInput.value.date.night;
  delete userDishAddInput.value.date;
  userDishAddInput.value["canteen_id"] =
    userDishAddInput.value.windows_id.slice(0, 2);
  userDishAddInput.value["level"] =
    userDishAddInput.value.windows_id.slice(2, 4)[0] === "0"
      ? userDishAddInput.value.windows_id.slice(2, 4)[1] * 1
      : userDishAddInput.value.windows_id.slice(2, 4)[0] * -1;
  userDishAddInput.value["window"] =
    userDishAddInput.value.windows_id.slice(4, 6) * 1;
  delete userDishAddInput.value.windows_id;
};

const userPrimaryDishAdd = async () => {
  ElMessageBox.confirm("是否确认添加菜品信息？", "添加确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      if (!checkStatus.value) {
        await ElMessageBox.confirm("菜品名称不能为空！", "添加失败", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).catch((i) => {
          console.warn(i);
        });
        checkWarnAdd();
        return;
      }
      const loading = ElLoading.service({
        fullscreen: true,
        text: "正在提交数据",
      });
      finalSet();
      await addDish(userDishAddInput.value)
        .then(async (res) => {
          if (res.status !== 201) {
            loading.close();
            await ElMessageBox.confirm("添加菜品失败！", "添加失败", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).catch((i) => {
              console.warn(i);
            });
            console.warn(res);
            addDishWindowStatus.value = false;
          } else {
            loading.close();
            await ElMessageBox.confirm("添加菜品成功！", "添加成功", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).catch((i) => {
              console.warn(i);
            });
            addDishWindowStatus.value = false;
          }
        })
        .catch(async (err) => {
          loading.close();
          console.warn(err);
          await ElMessageBox.confirm("添加菜品失败！", "添加失败", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).catch((i) => {
            console.warn(i);
          });
          addDishWindowStatus.value = false;
        })
        .finally(() => {
          initialdishManangeInformation();
        });
    })
    .catch((i) => {
      console.warn(i);
      return;
    });
};

const userCloseDishAddWindow = () => {
  ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      addDishWindowStatus.value = false;
    })
    .catch(() => {
      return;
    });
};

const checkStatus = ref(true);
function checkWarnAdd() {
  checkStatus.value = false;
  let i = document.getElementById("nameJS");
  i.classList.add("name");
}
function checkWarnRemove() {
  checkStatus.value = true;
  let i = document.getElementById("nameJS");
  i.classList.remove("name");
}

function inputNesCheck(e) {
  let value = e.target.value;
  if (value === "") {
    checkWarnAdd();
  } else {
    checkWarnRemove();
  }
}

const userLastInput = ref(["0"]);

function inputPriceNumCheck() {
  if (checkPriceByBlur.test(userDishAddInput.value.price)) {
    userDishAddInput.value.price =
      userDishAddInput.value.price === "" ? 0 : userDishAddInput.value.price;

    userLastInput.value[0] = userDishAddInput.value.price;
  } else if (!checkPriceByBlur.test(userDishAddInput.value.price)) {
    userDishAddInput.value.price = userLastInput.value[0];
  }
}

const userInputPriceCheck = () => {
  if (checkPriceByInput.test(userDishAddInput.value.price)) {
    if (checkPriceByBlur.test(userDishAddInput.value.price)) {
      userLastInput.value[0] = userDishAddInput.value.price;
    }
  } else if (!checkPriceByInput.test(userDishAddInput.value.price)) {
    userDishAddInput.value.price = userLastInput.value[0];
  }
};
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="addDishWindowStatus"
      :show-close="false"
      align-center
      :close-on-click-modal="false"
      append-to-body
    >
      <template #header>
        <div flex items-center h="full" bg-yellow-5>
          <span c-white m-3>添加菜品信息</span>
        </div>
      </template>
      <el-container>
        <el-main style="overflow-x: hidden">
          <div m-5 flex flex-row style="width: 100%">
            <div grow id="nameJS">
              <span>名称：</span
              ><el-input
                style="width: 10rem"
                @focus="checkWarnRemove"
                @blur="inputNesCheck"
                v-model="userDishAddInput.dish_name"
              />
            </div>
            <div grow flex flex-row>
              <span mt-1.3>时间：</span>
              <el-checkbox
                v-model="userDishAddInput.date.morning"
                label="早"
              ></el-checkbox>
              <el-checkbox
                v-model="userDishAddInput.date.noon"
                label="中"
              ></el-checkbox>
              <el-checkbox
                v-model="userDishAddInput.date.night"
                label="晚"
              ></el-checkbox>
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow>
              <span>餐厅：</span>
              <el-select v-model="canteenIndex" style="width: 10rem">
                <el-option
                  v-for="item in canteenList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div grow>
              <span>楼层：</span>
              <el-select v-model="levelIndex" style="width: 10rem">
                <el-option
                  v-for="item in levelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div grow>
              <span>窗口号：</span>
              <el-select
                v-model="userDishAddInput.windows_id"
                style="width: 10rem"
              >
                <el-option
                  v-for="item in windowList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow>
              <span>清真：</span
              ><el-checkbox v-model="userDishAddInput.muslim"></el-checkbox>
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow flex flex-row>
              <span>价格：</span>
              <div>
                <el-input
                  @blur="inputPriceNumCheck"
                  @input="userInputPriceCheck"
                  v-model="userDishAddInput.price"
                  maxlength="300"
                />
              </div>
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow flex flex-row>
              <span>标签：</span>
              <div
                c-white
                rd
                m-1
                v-for="item in labelList"
                :class="item.labelClass"
              >
                <span class="label-text">{{ item.labelName }}</span>
              </div>
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow flex flex-row>
              <span>展示图片：</span>
              <DishUpload
                :picture-url="userDishAddInput.picture"
                @update:picture-url="(i) => (userDishAddInput.picture = i)"
              />
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow flex flex-row>
              <span>备用图片：</span>
              <DishUpload
                :picture-url="userDishAddInput.sparePicture"
                @update:picture-url="(i) => (userDishAddInput.sparePicture = i)"
              />
            </div>
          </div>
          <div>
            <div flex-row w="full">
              <div grow></div>
              <div grow>
                <el-button
                  bg-yellow-5
                  style="
                    color: white;
                    position: relative;
                    left: 2rem;
                    bottom: 0.5rem;
                  "
                  @click="userPrimaryDishAdd"
                  >添加</el-button
                >
                <el-button
                  bg-yellow-5
                  style="
                    color: white;
                    position: relative;
                    left: 2rem;
                    bottom: 0.5rem;
                  "
                  @click="userCloseDishAddWindow"
                  >返回</el-button
                >
              </div>
              <div grow></div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<style scoped>
.dialog:deep(.el-dialog__header) {
  padding: 0;
  margin: 0;
}

.dialog:deep(.el-main) {
  padding: 0;
  background-color: white;
  margin: 0;
}

.dialog:deep(.template) {
  background-color: white;
}

.dialog:deep(.el-dialog__body) {
  padding: 0;
  margin: 0;
}

.dialog:deep(.is-align-center) {
  width: 60%;
  max-height: 80%;
  min-height: 80%;
}

.dialog:deep(.el-button) {
  color: white;
  background-color: rgb(251, 189, 23);
  position: relative;
  left: 40px;
}

.label-text {
  margin: 1rem;
  margin-top: 1.5rem;
}

.green {
  background-color: #67c23a;
}

.red {
  background-color: #f56c6c;
}

.yellow {
  background-color: #e6a23c;
}

.name :deep(.el-input__wrapper) {
  box-shadow: red 0px 0px 0px 1px inset !important;
}
</style>
