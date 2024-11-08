import request from '../request'

export const uploadImage = (file: any) => {
    return request({
        url: `/admin/sys-file/psd/upload`,
        method: 'post',
        data: file
    })
}