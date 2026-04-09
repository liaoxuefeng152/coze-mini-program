export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '黑名单' })
  : { navigationBarTitleText: '黑名单' }
