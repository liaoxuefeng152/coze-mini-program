export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '高信用认证'
    })
  : { navigationBarTitleText: '高信用认证' }
