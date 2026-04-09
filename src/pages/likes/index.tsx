import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Star } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

interface LikeUser {
  id: string
  nickname: string
  age: number
  avatarUrl: string
  matchScore: number
  time: string
  isMutual: boolean
}

export default function LikesPage() {
  const [activeTab, setActiveTab] = useState('my-likes')
  const [myLikes] = useState<LikeUser[]>([
    {
      id: '1',
      nickname: '小美',
      age: 26,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      matchScore: 92,
      time: '2小时前',
      isMutual: true
    },
    {
      id: '2',
      nickname: '小红',
      age: 25,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      matchScore: 85,
      time: '1天前',
      isMutual: false
    }
  ])
  const [likedMe] = useState<LikeUser[]>([
    {
      id: '3',
      nickname: '小芳',
      age: 28,
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      matchScore: 88,
      time: '3小时前',
      isMutual: false
    }
  ])
  const [matches] = useState<LikeUser[]>([
    {
      id: '1',
      nickname: '小美',
      age: 26,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      matchScore: 92,
      time: '今天',
      isMutual: true
    }
  ])

  const handleChat = (userId: string) => {
    Taro.navigateTo({ url: `/pages/chat/index?userId=${userId}` })
  }

  const handleLike = () => {
    Taro.showToast({ title: '已喜欢', icon: 'success' })
  }

  const renderUserCard = (user: LikeUser, showMatchScore = false) => (
    <Card className="user-card mb-3">
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
              {user.isMutual && (
                <Badge className="bg-rose-500 text-white">
                  <Star size={12} color="#ffffff" />
                  <Text> 双向匹配</Text>
                </Badge>
              )}
            </View>
            <Text className="text-sm text-gray-500 mb-2">{user.time}</Text>
            {showMatchScore && (
              <Text className="text-sm text-rose-500">
                匹配度 {user.matchScore}分
              </Text>
            )}
          </View>
        </View>
        <View className="action-buttons mt-3 flex gap-2">
          {user.isMutual ? (
            <Button
              className="flex-1 bg-rose-500 text-white rounded-full py-2 flex items-center justify-center gap-1"
              onClick={() => handleChat(user.id)}
            >
              <MessageCircle size={16} color="#ffffff" />
              <Text>聊天</Text>
            </Button>
          ) : (
            <Button
              className="flex-1 bg-rose-500 text-white rounded-full py-2 flex items-center justify-center gap-1"
              onClick={handleLike}
            >
              <Heart size={16} color="#ffffff" />
              <Text>喜欢</Text>
            </Button>
          )}
          <Button
            className="bg-gray-200 text-gray-700 rounded-full px-4"
            onClick={() => Taro.navigateTo({ url: `/pages/profile/detail?id=${user.id}` })}
          >
            <Text>查看</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  )

  return (
    <View className="likes-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">喜欢与匹配</Text>
      </View>

      <View className="content h-full overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 bg-gray-200 p-1 rounded-xl">
            <TabsTrigger value="my-likes" className="data-[state=active]:bg-white data-[state=active]:shadow">
              我喜欢
            </TabsTrigger>
            <TabsTrigger value="liked-me" className="data-[state=active]:bg-white data-[state=active]:shadow">
              喜欢我
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-white data-[state=active]:shadow">
              双向匹配
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-likes" className="mt-4 px-4">
            {myLikes.length > 0 ? (
              myLikes.map(user => renderUserCard(user, true))
            ) : (
              <View className="empty-state text-center py-12">
                <Heart size={48} color="#f43f5e" />
                <Text className="text-lg font-semibold text-gray-900 mt-4">还没有喜欢的用户</Text>
                <Text className="text-sm text-gray-500 mt-2">去首页看看吧</Text>
              </View>
            )}
          </TabsContent>

          <TabsContent value="liked-me" className="mt-4 px-4">
            {likedMe.length > 0 ? (
              likedMe.map(user => renderUserCard(user, true))
            ) : (
              <View className="empty-state text-center py-12">
                <Heart size={48} color="#9ca3af" />
                <Text className="text-lg font-semibold text-gray-900 mt-4">还没有人喜欢你</Text>
                <Text className="text-sm text-gray-500 mt-2">完善资料，增加曝光</Text>
              </View>
            )}
          </TabsContent>

          <TabsContent value="matches" className="mt-4 px-4">
            {matches.length > 0 ? (
              matches.map(user => renderUserCard(user, true))
            ) : (
              <View className="empty-state text-center py-12">
                <Star size={48} color="#f43f5e" />
                <Text className="text-lg font-semibold text-gray-900 mt-4">还没有双向匹配</Text>
                <Text className="text-sm text-gray-500 mt-2">多喜欢一些用户吧</Text>
              </View>
            )}
          </TabsContent>
        </Tabs>
      </View>
    </View>
  )
}
