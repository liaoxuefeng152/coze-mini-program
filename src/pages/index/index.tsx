import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Heart, X, Info, Crown, Star, Search, MessageCircle, CircleCheck } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Network } from '@/network'
import './index.css'

interface UserProfile {
  id: string
  nickname: string
  age: number
  height: number
  city: string
  education: string
  occupation: string
  avatarUrl: string
  matchScore: number
  matchReasons: string[]
  isVerified: boolean
  hasPremium: boolean
}

export default function IndexPage() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [remainingLikes, setRemainingLikes] = useState(30)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/user/recommend',
        method: 'GET'
      })

      if (res.statusCode === 200 && res.data?.data?.users) {
        setUsers(res.data.data.users)
      }
    } catch (error) {
      console.error('加载推荐失败', error)
    }
    setLoading(false)
  }

  const currentUser = users[currentUserIndex]

  const handleLike = async () => {
    if (!currentUser || remainingLikes <= 0) {
      Taro.showToast({ title: '喜欢次数不足', icon: 'none' })
      return
    }

    try {
      await Network.request({
        url: '/api/user/like',
        method: 'POST',
        data: { targetUserId: currentUser.id }
      })

      setRemainingLikes(prev => prev - 1)

      const nextIndex = currentUserIndex + 1
      if (nextIndex < users.length) {
        setCurrentUserIndex(nextIndex)
      } else {
        loadUsers()
      }

      Taro.showToast({ title: '已喜欢', icon: 'success' })
    } catch (error) {
      console.error('喜欢失败', error)
    }
  }

  const handlePass = async () => {
    if (!currentUser) return

    try {
      await Network.request({
        url: '/api/user/pass',
        method: 'POST',
        data: { targetUserId: currentUser.id }
      })

      const nextIndex = currentUserIndex + 1
      if (nextIndex < users.length) {
        setCurrentUserIndex(nextIndex)
      } else {
        loadUsers()
      }
    } catch (error) {
      console.error('跳过失败', error)
    }
  }

  const handleViewProfile = () => {
    if (!currentUser) return
    Taro.navigateTo({ url: `/pages/profile/detail?id=${currentUser.id}` })
  }

  const handleSearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' })
  }

  const handleMessages = () => {
    Taro.navigateTo({ url: '/pages/chat/list' })
  }

  return (
    <View className="index-page h-full bg-[#FAFAFA] flex flex-col">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <View className="flex items-center gap-3">
          <Search size={20} color="#333333" onClick={handleSearch} />
          <Text className="text-xl font-bold text-gray-900">推荐</Text>
        </View>
        <View className="flex items-center gap-2">
          <MessageCircle size={20} color="#333333" onClick={handleMessages} />
          <Badge className="bg-[#FF6B8B] text-white px-3 py-1">
            <Text>剩余 {remainingLikes} 次</Text>
          </Badge>
        </View>
      </View>

      <View className="content flex-1 overflow-y-auto">
        {loading ? (
          <View className="flex items-center justify-center h-64">
            <Text className="text-gray-500">加载中...</Text>
          </View>
        ) : currentUser ? (
          <View className="card-container p-4">
            <Card className="user-card overflow-hidden">
              <CardContent className="p-0">
                <View className="relative">
                  <Image
                    src={currentUser.avatarUrl}
                    mode="aspectFill"
                    className="w-full h-[450px]"
                  />
                  {currentUser.isVerified && (
                    <Badge className="absolute top-4 left-4 bg-[#4CAF50] text-white flex items-center gap-1">
                      <CircleCheck size={12} color="#ffffff" />
                      <Text>已认证</Text>
                    </Badge>
                  )}
                  {currentUser.hasPremium && (
                    <Badge className="absolute top-4 right-4 bg-[#FF9800] text-white flex items-center gap-1">
                      <Crown size={12} color="#ffffff" />
                      <Text>VIP</Text>
                    </Badge>
                  )}
                  <View className="match-info absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                    <Text className="text-white text-2xl font-bold mb-2">
                      {currentUser.nickname}, {currentUser.age}
                    </Text>
                    <View className="flex items-center gap-3 mb-2">
                      <Text className="text-white text-base">{currentUser.height}cm</Text>
                      <Text className="text-white text-base">{currentUser.city}</Text>
                      <Text className="text-white text-base">{currentUser.occupation}</Text>
                    </View>
                    <View className="flex items-center gap-1">
                      <Star size={16} color="#FF6B8B" />
                      <Text className="text-[#FF6B8B] font-bold text-lg">
                        匹配度 {currentUser.matchScore}分
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="info-section p-4">
                  <View className="mb-4">
                    <View className="flex items-center gap-2 mb-2">
                      <Info size={16} color="#FF6B8B" />
                      <Text className="font-semibold text-base">匹配原因</Text>
                    </View>
                    <View className="flex flex-wrap gap-2">
                      {currentUser.matchReasons.map((reason, index) => (
                        <Badge key={index} variant="secondary" className="bg-[#FFF0F5] text-[#FF6B8B] px-3 py-1">
                          {reason}
                        </Badge>
                      ))}
                    </View>
                  </View>

                  <View className="actions flex gap-3">
                    <View style={{ flex: 1 }}>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl py-3 flex items-center justify-center gap-2 border-gray-300 text-gray-700"
                        onClick={handlePass}
                      >
                        <X size={24} color="#999999" />
                        <Text>跳过</Text>
                      </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button
                        className="w-full bg-[#FF6B8B] text-white rounded-xl py-3 flex items-center justify-center gap-2"
                        onClick={handleLike}
                      >
                        <Heart size={24} color="#ffffff" />
                        <Text>喜欢</Text>
                      </Button>
                    </View>
                  </View>

                  <Button
                    variant="ghost"
                    className="w-full mt-3 text-[#FF6B8B]"
                    onClick={handleViewProfile}
                  >
                    <Text>查看详细资料</Text>
                  </Button>
                </View>
              </CardContent>
            </Card>
          </View>
        ) : (
          <View className="empty-state flex flex-col items-center justify-center h-64 px-4">
            <Heart size={48} color="#FF6B8B" />
            <Text className="text-lg font-semibold text-gray-900 mt-4">
              暂无推荐用户
            </Text>
            <Text className="text-sm text-gray-500 mt-2 text-center">
              请完善资料，获取更多推荐
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
