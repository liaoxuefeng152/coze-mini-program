export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '基础认证'
    })
  : { navigationBarTitleText: '基础认证' }
