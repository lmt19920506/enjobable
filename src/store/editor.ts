import { defineStore } from "pinia";
import { IPageConfig } from "@/views/typings/editor";
import { debounce } from "lodash-es";

export interface IEditorState {
  pageConfig: IPageConfig;
  storePageConfig: object;
  pageConfigArr: [];
  pageName: string;
  unit: string;
  productionType: string;
  containerBg: [];
  addPageTemplateObj: {
    width: number;
    height: number;
    url: string;
    backgroundColor: string;
  };
  addLayerNumber: number;
  addLayerLimitNumber: number;
  canvas: {
    scale: number;
    width: number;
    height: number;
    backgroundImage: string;
    backgroundColor: string;
    blockResizeWidth: number;
    blockResizeMiddleWidth: number;
    blockResizeMiddleHeight: number;
    blockResizeMiddleBorderRadius: number;
    blockResizeMiddlePosition: number;
    rotateWidth: number;
    rotateTop: number;
    borderWidth: number;
    tipHeight: number;
    tipFontSize: number;
  };
  thumConfigArr: any;
  rightMenuClientX: number;
  rightMenuClientY: number;
  guideLine: {
    h: number[];
    v: number[];
  };
  baseInfoData: object;
  containerRef: any;
  leftMenuType: string;
  comRef: any;
  isShowOperation: boolean;
  isShowResizeBtn: boolean;
  isShowImgConfig: boolean;
  isShowContentMenu: boolean;
  isEditText: boolean;
  isEditSvgImage: boolean;
  isEditPhotoFrameImage: boolean;
  isSingleClickPhotoFrame: boolean;
  isComCanMove: boolean;
  isClickCom: boolean;
  isShowCut: boolean;
  isCanMove: boolean;
  isCanResize: boolean;
  showCutHtml: string;
  isShowMask: boolean;
  selectedGrid: object;
  selectedBgColor: string;
  translateX: number;
  translateY: number;
  paperList: [];
  fontList: [];
  mouseInCanvas: boolean;
  isShowBleed: boolean;
  isShowRule: boolean;
  isAutoAdsorb: boolean;
}

export const useEditorStore = defineStore("editor", {
  state: (): IEditorState => ({
    pageConfig: {
      width: 1920,
      height: 1080,
      url: "",
      bleedLine: 0,
      bleedLineDur: 0,
      backgroundColor: "",
      decorateBackgroundImage: [],
    },
    storePageConfig: {
      width: 1920,
      height: 1080,
      url: "",
      bleedLine: 0,
      backgroundColor: "#ffffff",
      decorateBackgroundImage: [],
    },
    addPageTemplateObj: {
      width: 0,
      height: 0,
      url: "",
      backgroundColor: "",
    }, // 添加页面时的模板对象
    pageConfigArr: [],
    unit: "px",
    productionType: "album", // 当前产品类型，8大类
    pageName: "", // 当前页面名称
    containerBg: [], // 缩略图的背景数组
    addLayerNumber: 1, // 添加页码数
    addLayerLimitNumber: 10, // 添加页数限制
    canvas: {
      scale: 1,
      width: 1920,
      height: 1080,
      backgroundImage: "", // 初始化画布背景
      backgroundColor: "#ffffff", // 初始化画布颜色
      blockResizeWidth: 16, // 左上、右上、左下、右下拖拽点的宽度
      blockResizeMiddleWidth: 24, // 上、下拖拽点的宽度；左、右拖拽点的高度
      blockResizeMiddleHeight: 10, // 上、下的拖拽点的高度；左、右拖拽点的宽度
      blockResizeMiddlePosition: 6.5,
      blockResizeMiddleBorderRadius: 7.56,
      rotateTop: -38, // 旋转图标距离选中组件的距离
      rotateWidth: 24, // 旋转组件的宽度
      borderWidth: 2, // 组件选中时的边框宽度
      tipHeight: 30, // 相框组件文字提示框的高度
      tipFontSize: 14, // 相框组件文字提示框的字体大小
    },
    thumConfigArr: [],
    rightMenuClientX: 0, // 存储右键呼出菜单时的鼠标位置
    rightMenuClientY: 0,
    guideLine: {
      h: [],
      v: [],
    },
    baseInfoData: {
      name: "",
      typeName: "",
      type: "",
      imgUrl: "",
    },
    containerRef: null,
    // leftMenuType: "imageComp",
    leftMenuType: "baseInfo",
    comRef: null,
    isShowOperation: false,
    isShowResizeBtn: false,
    isShowImgConfig: false,
    isShowContentMenu: false, // 是否显示右键菜单
    isEditText: false, // 是否在编辑文本
    isEditSvgImage: false, // 是否在编辑svg里的图片，双击激活
    isEditPhotoFrameImage: false, // 是否在编辑相框里的图片，双击激活
    isSingleClickPhotoFrame: false, // 是否点击了（单击）了相框组件
    isComCanMove: true, // 页面上的组件是否可以动，主要是未来设置：当编辑svg组件里面的图片利用鼠标move移动位置时，基础页面组件不能移动
    isClickCom: false, // 是否点击了画布上的组件元素
    isShowCut: true,
    isCanMove: true,
    isCanResize: true,
    showCutHtml:
      '<div class="show-preview" style="width: 70px; height: 70px,; overflow: hidden"><div style="width: 70px; height: 70px"><img src=blob:http://localhost:9999/9bbea65b-825e-4c0d-9bfc-1bc02eb3a20a style="width: 1333px; height: 2000px; transform:scale(0.095)translate3d(-6710.526315789473px, -10063.157894736842px, 0px)rotateZ(0deg)"></div></div>',
    isShowMask: false,
    selectedGrid: {},
    selectedBgColor: "",
    translateX: 100, // 画布横向距离
    translateY: 100, // 画布纵向距离
    paperList: [],
    fontList: [],
    mouseInCanvas: false,
    isShowBleed: true,
    isShowRule: false,
    isAutoAdsorb: true
  }),
  actions: {
    async setCanvasScale(scale: number, offsetX: number, offsetY: number) {
      // 减去滚动条 4px
      let width = document.documentElement.clientWidth - offsetX - 4;
      let height = document.documentElement.clientHeight - offsetY - 4;
      const deltaS = Math.min(Math.max(scale, 10), 200) / 100;
      // console.log('set scale---', deltaS, width, height)
      // this.canvas = { scale: deltaS, width, height }
      this.canvas.scale = deltaS;
      // console.log('this---', this.canvas.scale)
    },
    async autoCanvasScale(offset: () => { x: number; y: number }, fn) {
      // console.log('autoCanvasScale')
      const resize = debounce(() => {
        // console.log('offset---', offset());
        const { x, y } = offset();
        // console.log('xy---,', x, y);
        const width = document.documentElement.clientWidth - x;
        const height = document.documentElement.clientHeight - y;

        // const a = (width - 180) / this.pageConfig.width;
        const a = (width - 280) / this.pageConfig.width;
        // const b = (height - 200) / this.pageConfig.height;
        // 165
        const b = (height - 125) / this.pageConfig.height;
        const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100;
        // console.log('aftar scale---', scale);x/s
        this.setCanvasScale(scale, x, y);
        fn && fn(scale);
      }, 200);

      window.onresize = resize;

      resize();
    },
  },
  getters: {},
});
