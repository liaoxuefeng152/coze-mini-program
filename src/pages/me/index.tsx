import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings, Heart, Shield, CreditCard, User, FileText, Star, ChevronRight } from 'lucide-react-taro'
import { Separator } from '@/components/ui/separator'
import './index.css'

export default function ProfilePage() {
  const [userStats] = useState({
    likesReceived: 128,
    matches: 32,
    chats: 15,
    posts: 8
  })
  const [creditScore] = useState(680)
  const [authLevel] = useState(3)

  const handleEditProfile = () => {
    Taro.navigateTo({ url: '/pages/profile/edit' })
  }

  const handlePageNavigate = (path: string) => {
    Taro.navigateTo({ url: path })
  }

  const handleSettings = () => {
    Taro.navigateTo({ url: '/pages/settings/index' })
  }

  const getAuthBadge = () => {
    if (authLevel >= 3) return { text: '高信用', color: 'bg-amber-500 text-white' }
    if (authLevel >= 2) return { text: '已认证', color: 'bg-green-500 text-white' }
    return { text: '未认证', color: 'bg-gray-300 text-gray-700' }
  }

  const authBadge = getAuthBadge()

  return (
    <View className="profile-page h-full bg-gray-50">
      <View className="content h-full overflow-y-auto">
        <View className="profile-section relative">
          <View className="cover-gradient h-32 bg-gradient-to-br from-rose-400 to-rose-600" />
          <View className="profile-info -mt-16 px-4">
            <View className="flex items-end gap-4 mb-4">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src="https://via.placeholder.com/100" />
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <View className="flex-1 pb-2">
                <View className="flex items-center gap-2 mb-1">
                  <Text className="text-xl font-bold">昵称</Text>
                  <Badge className={authBadge.color}>{authBadge.text}</Badge>
                </View>
                <Text className="text-sm text-gray-500">ID: 12345678</Text>
              </View>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleEditProfile}
              >
                <Text>编辑</Text>
              </Button>
            </View>

            <Text className="text-sm text-gray-600 mb-4 line-clamp-2">
              爱生活，爱运动，期待遇到对的人
            </Text>

            <Card className="stats-card mb-4">
              <CardContent className="p-4">
                <View className="grid grid-cols-4 gap-2">
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-rose-500">
                      {userStats.likesReceived}
                    </Text>
                    <Text className="text-xs text-gray-500">被喜欢</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-rose-500">
                      {userStats.matches}
                    </Text>
                    <Text className="text-xs text-gray-500">匹配</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-rose-500">
                      {userStats.chats}
                    </Text>
                    <Text className="text-xs text-gray-500">聊天</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-rose-500">
                      {userStats.posts}
                    </Text>
                    <Text className="text-xs text-gray-500">动态</Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        </View>

        <View className="px-4">
          <Card className="mb-4">
            <CardContent className="p-0">
              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/likes/index')}>
                <View className="flex items-center gap-3">
                  <Heart size={20} color="#f43f5e" />
                  <Text className="text-base">喜欢与匹配</Text>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/profile/detail?self=true')}>
                <View className="flex items-center gap-3">
                  <User size={20} color="#3b82f6" />
                  <Text className="text-base">我的资料</Text>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/posts/my')}>
                <View className="flex items-center gap-3">
                  <FileText size={20} color="#10b981" />
                  <Text className="text-base">我的动态</Text>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/auth/index')}>
                <View className="flex items-center gap-3">
                  <Shield size={20} color="#8b5cf6" />
                  <Text className="text-base">认证中心</Text>
                </View>
                <Badge className="bg-rose-500 text-white">高信用</Badge>
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/credit/index')}>
                <View className="flex items-center gap-3">
                  <CreditCard size={20} color="#f59e0b" />
                  <Text className="text-base">信用积分</Text>
                </View>
                <View className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700">{creditScore}分</Badge>
                  <ChevronRight size={18} color="#9ca3af" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-0">
              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/favorites/index')}>
                <View className="flex items-center gap-3">
                  <Star size={20} color="#fbbf24" />
                  <Text className="text-base">我的收藏</Text>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </View>
            </CardContent>
          </Card>

          <Card className="mb-20">
            <CardContent className="p-0">
              <View className="menu-item flex items-center justify-between p-4" onClick={handleSettings}>
                <View className="flex items-center gap-3">
                  <Settings size={20} color="#6b7280" />
                  <Text className="text-base">设置</Text>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  )
}
