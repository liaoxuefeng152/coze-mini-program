import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Heart, X, Info, Crown, Star, Search, MessageCircle, CircleCheck } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
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
  const users: UserProfile[] = [
    {
      id: '1',
      nickname: '小美',
      age: 26,
      height: 165,
      city: '北京',
      education: '本科',
      occupation: '产品经理',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      matchScore: 95,
      matchReasons: ['年龄相仿', '同在北京', '都喜欢健身', '星座匹配'],
      isVerified: true,
      hasPremium: true
    },
    {
      id: '2',
      nickname: '小芳',
      age: 28,
      height: 168,
      city: '上海',
      education: '硕士',
      occupation: '设计师',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      matchScore: 92,
      matchReasons: ['学历匹配', '都喜欢旅行', '品味相似'],
      isVerified: true,
      hasPremium: false
    },
    {
      id: '3',
      nickname: '小红',
      age: 25,
      height: 160,
      city: '深圳',
      education: '本科',
      occupation: '教师',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      matchScore: 88,
      matchReasons: ['都喜欢读书', '性格互补', '职业稳定'],
      isVerified: true,
      hasPremium: false
    },
    {
      id: '4',
      nickname: '小丽',
      age: 27,
      height: 163,
      city: '杭州',
      education: '本科',
      occupation: '运营专员',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      matchScore: 90,
      matchReasons: ['同在浙江', '都喜欢美食', '生活态度积极'],
      isVerified: true,
      hasPremium: true
    },
    {
      id: '5',
      nickname: '小雅',
      age: 24,
      height: 167,
      city: '成都',
      education: '本科',
      occupation: '护士',
      avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
      matchScore: 85,
      matchReasons: ['都喜欢宠物', '性格温和', '生活习惯健康'],
      isVerified: false,
      hasPremium: false
    },
    {
      id: '6',
      nickname: '小婷',
      age: 29,
      height: 170,
      city: '广州',
      education: '硕士',
      occupation: '医生',
      avatarUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
      matchScore: 93,
      matchReasons: ['高学历匹配', '职业稳定', '家庭观念强'],
      isVerified: true,
      hasPremium: true
    },
    {
      id: '7',
      nickname: '小雪',
      age: 23,
      height: 158,
      city: '武汉',
      education: '本科',
      occupation: '学生',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
      matchScore: 80,
      matchReasons: ['年龄相近', '都在学习', '充满活力'],
      isVerified: false,
      hasPremium: false
    },
    {
      id: '8',
      nickname: '小琳',
      age: 30,
      height: 166,
      city: '南京',
      education: '硕士',
      occupation: '律师',
      avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
      matchScore: 91,
      matchReasons: ['成熟稳重', '都有事业心', '价值观一致'],
      isVerified: true,
      hasPremium: true
    }
  ]
  const [loading, setLoading] = useState(false)
  const [remainingLikes, setRemainingLikes] = useState(30)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const currentUser = users[currentUserIndex]

  const handleLike = async () => {
    if (!currentUser || remainingLikes <= 0) {
      Taro.showToast({ title: '喜欢次数不足', icon: 'none' })
      return
    }

    setRemainingLikes(prev => prev - 1)

    const nextIndex = currentUserIndex + 1
    if (nextIndex < users.length) {
      setCurrentUserIndex(nextIndex)
    } else {
      setCurrentUserIndex(0)
    }

    Taro.showToast({ title: '已喜欢', icon: 'success' })
  }

  const handlePass = async () => {
    if (!currentUser) return

    const nextIndex = currentUserIndex + 1
    if (nextIndex < users.length) {
      setCurrentUserIndex(nextIndex)
    } else {
      setCurrentUserIndex(0)
    }
  }

  const handleViewProfile = () => {
    if (!currentUser) return
    Taro.navigateTo({ url: `/pages/profile/detail?id=${currentUser.id}` })
  }

  const handleSearch = () => {
    Taro.showToast({ title: '搜索功能开发中', icon: 'none' })
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
                </View>

                <View className="user-info-section p-4">
                  {/* 用户基本信息 */}
                  <View className="mb-4">
                    <Text className="text-2xl font-bold text-gray-900 mb-1">
                      {currentUser.nickname}, {currentUser.age}
                    </Text>
                    <View className="flex items-center gap-3 mb-2">
                      <Text className="text-sm text-gray-600">{currentUser.height}cm</Text>
                      <Text className="text-sm text-gray-600">·</Text>
                      <Text className="text-sm text-gray-600">{currentUser.city}</Text>
                      <Text className="text-sm text-gray-600">·</Text>
                      <Text className="text-sm text-gray-600">{currentUser.occupation}</Text>
                    </View>
                    <View className="flex items-center gap-2">
                      <Star size={16} color="#FF6B8B" />
                      <Text className="text-[#FF6B8B] font-bold text-base">
                        匹配度 {currentUser.matchScore}分
                      </Text>
                    </View>
                  </View>

                  {/* 匹配原因 */}
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

                  {/* 操作按钮 */}
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
