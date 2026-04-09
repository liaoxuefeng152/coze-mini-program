import { View, Text } from '@tarojs/components'
import { Heart } from 'lucide-react-taro'
import './index.css'

interface LoadingPageProps {
  title?: string
}

export default function LoadingPage({ title = '加载中...' }: LoadingPageProps) {
  return (
    <View className="loading-page h-full bg-white flex flex-col items-center justify-center">
      <View className="loading-container">
        <View className="heart-ring">
          {[...Array(8)].map((_, i) => (
            <View
              key={i}
              className="heart-dot"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-20px)`
              }}
            />
          ))}
        </View>
        <View className="heart-center">
          <Heart size={32} color="#FF6B8B" />
        </View>
      </View>
      
      <Text className="text-base text-gray-500 mt-6">{title}</Text>
      <Text className="text-xs text-gray-400 mt-2">遇见对的人</Text>
    </View>
  )
}
