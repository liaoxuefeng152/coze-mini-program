export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '加载中' })
  : { navigationBarTitleText: '加载中' }
