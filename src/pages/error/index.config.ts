export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '出错了' })
  : { navigationBarTitleText: '出错了' }
