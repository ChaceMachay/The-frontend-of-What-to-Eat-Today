<script setup>
import { ref } from "vue"
import { isNumber, range } from 'lodash'

import { addCanteenWindowStatus, canteenWindowsLimit, canteenLevelLimit } from "../../status/data.js"
import { getCampus } from "../../api/canteen.js"
import { convertToChinaNum } from "../../api/etc.js"
import { computed } from "@vue/reactivity"

//   添加基本上就是修改的操作，只是初始值为0. 只有与后端交互的api名字不同，叫pushAddData(); 状态为 addWindowStatus ， 其他一致。

const options = getCampus()

const levelNegStatus = ref(false)
const levelNegNum = ref(0)
const levelNum = ref(1)

const allNum = computed(() => {
    return levelNegNum.value + levelNum.value
})

const userCanteenEditInput = ref({
    campus_id: "1",
    canteen_name: "齐园",
    level_num: 1,
    information: []
})

const initialInput = () => {
    let template = {
        windows_num: 1,
        information: [],
    }
    for (let l in range(canteenWindowsLimit)) {
        template.information.push("待定")
    }
    for (let m in range(canteenLevelLimit)) {
        userCanteenEditInput.value.information.push(
            JSON.parse(JSON.stringify(template))
        )
    }
}

const userPrimaryCanteenEdit = () => {
    ElMessageBox.confirm("是否确认添加餐厅信息？", "添加确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(
            () => {
                if (!checkStatus.value) {
                    ElMessageBox.confirm("必填项不能为空！", "添加失败", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    return
                }
                userCanteenEditInput.value.level_num = allNum.value

                const loading = ElLoading.service({
                    fullscreen: true,
                    text: "正在提交添加数据",
                })
                //pushAddData(userCanteenEditInput.value)
                loading.close()
                ElMessageBox.confirm("添加餐厅信息成功！", "添加成功", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                addCanteenWindowStatus.value = false
            }
        )
        .catch((err) => {
            console.error(err)
            return
        })
}

const userCloseCanteenEditWindow = () => {
    ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            addCanteenWindowStatus.value = false
        })
        .catch(() => {
            return
        })
}

const userLastInput = ref([0, 0, 0])
userLastInput.value[0] = 1
userLastInput.value[1] = 1

const userInputLevelCheck = (i) => {
    let value = levelNum.value
    if (!isNumber(value)) {
        if (value !== '') {
            levelNum.value = userLastInput.value[0]
        }
    }
    else if (value < 0) {
        levelNum.value = userLastInput.value[0]
        ElMessageBox.alert("层数不得为负！", "超限", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
    }
    else if (allNum.value > i.information.length) {
        levelNum.value = userLastInput.value[0]
        ElMessageBox.alert("层数超限，单次添加不可超过 10 层。", "超限", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
    }
    else {
        userLastInput.value[0] = value
        userCanteenEditInput.value.level_num = allNum.value
    }
}

const userInputWindowsCheck = (i) => {
    let value = i.windows_num
    if (value > i.information.length) {
        i.windows_num = userLastInput.value[1]
        ElMessageBox.alert("窗口数超限，单次添加不可超过 20 个。", "超限", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
    }
    else {
        userLastInput.value[1] = value
    }
}

const userInputLevelNegCheck = () => {
    if (!isNumber(levelNegNum.value)) {
        if (levelNegNum.value !== '') {
            levelNegNum.value = userLastInput.value[2]
        } else if (levelNegNum.value === '') {
            allNum.value += 0
        }
    }
    else if (levelNegNum.value < 0) {
        ElMessageBox.alert("层数不得为负！", "超限", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
        levelNegNum.value = userLastInput.value[2]
    }
    else if (allNum.value > userCanteenEditInput.value.information.length) {
        levelNegNum.value = userLastInput.value[2]
        ElMessageBox.alert("层数超限，单次添加不可超过 10 层！", "超限", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
    }
    else {
        levelNegStatus.value = !!levelNegNum.value
        userLastInput.value[2] = levelNegNum.value
        userCanteenEditInput.value.level_num = allNum.value
    }
}

const checkStatus = ref(true)
function checkWarnAdd(prop, mode = false) {
    let i = null
    if (mode) {
        i = prop
    } else {
        i = document.getElementById(prop).getElementsByTagName('div')[1]
    }
    checkStatus.value = false
    i.classList.add("warn")
}
function checkWarnRemove(prop, mode = false, value) {
    if (value) {
        userLastInput.value[1] = value
    }
    let i = null
    if (mode) {
        i = prop
    } else {
        console
        i = document.getElementById(prop).getElementsByClassName('warn')[0]
    }
    checkStatus.value = true
    i.classList.remove("warn")
}

function inputNesCheck(e) {
    let value = e.target.value
    if (value === "") {
        checkWarnAdd(document.getElementById(e.target.id).parentNode.parentNode, true)
    } else {
        checkWarnRemove(document.getElementById(e.target.id).parentNode.parentNode, true)
    }
}

function inputLevelNegNumCheck() {
    levelNegNum.value = levelNegNum.value === '' ? 0 : levelNegNum.value
    if (levelNegNum.value === 0) {
        allNum.value = levelNum.value
        userCanteenEditInput.value = allNum.value
    }
}

initialInput()
</script>

<template>
  <el-form class="dialog">
    <el-dialog
      v-model="addCanteenWindowStatus"
      :show-close="false"
      align-center
      :close-on-click-modal="false"
      append-to-body
    >
      <template #header>
        <div flex items-center h="full" bg-yellow-5>
          <span c-white m-3>添加餐厅信息</span>
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
                    v-model="userCanteenEditInput.canteen_name"
                />
              </div>
            </div>
          </div>
          <div m-5 flex style="width: 100%" flex-row id="levelNum">
            <div grow flex flex-row>
              <span mt-1>&ensp;地上层数：</span>
              <div>

                <el-input
                    @blur="
                    levelNum = levelNum === '' ? 0 : levelNum;
                    userCanteenEditInput.level_num = levelNum
                        ? levelNegNum + levelNum
                        : levelNegNum;
                    "
                    @input="userInputLevelCheck(userCanteenEditInput)"
                    v-model.number="levelNum"
                />
               </div>
            </div>
            <div grow></div>

            <div m-5 flex style="width: 100%" flex-row>
              <span mt-1>&ensp;地下层数： </span>
              <div flex flex-row>
                <el-input
                  @blur="inputLevelNegNumCheck"
                  @input="userInputLevelNegCheck"
                  v-model.number="levelNegNum"
                />
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
                }}层 窗口数：
              <el-input
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
                v-model.number="userCanteenEditInput.information[i].windows_num"
              />
              </span>
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
                >&ensp;
                  <span
                    >&ensp;{{ j * 2 + 1 }}号窗口名称：<el-input
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
                  mt-5
                  mb-5
                  flex
                  flex-row
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
                <el-button @click="userPrimaryCanteenEdit">添加</el-button>
                <el-button @click="userCloseCanteenEditWindow">返回</el-button>
              </div>
              <div grow></div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-dialog>
  </el-form>
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
}

.warn :deep(.el-input__wrapper) {
  box-shadow: red 0px 0px 0px 1px inset !important;
}
</style>
