// import imageCom from '@/components/image/index.vue'

function createEditorConfig() {
    const componentList = []
    const componentMap = {}

    return {
        componentList,
        componentMap, 
        register: (component) => {
            componentList.push(component)
            componentMap[component.key] = component
        }
    }
}

export let registerConfig = createEditorConfig()
console.log('registerConfig---', registerConfig)
registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: () => '渲染文本',
    key: 'text'
})

registerConfig.register({
    label: '图片',
    preview: () => <imageCom></imageCom>,
    render: () => <imageCom></imageCom>,
    // preview: () => 'tupian',
    // render: () => 'tupian',
    key: 'image' 
}) 