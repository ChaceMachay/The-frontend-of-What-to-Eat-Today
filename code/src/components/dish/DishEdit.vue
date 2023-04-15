<script setup>  
import { ref, computed, watch } from "vue";
import { isNumber, range } from "lodash";

import {
  windowsMessage,
  editDishWindowStatus,
  checkPriceByInput,
  checkPriceByBlur,
  windowsList,
} from "../../status/data.js";
import { convertToChinaNum, copy } from "../../api/etc.js";

import DishUpload from "./DishUpload.vue";

import { initialdishManangeInformation, pushEditData } from "../../api/dish";

const labelList = ref([
  { labelName: "汤类", labelClass: "green" },
  { labelName: "辣", labelClass: "red" },
  { labelName: "+", labelClass: "yellow" },
]);

const userDishEditInput = ref({
  dish_name: "菜名",
  dish_id: "010101001",
  muslim: false,
  windows_id: "010101",
  price: "0",
  picture: "/static/1681088941.490633.jpg",
  sparePicture: "",
  date: {
    morning: false,
    noon: false,
    night: false,
  },
});

const finalSet = () => {
  let u = {};
  u["dish_message"] = {};
  userDishEditInput.value["photos"] = userDishEditInput.value.picture;
  delete userDishEditInput.value.picture;
  userDishEditInput.value["spare_photos"] =
    userDishEditInput.value.sparePicture;
  delete userDishEditInput.value.sparePicture;
  userDishEditInput.value.price *= 1;
  userDishEditInput.value["name"] = userDishEditInput.value.dish_name;
  delete userDishEditInput.value.dish_name;
  delete userDishEditInput.value.windows_name;
  const { morning, noon, night } = userDishEditInput.value.date;
  userDishEditInput.value["morning"] = morning;
  userDishEditInput.value["noon"] = noon;
  userDishEditInput.value["night"] = night;
  delete userDishEditInput.value.date;
  userDishEditInput.value["canteen_id"] =
    userDishEditInput.value.windows_id.slice(0, 2);
  userDishEditInput.value["level"] =
    userDishEditInput.value.windows_id.slice(2, 4)[0] === "0"
      ? userDishEditInput.value.windows_id.slice(2, 4)[1] * 1
      : userDishEditInput.value.windows_id.slice(2, 4)[0] * -1;
  userDishEditInput.value["window"] =
    userDishEditInput.value.windows_id.slice(4, 6) * 1;
  delete userDishEditInput.value.windows_id;
  u["dish_message"] = copy(userDishEditInput.value);
  u["dish_id"] = userDishEditInput.value.dish_id;
  userDishEditInput.value = copy(u);
};

userDishEditInput.value = JSON.parse(JSON.stringify(windowsMessage.value));

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

let canteenIndexSrc = windowsList.value.findIndex(
  (a) => a.canteen_id === windowsMessage.value.windows_id.slice(0, 2)
);
let levelIndexSrc = windowsList.value[
  canteenIndexSrc
].levels_information.findIndex((a) => a.level === windowsMessage.value.level);

canteenIndex.value = canteenIndexSrc;
levelIndex.value = levelIndexSrc;

const levelList = computed(() => {
  let i = -1;
  return windowsList.value[canteenIndex.value].levels_information.map((a) => {
    i++;
    return {
      value: i,
      label: convertToChinaNum(a.level) + "层",
    };
  });
});
const windowList = computed(() => {
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
  userDishEditInput.value.windows_id = newVal[0].value;
})
watch(userDishEditInput.value.windows_id, (newVal) => {
  if (newVal.slice(1,2)*1 !== canteenIndex.value) {
    levelIndex.value = 0;
  }
  else if(newVal.slice(1,2)*1 === canteenIndex.value){
    console.log(newVal.slice(1,2)*1);
  }
})


const userPrimaryDishEdit = () => {
  ElMessageBox.confirm("是否确认修改菜品信息？", "修改确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      if (!checkStatus.value) {
        await ElMessageBox.confirm("菜品名称不能为空！", "修改失败", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).catch((i) => {
          console.warn(i);
        });
        checkWarnedit();
        return;
      }
      const loading = ElLoading.service({
        fullscreen: true,
        text: "正在提交数据",
      });
      finalSet();
      await pushEditData(userDishEditInput.value)
        .then(async (res) => {
          if (res.status !== 200) {
            console.warn(res);
            await ElMessageBox.confirm("修改菜品失败！", "修改失败", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).catch((i) => {
              console.warn(i);
            });
            editDishWindowStatus.value = false;
          } else {
            await ElMessageBox.confirm("修改菜品成功！", "修改成功", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).catch((i) => {
              console.warn(i);
            });

            loading.close();
            editDishWindowStatus.value = false;
          }
        })
        .catch(async (err) => {
          console.warn(err);
          await ElMessageBox.confirm("修改菜品失败！", "修改失败", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).catch((i) => {
            console.warn(i);
          });
          loading.close();
          editDishWindowStatus.value = false;
        })
        .finally(() => {
          initialdishManangeInformation();
        });
    })
    .catch((i) => {
      return
    });
};

const userCloseDishEditWindow = () => {
  ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      editDishWindowStatus.value = false;
    })
    .catch(() => {
      return;
    });
};

const checkStatus = ref(true);
function checkWarnedit() {
  checkStatus.value = false;
  let i = document.getElementById("nameJS");
  i.classList.edit("name");
}
function checkWarnRemove() {
  checkStatus.value = true;
  let i = document.getElementById("nameJS");
  i.classList.remove("name");
}

function inputNesCheck(e) {
  let value = e.target.value;
  if (value === "") {
    checkWarnedit();
  } else {
    checkWarnRemove();
  }
}

const userLastInput = ref(["0"]);

function inputPriceNumCheck() {
  if (checkPriceByBlur.test(userDishEditInput.value.price)) {
    userDishEditInput.value.price =
      userDishEditInput.value.price === "" ? 0 : userDishEditInput.value.price;

    userLastInput.value[0] = userDishEditInput.value.price;
  } else if (!checkPriceByBlur.test(userDishEditInput.value.price)) {
    userDishEditInput.value.price = userLastInput.value[0];
  }
}

const userInputPriceCheck = () => {
  if (checkPriceByInput.test(userDishEditInput.value.price)) {
    if (checkPriceByBlur.test(userDishEditInput.value.price)) {
      userLastInput.value[0] = userDishEditInput.value.price;
    }
  } else if (!checkPriceByInput.test(userDishEditInput.value.price)) {
    userDishEditInput.value.price = userLastInput.value[0];
  }
};
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="editDishWindowStatus"
      :show-close="false"
      align-center
      :close-on-click-modal="false"
      append-to-body
    >
      <template #header>
        <div flex items-center h="full" bg-yellow-5>
          <span c-white m-3>修改菜品信息</span>
        </div>
      </template>
      <el-container>
        <el-main style="overflow-x: hidden">
          <div m-5 flex flex-row style="width: 100%">
            <div grow>
              <span>uid: </span><span>{{ windowsMessage.dish_id }}</span>
            </div>
            <div grow id="nameJS">
              <span
                >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 名称：</span
              >

              <el-input
                style="width: 10rem"
                @focus="checkWarnRemove"
                @blur="inputNesCheck"
                v-model="userDishEditInput.dish_name"
              />
            </div>
            <div grow flex flex-row>
              <span mt-1.5>时间：</span>
              <el-checkbox
                v-model="userDishEditInput.date.morning"
                label="早"
              ></el-checkbox>
              <el-checkbox
                v-model="userDishEditInput.date.noon"
                label="中"
              ></el-checkbox>
              <el-checkbox
                v-model="userDishEditInput.date.night"
                label="晚"
              ></el-checkbox>
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow>
              <span>餐厅：</span>
              
              <el-select v-model="canteenIndex" style="width: 150px;">
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
              <el-select v-model="levelIndex" style="width: 10rem;">
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
              <el-select v-model="userDishEditInput.windows_id" style="width: 10rem;">
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
              ><el-checkbox v-model="userDishEditInput.muslim"></el-checkbox>
            </div>
          </div>

          <div m-5 flex style="width: 100%">
            <div grow flex flex-row>
              <span mt-1>价格：</span>
              <div>
                <el-input
                style="width: 10rem;"
                  @blur="inputPriceNumCheck"
                  @input="userInputPriceCheck"
                  v-model="userDishEditInput.price"
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
              <span>图片：</span>&ensp;&ensp;&ensp;&ensp;
              <DishUpload
                :picture-url="userDishEditInput.picture"
                @update:picture-url="(i) => (userDishEditInput.picture = i)"
              />
            </div>
          </div>
          <div m-5 flex style="width: 100%">
            <div grow flex flex-row>
              <span>备用图片：</span>
              <DishUpload
                :picture-url="userDishEditInput.sparePicture"
                @update:picture-url="
                  (i) => (userDishEditInput.sparePicture = i)
                "
              />
            </div>
          </div>
          <div>
            <div flex-row w="full">
              <div grow></div>
              <div grow>
                <el-button
                  bg-yellow-5
                  style="color: white; position: relative; left: 2rem;"
                  @click="userPrimaryDishEdit"
                  >修改</el-button
                >
                <el-button
                  bg-yellow-5
                  style="color: white; position: relative; left: 2rem;"
                  @click="userCloseDishEditWindow"
                  >返回</el-button
                >
              </div>
              <p>&ensp;</p>
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
