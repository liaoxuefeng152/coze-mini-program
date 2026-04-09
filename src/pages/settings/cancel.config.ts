export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '注销账号' })
  : { navigationBarTitleText: '注销账号' }
