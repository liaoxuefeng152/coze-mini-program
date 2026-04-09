import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Heart, Search, MessageCircle, Users } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

type EmptyType = 'search' | 'message' | 'follow' | 'data' | 'custom'

interface EmptyPageProps {
  type?: EmptyType
  title?: string
  description?: string
  actionText?: string
  actionUrl?: string
}

const emptyConfig = {
  search: {
    icon: Search,
    title: '暂无搜索结果',
    description: '换个关键词试试吧'
  },
  message: {
    icon: MessageCircle,
    title: '还没有消息',
    description: '快去认识新朋友吧'
  },
  follow: {
    icon: Users,
    title: '还没有关注动态',
    description: '去发现感兴趣的人吧'
  },
  data: {
    icon: Heart,
    title: '暂无数据',
    description: '暂无相关内容'
  },
  custom: {
    icon: Heart,
    title: '暂无内容',
    description: '这里空空如也'
  }
}

export default function EmptyPage({
  type = 'custom',
  title,
  description,
  actionText,
  actionUrl
}: EmptyPageProps) {
  const config = emptyConfig[type] || emptyConfig.custom
  const IconComponent = config.icon

  const handleAction = () => {
    if (actionUrl) {
      if (actionUrl.startsWith('/pages')) {
        Taro.switchTab({ url: actionUrl })
      } else {
        Taro.navigateTo({ url: actionUrl })
      }
    } else {
      Taro.switchTab({ url: '/pages/index/index' })
    }
  }

  return (
    <View className="empty-page h-full bg-[#FAFAFA] flex flex-col items-center justify-center px-8">
      <View className="w-24 h-24 bg-[#FFF0F5] rounded-full flex items-center justify-center mb-6">
        <IconComponent size={48} color="#FF6B8B" />
      </View>
      
      <Text className="text-xl font-bold text-gray-900 mb-2">
        {title || config.title}
      </Text>
      <Text className="text-sm text-gray-500 mb-8 text-center">
        {description || config.description}
      </Text>

      <Button
        className="bg-[#FF6B8B] text-white rounded-full px-8 py-3"
        onClick={handleAction}
      >
        {actionText || '去看看'}
      </Button>
    </View>
  )
}
