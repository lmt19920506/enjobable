import { useClipboard, useFileDialog, useBase64 } from '@vueuse/core';
interface Font {
	type: string;
	fontFamily: string;
}

/**
 * @description: 图片文件转字符串
 * @param {Blob|File} file 文件
 * @return {String}
 */
export function getImgStr(file: File | Blob): Promise<FileReader['result']> {
	return useBase64(file).promise.value;
}
/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export function selectFiles(options: { accept?: string; capture?: string; multiple?: boolean }): Promise<FileList | null> {
	return new Promise((resolve) => {
		console.log('useFileDialog---', useFileDialog({ accept: '.psd', multiple: false }));
		// const { onChange, open } = useFileDialog(options);
		// onChange((files) => {
		//   resolve(files);
		// });
		open();
	});
}

export async function toArrayBuffer(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			const arrayBuffer = reader.result;
			resolve({ arrayBuffer });
		};
		reader.readAsArrayBuffer(file);
	});
}

/**
 * 获取文件后缀
 * @param file 文件
 */
export function getFileExt(file: File | Blob | any) {
	let fileExtension = '';
	if (file.name.lastIndexOf('.') > -1) {
		fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1);
	}
	return fileExtension;
}

/**
 * 判断文件类型是否在列表内
 * @param file 文件
 * @param fileTypes 文件类型数组
 */
export function checkFileExt(file: File | Blob, fileTypes: any | []) {
	const ext = getFileExt(file);
	// console.log('ext---', ext)
	const isTypeOk = fileTypes.some((type: string) => {
		if (file.type.indexOf(type) > -1) return true;
		if (ext && ext.indexOf(type) > -1) return true;
		return false;
	});
	return isTypeOk;
}
