export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '空状态' })
  : { navigationBarTitleText: '空状态' }
