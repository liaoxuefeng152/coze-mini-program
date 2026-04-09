import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'

export default function ProfilePage() {
  useLoad(() => {
    console.log('Profile page loaded.')
  })

  return (
    <View className="profile-page h-full">
      <View className="p-4">
        <Text className="block text-2xl font-bold text-rose-500 mb-4">我的</Text>
        <Text className="block text-gray-500">个人中心功能开发中...</Text>
      </View>
    </View>
  )
}
