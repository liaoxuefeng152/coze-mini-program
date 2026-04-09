export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '圈子动态' })
  : { navigationBarTitleText: '圈子动态' }
