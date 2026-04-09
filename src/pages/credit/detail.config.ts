export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '信用评分详情'
    })
  : { navigationBarTitleText: '信用评分详情' }
