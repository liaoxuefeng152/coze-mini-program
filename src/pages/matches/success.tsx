import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { Heart, Sparkles } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './success.css'

interface MatchUser {
  id: string
  nickname: string
  avatarUrl: string
  commonCircles: string[]
}

export default function MatchSuccessPage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [matchUser] = useState<MatchUser>({
    id: '1',
    nickname: '小美',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    commonCircles: ['健身运动', '旅行户外']
  })

  useEffect(() => {
    // 3秒后关闭动画
    const timer = setTimeout(() => {
      setShowAnimation(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleChat = () => {
    Taro.navigateTo({ url: `/pages/chat/detail?id=${matchUser.id}` })
  }

  const handleBack = () => {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  return (
    <View className="match-success-page h-full bg-gradient-to-b from-[#FFF0F5] to-white flex flex-col items-center justify-center">
      {/* 动画背景 */}
      {showAnimation && (
        <View className="animation-overlay absolute inset-0 flex items-center justify-center">
          <View className="hearts-container">
            {[...Array(6)].map((_, i) => (
              <View
                key={i}
                className="heart-float"
                style={{
                  left: `${15 + i * 14}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                <Heart size={24} color="#FF6B8B" />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 主内容 */}
      <View className="content text-center px-8">
        <View className="mb-8">
          <Sparkles size={48} color="#FF6B8B" />
        </View>

        <Text className="text-3xl font-bold text-gray-900 mb-2">
          匹配成功！
        </Text>
        <Text className="text-base text-gray-500 mb-8">
          你们互相喜欢，可以开始聊天了
        </Text>

        {/* 头像 */}
        <View className="flex items-center justify-center gap-4 mb-8">
          <View className="avatar-container">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              mode="aspectFill"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </View>
          <View className="match-heart w-10 h-10 bg-[#FF6B8B] rounded-full flex items-center justify-center">
            <Heart size={20} color="#ffffff" />
          </View>
          <View className="avatar-container">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              mode="aspectFill"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </View>
        </View>

        {/* 共同圈子 */}
        <View className="mb-8">
          <Text className="text-sm text-gray-500 mb-2">共同兴趣</Text>
          <View className="flex items-center justify-center gap-2">
            {matchUser.commonCircles.map((circle, index) => (
              <View
                key={index}
                className="px-3 py-1 bg-[#FFF0F5] rounded-full"
              >
                <Text className="text-sm text-[#FF6B8B]">{circle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 按钮 */}
        <View className="w-full space-y-3">
          <Button
            className="w-full bg-[#FF6B8B] text-white rounded-full py-4 text-lg"
            onClick={handleChat}
          >
            <Heart size={20} color="#ffffff" />
            <Text className="ml-2">立即聊天</Text>
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full py-4"
            onClick={handleBack}
          >
            返回首页
          </Button>
        </View>
      </View>
    </View>
  )
}
