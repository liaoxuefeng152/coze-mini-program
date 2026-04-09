import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { CircleCheck } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

export default function CanceledPage() {
  useEffect(() => {
    // 清除本地存储的登录状态
    Taro.clearStorageSync()
  }, [])

  const handleBackToLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  return (
    <View className="canceled-page h-full bg-white flex flex-col items-center justify-center px-8">
      <View className="text-center">
        <View className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CircleCheck size={48} color="#22C55E" />
        </View>
        
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          账号已注销
        </Text>
        <Text className="text-base text-gray-500 mb-8">
          感谢您曾经的选择，祝您一切顺利
        </Text>

        <View className="bg-gray-50 rounded-lg p-4 mb-8">
          <Text className="text-sm text-gray-500">
            您的账号及所有相关数据已被永久删除
          </Text>
        </View>

        <Button
          className="w-full bg-[#FF6B8B] text-white rounded-full py-4"
          onClick={handleBackToLogin}
        >
          返回登录
        </Button>
      </View>
    </View>
  )
}
