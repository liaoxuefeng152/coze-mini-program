export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '信用中心' })
  : { navigationBarTitleText: '信用中心' }
