export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '性格测试'
    })
  : { navigationBarTitleText: '性格测试' }
