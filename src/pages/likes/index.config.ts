export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '喜欢与匹配'
    })
  : { navigationBarTitleText: '喜欢与匹配' }
