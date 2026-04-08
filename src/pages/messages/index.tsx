import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'

export default function MessagesPage() {
  useLoad(() => {
    console.log('Messages page loaded.')
  })

  return (
    <View className="messages-page h-full">
      <View className="p-4">
        <Text className="block text-2xl font-bold text-rose-500 mb-4">消息</Text>
        <Text className="block text-gray-500">消息功能开发中...</Text>
      </View>
    </View>
  )
}
