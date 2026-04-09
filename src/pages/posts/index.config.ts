export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '动态'
    })
  : { navigationBarTitleText: '动态' }
