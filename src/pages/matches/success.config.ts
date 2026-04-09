export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '匹配成功' })
  : { navigationBarTitleText: '匹配成功' }
