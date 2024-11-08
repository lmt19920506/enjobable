import { defineStore } from "pinia";

export interface IComState {
  imageData: [];
  storeComs: [];
  storeFirstRes: [];
  templateNum: number;
  coms: [];
  initPageData: [];
  recordList: [];
  revokeList: [];
  recordPage: [];
  revokePage: [];
  recordSelectedList: [];
  revokeSelectedList: [];
  selectedCom: [];
  selectedList: [];
  copySelectedCom: {};
  lastSelectedCom: {};
  currentPage: number;
  svgImgWheelTargetId: string;
  photoFrameWheelTargetId: string;
  parsePsdObj: object;
}

export const useComStore = defineStore("com", {
  state: () => ({
    imageData: [],
    storeComs: [],
    storeFirstRes: [],
    templateNum: 1, // 模板数量
    coms: [],
    initPageData: [],
    recordList: [],
    revokeList: [],
    recordPage: [],
    revokePage: [],
    recordSelectedList: [],
    revokeSelectedList: [],
    selectedCom: {},
    selectedList: [],
    copySelectedCom: {}, // 复制的元素
    lastSelectedCom: {}, // 最后选中的那个元素
    currentPage: 0,
    svgImgWheelTargetId: "", // svg里被缩放的img的id
    photoFrameWheelTargetId: "", // 边框/相框组件里缩放的img的id
    parsePsdObj: {}, // 解析出的psdjson对象（单页）
  }),
  actions: {
    addCom(com: object) {
      this.coms.push(com);
    },
  },
});
