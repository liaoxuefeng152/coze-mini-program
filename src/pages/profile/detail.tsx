import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, MapPin, GraduationCap, Briefcase, Calendar } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import './detail.css'

export default function ProfileDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [isSelf, setIsSelf] = useState(false)

  useLoad((options) => {
    // 从路由参数中获取 self 参数
    setIsSelf(options.self === 'true')
  })

  const [user] = useState({
    id: '1',
    nickname: '小美',
    realName: '王小美',
    age: 26,
    gender: '女',
    height: 165,
    weight: 52,
    city: '北京',
    district: '朝阳区',
    education: '本科',
    occupation: '产品经理',
    company: '某互联网公司',
    income: '20-30万',
    maritalStatus: '未婚',
    hasChildren: false,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop'
    ],
    bio: '爱生活，爱运动，期待遇到对的人。喜欢健身、旅行、美食，希望你是个有趣的人~',
    interests: ['健身运动', '旅行户外', '美食探店', '电影追剧', '读书学习'],
    matchScore: 95,
    isVerified: true,
    isPremium: true,
    creditScore: 720,
    onlineStatus: 'online'
  })

  const handleLike = () => {
    setIsLiked(!isLiked)
    Taro.showToast({ title: isLiked ? '已取消喜欢' : '已喜欢', icon: 'success' })
  }

  const handleChat = () => {
    Taro.navigateTo({ url: `/pages/chat/detail?id=${user.id}` })
  }

  const handleShare = () => {
    Taro.showToast({ title: '分享成功', icon: 'success' })
  }

  const handleBlock = () => {
    Taro.showModal({
      title: '确认拉黑',
      content: '确定要拉黑该用户吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已拉黑', icon: 'success' })
        }
      }
    })
  }

  const handleEditProfile = () => {
    Taro.navigateTo({ url: '/pages/profile/edit' })
  }

  return (
    <View className="profile-detail-page h-full bg-[#FAFAFA] flex flex-col">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center justify-between">
          <View className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => Taro.navigateBack()}
            >
              <ArrowLeft size={20} color="#333333" />
            </Button>
            <Text className="text-lg font-semibold">{user.nickname}</Text>
          </View>
          <View className="flex items-center gap-2">
            {/* 不是自己的资料才显示分享和拉黑按钮 */}
            {!isSelf && (
              <>
                <Button variant="ghost" className="p-2" onClick={handleShare}>
                  <Share2 size={20} color="#999999" />
                </Button>
                <Button variant="ghost" className="p-2" onClick={handleBlock}>
                  <Text className="text-sm text-gray-600">拉黑</Text>
                </Button>
              </>
            )}
          </View>
        </View>
      </View>

      <View className="content flex-1 overflow-y-auto">
        <View className="profile-header bg-white px-4 py-6 mb-2">
          <View className="flex gap-4 mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.nickname[0]}</AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <View className="flex items-center gap-2 mb-2">
                <Text className="text-xl font-bold">{user.nickname}</Text>
                {user.isVerified && (
                  <Badge className="bg-green-500 text-white">已认证</Badge>
                )}
                {user.isPremium && (
                  <Badge className="bg-amber-500 text-white">VIP</Badge>
                )}
              </View>
              <Text className="text-sm text-gray-600 mb-1">
                {user.age}岁 · {user.gender} · {user.height}cm · {user.city}
              </Text>
              <View className="flex items-center gap-1">
                <Text className="text-sm text-[#FF6B8B] font-semibold">
                  匹配度 {user.matchScore}分
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-sm text-gray-600 mb-4 leading-relaxed">
            {user.bio}
          </Text>

          <View className="photos-grid grid grid-cols-5 gap-2 mb-4">
            {user.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                mode="aspectFill"
                className="w-full h-16 rounded-lg"
              />
            ))}
          </View>

          {/* 根据是否自己的资料显示不同的操作按钮 */}
          {isSelf ? (
            <View className="actions flex gap-3">
              <Button
                className="flex-1 bg-[#FF6B8B] text-white py-3 rounded-full"
                onClick={handleEditProfile}
              >
                <Text>编辑资料</Text>
              </Button>
            </View>
          ) : (
            <View className="actions flex gap-3">
              <Button
                className="flex-1 bg-[#FF6B8B] text-white py-3 rounded-full"
                onClick={handleChat}
              >
                <MessageCircle size={18} color="#ffffff" />
                <Text className="ml-1">聊天</Text>
              </Button>
              <Button
                variant={isLiked ? "default" : "outline"}
                className={`flex-1 py-3 rounded-full ${isLiked ? 'bg-rose-500 text-white' : ''}`}
                onClick={handleLike}
              >
                <Heart size={18} color={isLiked ? "#ffffff" : "#FF6B8B"} />
                <Text className="ml-1">{isLiked ? '已喜欢' : '喜欢'}</Text>
              </Button>
            </View>
          )}
        </View>

        <Card className="mb-2 mx-4 mt-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">基本信息</Text>
            <View className="info-grid grid grid-cols-2 gap-3">
              <View className="info-item flex items-center gap-2">
                <MapPin size={16} color="#999999" />
                <Text className="text-sm text-gray-600">地点</Text>
                <Text className="text-sm font-semibold">{user.city} {user.district}</Text>
              </View>
              <View className="info-item flex items-center gap-2">
                <GraduationCap size={16} color="#999999" />
                <Text className="text-sm text-gray-600">学历</Text>
                <Text className="text-sm font-semibold">{user.education}</Text>
              </View>
              <View className="info-item flex items-center gap-2">
                <Briefcase size={16} color="#999999" />
                <Text className="text-sm text-gray-600">职业</Text>
                <Text className="text-sm font-semibold">{user.occupation}</Text>
              </View>
              <View className="info-item flex items-center gap-2">
                <Calendar size={16} color="#999999" />
                <Text className="text-sm text-gray-600">婚姻</Text>
                <Text className="text-sm font-semibold">{user.maritalStatus}</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-2 mx-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">兴趣标签</Text>
            <View className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <Badge key={index} className="bg-[#FFF0F5] text-[#FF6B8B] px-3 py-1">
                  {interest}
                </Badge>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card className="mb-20 mx-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">信用评分</Text>
            <View className="flex items-center justify-between">
              <View>
                <Text className="text-3xl font-bold text-[#FF6B8B]">{user.creditScore}</Text>
                <Text className="text-sm text-gray-500 mt-1">信用等级：优秀</Text>
              </View>
              <Button variant="outline" size="sm">
                <Text className="text-sm">查看详情</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  )
}
