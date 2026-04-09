import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft, CircleAlert } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import './index.css'

interface RejectedPost {
  id: string
  content: string
  coverUrl: string
  rejectReason: string
  rejectedAt: string
}

export default function PostRejectedPage() {
  // 模拟被驳回的动态数据
  const rejectedPost: RejectedPost = {
    id: '1',
    content: '今天的健身打卡...',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    rejectReason: '内容包含敏感词汇或疑似广告信息，请修改后重新发布',
    rejectedAt: '2024-01-15 14:30'
  }

  const handleReedit = () => {
    Taro.navigateTo({ url: '/pages/posts/publish?edit=true' })
  }

  const handleAppeal = () => {
    Taro.navigateTo({ url: '/pages/posts/appeal' })
  }

  return (
    <View className="post-rejected-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <Button variant="ghost" className="p-2" onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={20} color="#333333" />
        </Button>
        <Text className="text-lg font-semibold">审核结果</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4 border-red-200">
          <CardContent className="p-6 text-center">
            <View className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CircleAlert size={32} color="#EF4444" />
            </View>
            <Text className="text-xl font-bold text-red-500 mb-2">未通过审核</Text>
            <Text className="text-sm text-gray-500">您的动态内容不符合社区规范</Text>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-sm font-medium text-gray-500 mb-2">被驳回的内容</Text>
            <View className="flex gap-3 mb-3">
              <View className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                <View className="w-full h-full flex items-center justify-center">
                  <Text className="text-xs text-gray-400">图片</Text>
                </View>
              </View>
              <Text className="flex-1 text-sm text-gray-700 line-clamp-3">
                {rejectedPost.content}
              </Text>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-4">
            <Text className="text-sm font-medium text-red-500 mb-2">驳回原因</Text>
            <Text className="text-sm text-gray-700">
              {rejectedPost.rejectReason}
            </Text>
            <Text className="text-xs text-gray-400 mt-2">
              审核时间：{rejectedPost.rejectedAt}
            </Text>
          </CardContent>
        </Card>

        <View className="space-y-3">
          <Button
            className="w-full bg-[#FF6B8B] text-white rounded-full py-4"
            onClick={handleReedit}
          >
            重新编辑
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full py-4"
            onClick={handleAppeal}
          >
            去申诉
          </Button>
        </View>

        <View className="mt-6 bg-amber-50 rounded-lg p-4">
          <Text className="text-sm font-medium text-amber-700 mb-2">申诉说明</Text>
          <Text className="text-xs text-amber-600">
            如果您认为审核结果有误，可以提交申诉。申诉通过后，内容将恢复正常展示。每条动态最多可申诉2次。
          </Text>
        </View>
      </View>
    </View>
  )
}
