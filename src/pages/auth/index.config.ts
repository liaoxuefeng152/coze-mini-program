export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '实名认证' })
  : { navigationBarTitleText: '实名认证' }
