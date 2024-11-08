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
    selectedComs,
    currentPage,
  } = storeToRefs(comStore);
  let { isShowImgConfig, isShowResizeBtn } = storeToRefs(editorStore);

  const record = () => {
    // recordList.value.push(deepcopy(coms.value))
    // recordList.value.push(coms.value.concat())
    recordList.value.push(deepcopy(storeComs.value));
    recordPage.value.push(currentPage.value);

    // console.log('record list---', recordList.value)
  };
  const withDraw = () => {
    console.log("撤销---", recordList.value);
    if (!recordList.value.length) {
      isShowImgConfig.value = false;
      ElMessage.warning("已经撤回到底了");
      return;
    }
    const idx = recordList.value.length - 2;
    console.log("idx---", idx);

    if (idx === -1) {
      //   coms.value = []
      console.log("进入了");
      storeComs.value = deepcopy(storeFirstRes.value);
      // currentPage.value = storeComs.value.length - 1
      currentPage.value = 0
    } else {
        console.log('222')
      const after = recordList.value[idx];
      currentPage.value = recordPage.value[idx];
      console.log("record page---", currentPage.value);
      storeComs.value = after;
    }
    coms.value = storeComs.value[currentPage.value].data;
    //    selectedCom.value = coms.value.filter(item => item.isSelected)

    let findObj = storeComs.value[currentPage.value]["data"].find(
      (item) => item.isSelected
    );
    console.log("findObj---", findObj);
    selectedCom.value = findObj;

    const tmp = recordList.value.pop();
    const tmpPage = recordPage.value.pop();
    storeComs.value[currentPage.value].data.forEach((item) => {
        isShowResizeBtn.value = item.isSelected
      });
    revokeList.value.push(tmp);
    revokePage.value.push(tmpPage);
  };
  const revoke = () => {
    // console.log('revode list---', revokeList.value)
    if (!revokeList.value.length) {
      ElMessage.warning("已经恢复到底了");
      return;
    }

    storeComs.value = revokeList.value.pop();
    currentPage.value = revokePage.value.pop();
    // selectedCom.value = coms.value.find(item => item.isSelected)
    selectedCom.value = storeComs.value[currentPage.value].data.find(
      (item) => item.isSelected
    );
    storeComs.value[currentPage.value].data.forEach((item) => {
        isShowResizeBtn.value = item.isSelected
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
      ElMessage.warning("已经撤回到底了");
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
      ElMessage.warning("已经恢复到底了");
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
