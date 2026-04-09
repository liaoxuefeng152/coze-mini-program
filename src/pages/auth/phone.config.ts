export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '绑定手机号' })
  : { navigationBarTitleText: '绑定手机号' }
