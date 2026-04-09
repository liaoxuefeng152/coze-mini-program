export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '注销完成' })
  : { navigationBarTitleText: '注销完成' }
