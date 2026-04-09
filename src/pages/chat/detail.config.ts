export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '聊天详情' })
  : { navigationBarTitleText: '聊天详情' }
