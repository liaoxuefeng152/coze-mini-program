import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Heart, X, Info, Crown, Star } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
      const res = await Taro.request({
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
      await Taro.request({
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
      await Taro.request({
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

  return (
    <View className="index-page h-full bg-gray-50 flex flex-col">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900">推荐</Text>
          <Text className="text-sm text-gray-500">发现适合的TA</Text>
        </View>
        <Badge className="bg-rose-50 text-rose-600 px-3 py-1">
          <Text>剩余喜欢 {remainingLikes} 次</Text>
        </Badge>
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
                    className="w-full h-96"
                  />
                  {currentUser.isVerified && (
                    <Badge className="absolute top-4 left-4 bg-blue-500 text-white flex items-center gap-1">
                      <Star size={12} color="#ffffff" />
                      <Text>已认证</Text>
                    </Badge>
                  )}
                  {currentUser.hasPremium && (
                    <Badge className="absolute top-4 right-4 bg-amber-500 text-white flex items-center gap-1">
                      <Crown size={12} color="#ffffff" />
                      <Text>VIP</Text>
                    </Badge>
                  )}
                  <View className="match-info absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <Text className="text-white text-xl font-bold mb-1">
                      {currentUser.nickname}, {currentUser.age}
                    </Text>
                    <View className="flex items-center gap-2 mb-2">
                      <Text className="text-white/90 text-sm">{currentUser.height}cm</Text>
                      <Text className="text-white/90 text-sm">{currentUser.city}</Text>
                      <Text className="text-white/90 text-sm">{currentUser.occupation}</Text>
                    </View>
                    <View className="flex items-center gap-1">
                      <Star size={14} color="#fbbf24" />
                      <Text className="text-rose-300 font-semibold">
                        匹配度 {currentUser.matchScore}分
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="info-section p-4">
                  <View className="mb-4">
                    <View className="flex items-center gap-2 mb-2">
                      <Info size={16} color="#f43f5e" />
                      <Text className="font-semibold">匹配原因</Text>
                    </View>
                    <View className="flex flex-wrap gap-2">
                      {currentUser.matchReasons.map((reason, index) => (
                        <Badge key={index} variant="secondary" className="bg-rose-50 text-rose-600">
                          {reason}
                        </Badge>
                      ))}
                    </View>
                  </View>

                  <View className="actions flex gap-3">
                    <View style={{ flex: 1 }}>
                      <Button
                        variant="outline"
                        className="w-full rounded-full py-3 flex items-center justify-center gap-2 border-gray-300 text-gray-700"
                        onClick={handlePass}
                      >
                        <X size={20} color="#6b7280" />
                        <Text>跳过</Text>
                      </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button
                        className="w-full bg-rose-500 text-white rounded-full py-3 flex items-center justify-center gap-2"
                        onClick={handleLike}
                      >
                        <Heart size={20} color="#ffffff" />
                        <Text>喜欢</Text>
                      </Button>
                    </View>
                  </View>

                  <Button
                    variant="ghost"
                    className="w-full mt-3 text-rose-500"
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
            <Heart size={48} color="#f43f5e" />
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
