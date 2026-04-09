import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Shield } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import './index.css'

interface BlockedUser {
  id: string
  nickname: string
  avatarUrl: string
  blockedAt: string
}

export default function BlocklistPage() {
  const [blockedUsers] = useState<BlockedUser[]>([
    {
      id: '1',
      nickname: '用户A',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      blockedAt: '2024-01-15'
    },
    {
      id: '2',
      nickname: '用户B',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      blockedAt: '2024-01-10'
    }
  ])

  const handleUnblock = () => {
    Taro.showModal({
      title: '确认解除拉黑',
      content: '确定要解除对该用户的拉黑吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已解除拉黑', icon: 'success' })
        }
      }
    })
  }

  return (
    <View className="blocklist-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">黑名单</Text>
        </View>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        <View className="mb-4">
          <Text className="text-sm text-gray-500">
            拉黑后，对方无法给你发送消息，也无法看到你的动态
          </Text>
        </View>

        {blockedUsers.length > 0 ? (
          blockedUsers.map(user => (
            <Card key={user.id} className="mb-3">
              <CardContent className="p-4">
                <View className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <View className="flex-1">
                    <Text className="text-base font-semibold">{user.nickname}</Text>
                    <Text className="text-xs text-gray-500">拉黑于 {user.blockedAt}</Text>
                  </View>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnblock}
                  >
                    <Text>解除拉黑</Text>
                  </Button>
                </View>
              </CardContent>
            </Card>
          ))
        ) : (
          <View className="empty-state text-center py-12">
            <Shield size={48} color="#999999" />
            <Text className="text-lg font-semibold text-gray-900 mt-4">黑名单为空</Text>
            <Text className="text-sm text-gray-500 mt-2">还没有拉黑任何用户</Text>
          </View>
        )}
      </View>
    </View>
  )
}
