export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: 'AI相亲',
      enablePullDownRefresh: true
    })
  : { navigationBarTitleText: 'AI相亲', enablePullDownRefresh: true }
