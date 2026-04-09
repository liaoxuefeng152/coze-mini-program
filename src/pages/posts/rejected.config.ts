export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '审核结果' })
  : { navigationBarTitleText: '审核结果' }
