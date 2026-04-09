import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Heart } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import './index.css'

interface FavoriteUser {
  id: string
  nickname: string
  age: number
  avatarUrl: string
  city: string
  occupation: string
  addedAt: string
}

export default function FavoritesPage() {
  const [favorites] = useState<FavoriteUser[]>([
    {
      id: '1',
      nickname: '小美',
      age: 26,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      city: '北京',
      occupation: '产品经理',
      addedAt: '3天前'
    },
    {
      id: '2',
      nickname: '小红',
      age: 25,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      city: '上海',
      occupation: '教师',
      addedAt: '1周前'
    },
    {
      id: '3',
      nickname: '小芳',
      age: 28,
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      city: '深圳',
      occupation: '设计师',
      addedAt: '2周前'
    }
  ])

  const handleRemoveFavorite = () => {
    Taro.showModal({
      title: '确认取消收藏',
      content: '确定要取消收藏该用户吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已取消收藏', icon: 'success' })
        }
      }
    })
  }

  return (
    <View className="favorites-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">我的收藏</Text>
        </View>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        {favorites.length > 0 ? (
          favorites.map(user => (
            <Card key={user.id} className="mb-3">
              <CardContent className="p-4">
                <View className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <View className="flex-1">
                    <View className="flex items-center gap-2 mb-1">
                      <Text className="text-lg font-semibold">{user.nickname}</Text>
                      <Badge variant="secondary">{user.age}岁</Badge>
                    </View>
                    <Text className="text-sm text-gray-500 mb-1">
                      {user.city} · {user.occupation}
                    </Text>
                    <Text className="text-xs text-gray-400">收藏于 {user.addedAt}</Text>
                  </View>
                </View>
                <View className="action-buttons mt-3 flex gap-2">
                  <Button
                    className="flex-1 bg-[#FF6B8B] text-white py-2"
                    onClick={() => Taro.navigateTo({ url: `/pages/profile/detail?id=${user.id}` })}
                  >
                    <Text>查看资料</Text>
                  </Button>
                  <Button
                    variant="outline"
                    className="py-2"
                    onClick={handleRemoveFavorite}
                  >
                    <Text>取消收藏</Text>
                  </Button>
                </View>
              </CardContent>
            </Card>
          ))
        ) : (
          <View className="empty-state text-center py-12">
            <Heart size={48} color="#999999" />
            <Text className="text-lg font-semibold text-gray-900 mt-4">暂无收藏</Text>
            <Text className="text-sm text-gray-500 mt-2">去发现更多喜欢的用户吧</Text>
          </View>
        )}
      </View>
    </View>
  )
}
