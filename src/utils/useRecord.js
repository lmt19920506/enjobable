import { watch } from "vue";
import { useComStore } from "@/store/com";
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import deepcopy from "deepcopy";
import { ElMessage } from "element-plus";
const recordList = [];

export const useRecord = () => {
  const comStore = useComStore();
  const editorStore = useEditorStore();
  let {
    storeComs,
    storeFirstRes,
    coms,
    selectedCom,
    selectedList,
    recordList,
    revokeList,
    recordPage,
    revokePage,
    recordSelectedList,
    revokeSelectedList,
    selectedComs,
    currentPage,
  } = storeToRefs(comStore);
  let { isShowImgConfig, isShowResizeBtn } = storeToRefs(editorStore);

  const record = () => {
    // recordList.value.push(deepcopy(coms.value))
    // recordList.value.push(coms.value.concat())
    recordList.value.push(deepcopy(storeComs.value));
    recordPage.value.push(currentPage.value);
    let selected = [];
    storeComs.value[currentPage.value]["data"].forEach((item) => {
      if (item.isSelected) {
        selected.push(item);
      }
    });
    recordSelectedList.value.push(selected);
    // recordSelectedList.value.push(findObj)
    // console.log("sle obj---", recordSelectedList.value);

    // console.log('record list---', recordList.value)
  };
  const withDraw = () => {
    if (!recordList.value.length) {
      isShowImgConfig.value = false;
      // 撤回到底，清空选中值
      //   selectedList.value = [];
      //   selectedCom.value = {};
      isShowResizeBtn.value = false;
      storeComs.value[currentPage.value].data.forEach((item) => {
        item.isSelected = false;
      });
      ElMessage({
        message: '已经撤回到底了',
        type: 'warning',
        duration: 700,
      })
      return;
    }
    const idx = recordList.value.length - 2;
    console.log("idx---", idx);

    if (idx === -1) {
      //   coms.value = []
      console.log("进入了");
      storeComs.value = deepcopy(storeFirstRes.value);
      // currentPage.value = storeComs.value.length - 1
      currentPage.value = 0;
    } else {
      const after = recordList.value[idx];
      currentPage.value = recordPage.value[idx];
      storeComs.value = after;
    }
    coms.value = storeComs.value[currentPage.value].data;
    let findObj = coms.value.find((item) => item.isSelected);
    selectedCom.value = findObj;
    // selectedList

    let showSelected = recordSelectedList.value[recordList.value.length - 1];
    if (showSelected.length > 1) {
      selectedList.value = showSelected;
    } else {
      selectedList.value = showSelected;
      // selectedCom.value = showSelected[0];
      selectedCom.value = storeComs.value[currentPage.value]["data"].find(
        (item) => item.id == selectedList.value[0]?.id
      ) || {};
    }
    storeComs.value[currentPage.value].data.forEach((item) => {
      item.isSelected = false;
      if (selectedList.value.length) {
        isShowResizeBtn.value = true;
        selectedList.value.forEach((it) => {
          if (it.id == item.id) {
            item.isSelected = true;
          }
        });
      } else {
        isShowResizeBtn.value = false;
      }
    });
    console.log("d---", selectedCom.value);
    const tmp = recordList.value.pop();
    const tmpPage = recordPage.value.pop();
    const tempSelected = recordSelectedList.value.pop();

    revokeList.value.push(tmp);
    revokePage.value.push(tmpPage);
    revokeSelectedList.value.push(tempSelected);
  };
  const revoke = () => {
    // console.log('revode list---', revokeList.value)
    // 反撤回会导致页面数据不更新，得修复10.28
    if (!revokeList.value.length) {
      ElMessage({
        message: '已经恢复到底了',
        type: 'warning',
        duration: 700,
      })
      return;
    }

    storeComs.value = revokeList.value.pop();
    currentPage.value = revokePage.value.pop();
    selectedList.value = revokeSelectedList.value.pop();
    // selectedCom.value = coms.value.find(item => item.isSelected)
    selectedCom.value = storeComs.value[currentPage.value].data.find(
      (item) => item.isSelected
    );
    storeComs.value[currentPage.value].data.forEach((item) => {
      item.isSelected = false;
      if (selectedList.value.length) {
        isShowResizeBtn.value = true;
        selectedList.value.forEach((it) => {
          if (it.id == item.id) {
            item.isSelected = true;
          }
        });
      } else {
        isShowResizeBtn.value = false;
      }
    });
    record();
  };
  const record1 = () => {
    recordList.value.push(deepcopy(coms.value));
    console.log("record list---", recordList.value);
  };
  const withDraw1 = () => {
    console.log("撤销---", recordList.value);
    if (!recordList.value.length) {
      ElMessage({
        message: '已经撤回到底了',
        type: 'warning',
        duration: 700,
      })
      return;
    }
    const idx = recordList.value.length - 2;
    console.log("idx---", idx);
    if (idx === -1) {
      //   coms.value = []
    } else {
      const after = recordList.value[idx];
      coms.value = after;
      selectedCom.value = coms.value.find((item) => item.isSelected);
    }

    const tmp = recordList.value.pop();
    revokeList.value.push(tmp);
  };
  const revoke1 = () => {
    // console.log('revode list---', revokeList.value)
    if (!revokeList.value.length) {
      ElMessage({
        message: '已经恢复到底了',
        type: 'warning',
        duration: 700,
      })
      return;
    }
    coms.value = revokeList.value.pop();
    selectedCom.value = coms.value.find((item) => item.isSelected);
    record();
  };

  // watch(recordList, (newVal) => {
  //     console.log('watch recordList---', newVal)
  // })
  return {
    record,
    withDraw,
    revoke,
  };
};
