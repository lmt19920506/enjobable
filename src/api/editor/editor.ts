import request from "@/http/request";
// 获取图片列表
export function getImageList(pageNo: number, pageSize: number) {
  return request({
    url: `/basic/editor/group/image`,
    method: "get",
  });
}
// 保存上传的图片
export function saveUploadImageData(data: object) {
  return request({
    url: "/basic/editor/image/_upload",
    data,
    method: "post",
  });
}
// 删除用户上传的图片
export function deleteUploadImage(data: object) {
  return request({
    url: `/basic/editor/image/url`,
	data,
    method: "delete",
  });
}
// 获取贴纸列表
export function getPaperList(pageNo: number, pageSize: number, id: string) {
  return request({
    url: `/basic/editor/page/paster?current=${pageNo}&size=${pageSize}&id=${id}`,
    method: "get",
  });
}

// 获取相框列表
export function getPhotoFrameList(
  pageNo: number,
  pageSize: number,
  id: string
) {
  return request({
    url: `/basic/editor/page/frame?current=${pageNo}&size=${pageSize}&id=${id}`,
    method: "get",
  });
}

// 获取背景列表
export function getBackgroundImageList(pageNo: number, pageSize: number) {
  return request({
    url: `/basic/editor/page/background?current=${pageNo}&size=${pageSize}`,
    method: "get",
  });
}

// 获取模版信息
export function getTemplateData(id: string) {
  return request({
    url: `/basic/template/${id}`,
    method: "get",
  });
}

// 保存编辑器数据
export function saveEditorData(id: string | number, data: object) {
  return request({
    url: `/basic/template/content/${id}`,
    data,
    method: "put",
  });
}

// 图片base转url
export function base64ToUrl(base64: string, requestId: string) {
  return request({
    url: "/admin/sys-file/base64/upload",
    data: {
      data: base64,
      linkFlag: true,
      requestId: requestId,
    },
    method: "post",
  });
}

// 获取字体数据
export function getFontList() {
  return request({
    url: `/basic/editor/page/font?current=${1}&size=${1000}`,
    method: "get",
  });
}
