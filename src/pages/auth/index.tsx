import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Shield, Clock } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import './index.css'

interface AuthItem {
  id: string
  name: string
  description: string
  status: 'completed' | 'pending' | 'not_started'
  icon: 'basic' | 'face' | 'manual' | 'marriage'
}

export default function AuthCenterPage() {
  const [authItems] = useState<AuthItem[]>([
    {
      id: '1',
      name: '基础信息认证',
      description: '完善个人基础信息',
      status: 'completed',
      icon: 'basic'
    },
    {
      id: '2',
      name: '人脸认证',
      description: '上传真人照片进行人脸识别',
      status: 'completed',
      icon: 'face'
    },
    {
      id: '3',
      name: '实名认证',
      description: '实名认证提升信用等级',
      status: 'pending',
      icon: 'manual'
    },
    {
      id: '4',
      name: '婚姻状况认证',
      description: '证明单身或离婚状态',
      status: 'not_started',
      icon: 'marriage'
    }
  ])

  const [creditScore] = useState(680)

  const handleAuthItem = (item: AuthItem) => {
    if (item.status === 'completed') return

    const routeMap: Record<string, string> = {
      basic: '/pages/profile/basic-info',
      face: '/pages/auth/face',
      manual: '/pages/auth/manual',
      marriage: '/pages/auth/marriage'
    }

    Taro.navigateTo({ url: routeMap[item.icon] })
  }

  const getStatusIcon = (status: AuthItem['status']) => {
    switch (status) {
      case 'completed':
        return <Shield size={20} color="#10B981" />
      case 'pending':
        return <Clock size={20} color="#F59E0B" />
      case 'not_started':
        return <Shield size={20} color="#9CA3AF" />
    }
  }

  const getStatusText = (status: AuthItem['status']) => {
    switch (status) {
      case 'completed':
        return '已认证'
      case 'pending':
        return '审核中'
      case 'not_started':
        return '未认证'
    }
  }

  const getStatusColor = (status: AuthItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'pending':
        return 'bg-amber-500 text-white'
      case 'not_started':
        return 'bg-gray-200 text-gray-600'
    }
  }

  return (
    <View className="auth-center-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">认证中心</Text>
        </View>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-6">
            <View className="text-center mb-4">
              <Shield size={48} color="#FF6B8B" />
              <Text className="text-2xl font-bold mt-3">信用积分</Text>
              <Text className="text-4xl font-bold text-[#FF6B8B] mt-2">{creditScore}</Text>
              <Text className="text-sm text-gray-500 mt-1">当前等级：高信用</Text>
            </View>

            <View className="mb-4">
              <View className="flex items-center justify-between mb-2">
                <Text className="text-sm text-gray-600">认证进度</Text>
                <Text className="text-sm text-[#FF6B8B] font-semibold">
                  {authItems.filter(item => item.status === 'completed').length}/{authItems.length}
                </Text>
              </View>
              <Progress value={75} className="h-2" />
            </View>

            <Text className="text-xs text-gray-500 text-center">
              完成所有认证可提升至 850 分
            </Text>
          </CardContent>
        </Card>

        <Text className="text-base font-semibold mb-3">认证项目</Text>

        {authItems.map(item => (
          <Card key={item.id} className="mb-3">
            <CardContent className="p-4">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-3 flex-1">
                  <View className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center">
                    {getStatusIcon(item.status)}
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold">{item.name}</Text>
                    <Text className="text-sm text-gray-500">{item.description}</Text>
                  </View>
                </View>
                <View className="flex items-center gap-2">
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusText(item.status)}
                  </Badge>
                  {item.status !== 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAuthItem(item)}
                    >
                      <Text>去认证</Text>
                    </Button>
                  )}
                </View>
              </View>
            </CardContent>
          </Card>
        ))}

        <Card className="mb-20">
          <CardContent className="p-4">
            <Text className="text-sm text-gray-600 leading-relaxed">
              完成认证可以提升信用积分，获得更多推荐机会。认证信息仅用于验证真实性，我们会严格保护您的隐私。
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  )
}
