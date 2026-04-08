export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '人工审核'
    })
  : { navigationBarTitleText: '人工审核' }
