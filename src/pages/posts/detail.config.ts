export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '动态详情' })
  : { navigationBarTitleText: '动态详情' }
