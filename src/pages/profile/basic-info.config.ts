export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '完善资料'
    })
  : { navigationBarTitleText: '完善资料' }
