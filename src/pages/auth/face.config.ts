export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '人脸核验'
    })
  : { navigationBarTitleText: '人脸核验' }
