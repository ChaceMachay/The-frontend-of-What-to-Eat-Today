<script setup>  
import { ref } from "vue";
import { isNumber, range } from "lodash";

import {
  windowsMessage,
  editCanteenWindowStatus,
  canteenWindowsLimit,
  canteenLevelLimit,
  options,
} from "../../status/data.js";
import { convertToChinaNum, copy } from "../../api/etc.js";
import {
  initialCanteenManangeInformation,
  pushEditData,
} from "../../api/canteen";

const levelNegStatus = ref(false);
const levelNegNum = ref(0);

const finalSet = () => {
  let k = 0;

  userCanteenEditInput.value["levels"] =
    userCanteenEditInput.value.information.slice(
      0,
      userCanteenEditInput.value.level_num
    );
  delete userCanteenEditInput.value["information"];
  userCanteenEditInput.value["canteen_id"];
  userCanteenEditInput.value.levels = userCanteenEditInput.value.levels.map(
    (i) => {
      i.level = levelNegStatus.value
        ? k - levelNegNum.value + (k - levelNegNum.value >= 0 ? 1 : 0)
        : k + 1;
      k++;
      i["windows_information"] = i.information.slice(0, i.windows_num);
      delete i["information"];
      let y = 1;
      i.windows_information = i.windows_information.map((u) => {
        let j = new Object();
        j["windows_name"] = u;
        j["windows"] = y;
        y++;
        return j;
      });
      return i;
    }
  );
  let u = {};
  u["canteen_id"] = userCanteenEditInput.value.canteen_id;
  delete userCanteenEditInput.value["canteen_id"];
  u["canteen_message"] = userCanteenEditInput.value;
  userCanteenEditInput.value = copy(u);
  console.log(userCanteenEditInput.value);
};

const userCanteenEditInput = ref({
  canteen_id: "",
  campus_id: "",
  canteen_name: "",
  level_num: 1,
  information: [
    {
      windows_num: 1,
      information: [],
    },
  ],
});

const initialInput = () => {
  levelNegStatus.value =
    windowsMessage.value.information[0].level < 0 ? true : false;
  levelNegNum.value =
    windowsMessage.value.information[0].level < 0
      ? -1 * windowsMessage.value.information[0].level
      : 0;
  userCanteenEditInput.value = {
    canteen_id: JSON.parse(JSON.stringify(windowsMessage.value.canteen_id)),
    campus_id: JSON.parse(
      JSON.stringify(windowsMessage.value.campus.campus_id)
    ),
    canteen_name: JSON.parse(JSON.stringify(windowsMessage.value.canteen_name)),
    level_num: JSON.parse(JSON.stringify(windowsMessage.value.level_num)),
  };

  userCanteenEditInput.value.information = windowsMessage.value.information.map(
    (i) => {
      let temp = {
        level: JSON.parse(JSON.stringify(i.level)),
        windows_num: JSON.parse(JSON.stringify(i.windows_num)),
        information: i.information.map((i) =>
          JSON.parse(JSON.stringify(i.windows_name))
        ),
      };
      for (let k in range(canteenWindowsLimit)) {
        temp.information.push("待定");
      }
      return temp;
    }
  );
  let template = {
    level: 1,
    windows_num: 1,
    information: [],
  };
  for (let l in range(canteenWindowsLimit)) {
    template.information.push("待定");
  }
  for (let m in range(canteenLevelLimit)) {
    userCanteenEditInput.value.information.push(
      JSON.parse(JSON.stringify(template))
    );
  }
};

const userPrimaryCanteenEdit = async () => {
  ElMessageBox.confirm("是否确认修改餐厅信息？", "修改确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      if (!checkStatus.value) {
        await ElMessageBox.confirm("必填项不能为空！", "添加失败", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).catch((i) => {
          console.log(i);
        });
        return;
      }
      const loading = ElLoading.service({
        fullscreen: true,
        text: "正在提交修改数据",
      });
      finalSet();
      await pushEditData(userCanteenEditInput.value)
        .then(async (i) => {
          if (i.status != 200) {
            await ElMessageBox.confirm("修改餐厅信息失败！", "修改失败", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).catch((i) => {
              console.log(i);
            });
            loading.close();
            editCanteenWindowStatus.value = false;
          } else {
            await ElMessageBox.confirm("修改餐厅信息成功！", "修改成功", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).catch((i) => {
              console.log(i);
            });
            loading.close();
            editCanteenWindowStatus.value = false;
          }
        })
        .catch(async (i) => {
          console.warn(i);
          await ElMessageBox.confirm("修改餐厅信息失败！", "修改失败", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).catch((i) => {
            console.warn(i);
          });
          loading.close();
          editCanteenWindowStatus.value = false;
        })
        .finally(() => {
          initialCanteenManangeInformation();
        });
    })
    .catch((err) => {
      return;
    });
};

const userCloseCanteenEditWindow = () => {
  ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      editCanteenWindowStatus.value = false;
    })
    .catch(() => {
      return;
    });
};
const userLastInput = ref([0, 0, 0]);
userLastInput.value[0] = 1;
userLastInput.value[1] = 1;

const userInputLevelCheck = (i) => {
  let value = i.level_num;
  if (!isNumber(value)) {
    if (value !== "") {
      i.level_num = 0;
    }
  } else if (value > i.information.length) {
    i.level_num = userLastInput.value[0];
    ElMessageBox.alert("层数超限，单次添加不可超过 10 层。", "超限", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } else {
    userLastInput.value[0] = value;
  }
};

const userInputLevelNegCheck = () => {
  if (!isNumber(levelNegNum.value)) {
    if (levelNegNum.value !== "") {
      levelNegNum.value = userLastInput.value[2];
    }
  } else if (levelNegNum.value > userCanteenEditInput.value.level_num) {
    levelNegNum.value = userLastInput.value[2];
    ElMessageBox.alert("负层数不得超过实际层数！", "超限", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } else {
    userLastInput.value[2] = levelNegNum.value;
  }
};

const userInputWindowsCheck = (i) => {
  let value = i.windows_num;
  if (value > i.information.length) {
    i.windows_num = userLastInput.value[1];
    ElMessageBox.alert("窗口数超限，单次添加不可超过 20 个。", "超限", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } else {
    userLastInput.value[1] = value;
  }
};

const checkStatus = ref(true);
function checkWarnAdd(prop, mode = false) {
  let i = null;
  if (mode) {
    i = prop;
  } else {
    i = document.getElementById(prop).getElementsByTagName("div")[1];
  }
  checkStatus.value = false;
  i.classList.add("warn");
}
function checkWarnRemove(prop, mode = false, value) {
  if (value) {
    userLastInput.value[1] = value;
  }
  let i = null;
  if (mode) {
    i = prop;
  } else {
    console;
    i = document.getElementById(prop).getElementsByClassName("warn")[0];
  }
  checkStatus.value = true;
  i.classList.remove("warn");
}

function inputNesCheck(e) {
  let value = e.target.value;
  if (value === "") {
    checkWarnAdd(
      document.getElementById(e.target.id).parentNode.parentNode,
      true
    );
  } else {
    checkWarnRemove(
      document.getElementById(e.target.id).parentNode.parentNode,
      true
    );
  }
}
function inputLevelNegNumCheck() {
  levelNegNum.value = levelNegNum.value === "" ? 0 : levelNegNum.value;
}
initialInput();
</script>

<template>
  <!-- 修改信息的层数和窗口数要做验证，包括不能为零，和单次而言input的数不能超过原值+limit值 -->

  <div class="dialog">
    <el-dialog
      v-model="editCanteenWindowStatus"
      :show-close="false"
      align-center
      :close-on-click-modal="false"
      append-to-body
    >
      <template #header>
        <div flex items-center h="full" bg-yellow-5>
          <span c-white m-3>修改餐厅信息</span>
        </div>
      </template>
      <el-container>
        <el-main style="overflow-x: hidden; overflow-y: auto">
          <div m-5 flex flex-row style="width: 80%">
            <div grow flex flex-row>
              <span mt-2>&ensp;校区：</span>
              <el-select v-model="userCanteenEditInput.campus_id" size="large">
                <el-option
                  v-for="item in options"
                  :key="item.campus_id"
                  :label="item.campus_name"
                  :value="item.campus_id"
                />
              </el-select>
            </div>
            <div grow flex flex-row id="canteenName">
              <span mt-1>名称：</span>
              <div style="width: auto">
                <el-input
                  @focus="checkWarnRemove('canteenName')"
                  @blur="inputNesCheck"
                  maxlength="10"
                  v-model="userCanteenEditInput.canteen_name"
                />
              </div>
            </div>
          </div>
          <div m-5 flex style="width: 100%" flex-row id="levelNum">
            <div grow flex flex-row>
              <span mt-1>&ensp;层数：</span>
              <div>
                <el-input
                  @focus="checkWarnRemove('levelNum')"
                  @blur="
                    userCanteenEditInput.level_num =
                      userCanteenEditInput.level_num === ''
                        ? 0
                        : userCanteenEditInput.level_num
                  "
                  @input="userInputLevelCheck(userCanteenEditInput)"
                  v-model.number="userCanteenEditInput.level_num"
                  :max="userCanteenEditInput.information.length"
                />
              </div>
              <div grow></div>
            </div>
            <div grow-5 flex flex-row>
              <div flex flex-row>
                <div grow>
                  <span>是否存在负层数： </span>
                  <el-checkbox grow v-model="levelNegStatus"></el-checkbox>
                </div>
                <div grow v-if="levelNegStatus" flex flex-row>
                  <span>负层数： </span>
                  <el-input
                    @blur="inputLevelNegNumCheck"
                    @input="userInputLevelNegCheck"
                    v-model.number="levelNegNum"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            m-5
            flex
            flex-col
            style="width: 100%"
            v-for="i in range(userCanteenEditInput.level_num)"
          >
            <div grow flex flex-row :id="'windows' + ('' + i)">
              &ensp;
              <span
                >&ensp;{{
                  convertToChinaNum(
                    levelNegStatus
                      ? i - levelNegNum + (i - levelNegNum >= 0 ? 1 : 0)
                      : i + 1
                  )
                }}层 窗口数：<el-input
                  @focus="
                    checkWarnRemove(
                      'windows' + ('' + i),
                      false,
                      userCanteenEditInput.information[i].windows_num
                    )
                  "
                  @blur="inputNesCheck"
                  @input="
                    userInputWindowsCheck(userCanteenEditInput.information[i])
                  "
                  v-model.number="
                    userCanteenEditInput.information[i].windows_num
                  "
              /></span>
            </div>
            <div
              flex
              flex-col
              v-for="j in range(
                (userCanteenEditInput.information[i].windows_num +
                  (userCanteenEditInput.information[i].windows_num % 2)) /
                  2
              )"
            >
              <div flex flex-row>
                <div
                  grow
                  mt-5
                  mb-5
                  flex
                  flex-row
                  :id="'windows' + ('' + i) + ('' + j * 2 + 1)"
                >
                  &ensp;
                  <span
                    >&ensp;{{ j * 2 + 1 }}号窗口名称：<el-input
                      maxlength="10"
                      @focus="
                        checkWarnRemove('windows' + ('' + i) + ('' + j * 2 + 1))
                      "
                      @blur="inputNesCheck"
                      v-model="
                        userCanteenEditInput.information[i].information[j * 2]
                      "
                  /></span>
                </div>
                <div
                  grow
                  flex
                  flex-row
                  mt-5
                  mb-5
                  :id="'windows' + ('' + i) + ('' + j * 2 + 2)"
                  v-if="
                    j + 1 <
                      (userCanteenEditInput.information[i].windows_num +
                        (userCanteenEditInput.information[i].windows_num % 2)) /
                        2 ||
                    !(userCanteenEditInput.information[i].windows_num % 2)
                  "
                >
                  <span
                    >&ensp;{{ j * 2 + 2 }}号窗口名称：<el-input
                      maxlength="10"
                      @focus="
                        checkWarnRemove('windows' + ('' + i) + ('' + j * 2 + 2))
                      "
                      @blur="inputNesCheck"
                      v-model="
                        userCanteenEditInput.information[i].information[
                          j * 2 + 1
                        ]
                      "
                  /></span>
                </div>
                <div grow="2" mt-5 mb-5 v-else></div>
              </div>
            </div>
          </div>
          <div>
            <div flex-row w="full">
              <div grow></div>
              <div grow style="margin: 2%">
                <el-button
                  bg-yellow-5
                  style="color: white; position: relative; left: 1rem; bottom: 1rem;"
                  @click="userPrimaryCanteenEdit"
                  >修改</el-button
                >
                <el-button
                  bg-yellow-5
                  style="color: white; position: relative; left: 1rem; bottom: 1rem;"
                  @click="userCloseCanteenEditWindow"
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
  left: 2rem;
}

.warn :deep(.el-input__wrapper) {
  box-shadow: red 0px 0px 0px 1px inset !important;
}
</style>
