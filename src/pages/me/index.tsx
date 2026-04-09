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
    likesReceived: 156,
    matches: 42,
    chats: 28,
    posts: 15,
    circles: 6
  })
  const [creditScore] = useState(680)
  const [authLevel] = useState(3)

  const handleEditProfile = () => {
    Taro.navigateTo({ url: '/pages/profile/edit' })
  }

  const handleViewProfile = () => {
    Taro.navigateTo({ url: '/pages/profile/detail?self=true' })
  }

  const handlePageNavigate = (path: string) => {
    if (path === '/pages/messages/index') {
      Taro.navigateTo({ url: '/pages/chat/list' })
    } else {
      Taro.navigateTo({ url: path })
    }
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
    <View className="profile-page h-full bg-[#FAFAFA]">
      <View className="content h-full overflow-y-auto">
        <View className="profile-section relative">
          <View className="cover-gradient h-32 bg-gradient-to-br from-[#FF6B8B] to-[#FF8FAB]" />
          <View className="profile-info -mt-16 px-4">
            <View className="flex items-end gap-4 mb-4">
              <View onClick={handleViewProfile}>
                <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                  <AvatarFallback>我</AvatarFallback>
                </Avatar>
              </View>
              <View className="flex-1 pb-2">
                <View className="flex items-center gap-2 mb-1">
                  <Text className="text-xl font-bold">小可爱</Text>
                  <Badge className={authBadge.color}>{authBadge.text}</Badge>
                </View>
                <Text className="text-sm text-gray-500">ID: 12345678</Text>
                <Text className="text-xs text-gray-400 mt-1">北京 · 26岁 · 165cm</Text>
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
              爱生活，爱运动，期待遇到对的人。喜欢健身、旅行、美食，希望你是个有趣的人~
            </Text>

            <Card className="stats-card mb-4">
              <CardContent className="p-4">
                <View className="grid grid-cols-5 gap-2">
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-[#FF6B8B]">
                      {userStats.likesReceived}
                    </Text>
                    <Text className="text-xs text-gray-500">被喜欢</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-[#FF6B8B]">
                      {userStats.matches}
                    </Text>
                    <Text className="text-xs text-gray-500">匹配</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-[#FF6B8B]">
                      {userStats.chats}
                    </Text>
                    <Text className="text-xs text-gray-500">聊天</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-[#FF6B8B]">
                      {userStats.posts}
                    </Text>
                    <Text className="text-xs text-gray-500">动态</Text>
                  </View>
                  <View className="stat-item text-center">
                    <Text className="block text-lg font-bold text-[#FF6B8B]">
                      {userStats.circles}
                    </Text>
                    <Text className="text-xs text-gray-500">圈子</Text>
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
                  <Heart size={20} color="#FF6B8B" />
                  <Text className="text-base">喜欢与匹配</Text>
                </View>
                <ChevronRight size={18} color="#999999" />
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/posts/index')}>
                <View className="flex items-center gap-3">
                  <FileText size={20} color="#10B981" />
                  <Text className="text-base">我的动态</Text>
                </View>
                <Badge className="bg-[#FF6B8B] text-white">{userStats.posts}</Badge>
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/circles/index')}>
                <View className="flex items-center gap-3">
                  <Star size={20} color="#F59E0B" />
                  <Text className="text-base">我的圈子</Text>
                </View>
                <Badge className="bg-[#FF6B8B] text-white">{userStats.circles}</Badge>
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/auth/index')}>
                <View className="flex items-center gap-3">
                  <Shield size={20} color="#8B5CF6" />
                  <Text className="text-base">认证中心</Text>
                </View>
                <Badge className="bg-amber-500 text-white">高信用</Badge>
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/credit/index')}>
                <View className="flex items-center gap-3">
                  <CreditCard size={20} color="#F59E0B" />
                  <Text className="text-base">信用积分</Text>
                </View>
                <View className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700">{creditScore}分</Badge>
                  <ChevronRight size={18} color="#999999" />
                </View>
              </View>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-0">
              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/favorites/index')}>
                <View className="flex items-center gap-3">
                  <Star size={20} color="#F59E0B" />
                  <Text className="text-base">我的收藏</Text>
                </View>
                <ChevronRight size={18} color="#999999" />
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/chat/list')}>
                <View className="flex items-center gap-3">
                  <User size={20} color="#3B82F6" />
                  <Text className="text-base">消息</Text>
                </View>
                <Badge className="bg-[#FF6B8B] text-white">{userStats.chats}</Badge>
              </View>

              <Separator />

              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/blocklist/index')}>
                <View className="flex items-center gap-3">
                  <Shield size={20} color="#EF4444" />
                  <Text className="text-base">黑名单</Text>
                </View>
                <ChevronRight size={18} color="#999999" />
              </View>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-0">
              <View className="menu-item flex items-center justify-between p-4" onClick={() => handlePageNavigate('/pages/feedback/index')}>
                <View className="flex items-center gap-3">
                  <FileText size={20} color="#10B981" />
                  <Text className="text-base">意见反馈</Text>
                </View>
                <ChevronRight size={18} color="#999999" />
              </View>
            </CardContent>
          </Card>

          <Card className="mb-20">
            <CardContent className="p-0">
              <View className="menu-item flex items-center justify-between p-4" onClick={handleSettings}>
                <View className="flex items-center gap-3">
                  <Settings size={20} color="#6B7280" />
                  <Text className="text-base">设置</Text>
                </View>
                <ChevronRight size={18} color="#999999" />
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  )
}
