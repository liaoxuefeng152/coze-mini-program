import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'

export default function CirclesPage() {
  useLoad(() => {
    console.log('Circles page loaded.')
  })

  return (
    <View className="circles-page h-full">
      <View className="p-4">
        <Text className="block text-2xl font-bold text-rose-500 mb-4">兴趣圈子</Text>
        <Text className="block text-gray-500">圈子功能开发中...</Text>
      </View>
    </View>
  )
}
