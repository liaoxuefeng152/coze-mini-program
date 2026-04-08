export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '圈子'
    })
  : { navigationBarTitleText: '圈子' }
