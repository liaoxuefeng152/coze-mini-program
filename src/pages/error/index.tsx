import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { CircleAlert, WifiOff, ShieldAlert, Ban } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

type ErrorType = 'network' | 'server' | 'permission' | 'banned' | 'custom'

interface ErrorPageProps {
  type?: ErrorType
  title?: string
  description?: string
}

const errorConfig = {
  network: {
    icon: WifiOff,
    title: '网络异常',
    description: '请检查网络连接后重试'
  },
  server: {
    icon: CircleAlert,
    title: '服务异常',
    description: '服务器开小差了，请稍后再试'
  },
  permission: {
    icon: ShieldAlert,
    title: '无权限访问',
    description: '您没有权限查看此内容'
  },
  banned: {
    icon: Ban,
    title: '账号已被封禁',
    description: '如有疑问请联系客服'
  },
  custom: {
    icon: CircleAlert,
    title: '出错了',
    description: '请稍后再试'
  }
}

export default function ErrorPage({
  type = 'custom',
  title,
  description
}: ErrorPageProps) {
  const config = errorConfig[type] || errorConfig.custom
  const IconComponent = config.icon

  const handleRefresh = () => {
    Taro.navigateBack()
  }

  const handleHome = () => {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  return (
    <View className="error-page h-full bg-[#FAFAFA] flex flex-col items-center justify-center px-8">
      <View className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <IconComponent size={48} color="#EF4444" />
      </View>
      
      <Text className="text-xl font-bold text-gray-900 mb-2">
        {title || config.title}
      </Text>
      <Text className="text-sm text-gray-500 mb-8 text-center">
        {description || config.description}
      </Text>

      <View className="flex gap-3">
        <Button
          variant="outline"
          className="px-6 py-3 rounded-full"
          onClick={handleRefresh}
        >
          返回
        </Button>
        <Button
          className="bg-[#FF6B8B] text-white px-6 py-3 rounded-full"
          onClick={handleHome}
        >
          刷新重试
        </Button>
      </View>
    </View>
  )
}
