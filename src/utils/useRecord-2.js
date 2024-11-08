import { useComStore } from "@/store/com";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import deepcopy from "deepcopy";
import { ElMessage } from "element-plus";
const recordList = []

export const useRecord = () => {
    const comStore = useComStore()
    let { coms, selectedCom, recordList, revokeList, selectedComs } = storeToRefs(comStore)
    

    const record = () => {
        recordList.value.push(deepcopy(coms.value))
        console.log('record list---', recordList.value)
    }
    const withDraw = () => {
        if (!recordList.value.length) {
            ElMessage.warning("已经撤回到底了");
            return 
        }
        const idx = (recordList.value).length - 2
       if (idx === -1) {
          coms.value = []
       } else {
        const after =(recordList.value)[idx]
        coms.value = after
        selectedCom.value = coms.value.find(item => item.isSelected)
       }
        
        
        const tmp =recordList.value.pop()
        revokeList.value.push(tmp)
    }
    const revoke = () => {
        // console.log('revode list---', revokeList.value)
        if (!revokeList.value.length) {
            ElMessage.warning("已经恢复到底了");
            return 
        }
        coms.value = revokeList.value.pop()
        selectedCom.value = coms.value.find(item => item.isSelected)
        record()
    }
    return {
        record,
        withDraw,
        revoke
    }
}