export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '注销申请中' })
  : { navigationBarTitleText: '注销申请中' }
