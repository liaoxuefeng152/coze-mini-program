import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, TrendingUp, Shield, Award, CircleCheck } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import './index.css'

interface CreditFactor {
  id: string
  name: string
  score: number
  maxScore: number
  description: string
  status: 'completed' | 'partial' | 'not_started'
}

export default function CreditPage() {
  const [creditScore] = useState(680)
  const [creditLevel] = useState('高信用')
  const [creditFactors] = useState<CreditFactor[]>([
    {
      id: '1',
      name: '基础信息',
      score: 100,
      maxScore: 100,
      description: '完善个人基础信息',
      status: 'completed'
    },
    {
      id: '2',
      name: '人脸认证',
      score: 80,
      maxScore: 80,
      description: '完成人脸识别认证',
      status: 'completed'
    },
    {
      id: '3',
      name: '实名认证',
      score: 0,
      maxScore: 80,
      description: '完成实名认证',
      status: 'not_started'
    },
    {
      id: '4',
      name: '婚姻认证',
      score: 0,
      maxScore: 70,
      description: '证明单身或离婚状态',
      status: 'not_started'
    },
    {
      id: '5',
      name: '活跃度',
      score: 60,
      maxScore: 100,
      description: '保持日常活跃使用',
      status: 'partial'
    },
    {
      id: '6',
      name: '优质内容',
      score: 40,
      maxScore: 100,
      description: '发布优质动态内容',
      status: 'partial'
    },
    {
      id: '7',
      name: '良好互动',
      score: 40,
      maxScore: 70,
      description: '保持友善互动',
      status: 'partial'
    }
  ])

  const [creditHistory] = useState([
    { date: '2024-01-20', type: 'increase', score: 10, description: '完成人脸认证' },
    { date: '2024-01-18', type: 'increase', score: 20, description: '完善基础信息' },
    { date: '2024-01-15', type: 'increase', score: 15, description: '发布优质动态' },
    { date: '2024-01-10', type: 'decrease', score: -5, description: '被投诉' }
  ])

  const handleUpgrade = () => {
    Taro.navigateTo({ url: '/pages/auth/index' })
  }

  const getStatusIcon = (status: CreditFactor['status']) => {
    switch (status) {
      case 'completed':
        return <CircleCheck size={16} color="#10B981" />
      case 'partial':
        return <TrendingUp size={16} color="#F59E0B" />
      case 'not_started':
        return <Shield size={16} color="#9CA3AF" />
    }
  }

  return (
    <View className="credit-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">信用积分</Text>
        </View>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-6">
            <View className="text-center mb-4">
              <Award size={48} color="#FF6B8B" />
              <Text className="text-sm text-gray-500 mt-3">当前信用积分</Text>
              <Text className="text-5xl font-bold text-[#FF6B8B] mt-2">{creditScore}</Text>
              <Badge className="bg-amber-500 text-white mt-2">{creditLevel}</Badge>
            </View>

            <View className="mb-4">
              <View className="flex items-center justify-between mb-2">
                <Text className="text-sm text-gray-600">距离下一等级还需 70 分</Text>
                <Text className="text-sm text-[#FF6B8B] font-semibold">750/850</Text>
              </View>
              <Progress value={88} className="h-3" />
            </View>

            <Text className="text-xs text-gray-500 text-center">
              信用越高，获得推荐的机会越多
            </Text>
          </CardContent>
        </Card>

        <View className="flex items-center justify-between mb-3">
          <Text className="text-base font-semibold">积分构成</Text>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpgrade}
          >
            <Text>提升积分</Text>
          </Button>
        </View>

        {creditFactors.map(factor => (
          <Card key={factor.id} className="mb-3">
            <CardContent className="p-4">
              <View className="flex items-center justify-between mb-2">
                <View className="flex items-center gap-2">
                  {getStatusIcon(factor.status)}
                  <Text className="text-base font-semibold">{factor.name}</Text>
                </View>
                <View className="text-right">
                  <Text className="text-lg font-bold text-[#FF6B8B]">{factor.score}</Text>
                  <Text className="text-xs text-gray-500">/{factor.maxScore}</Text>
                </View>
              </View>
              <View className="mb-2">
                <Progress value={(factor.score / factor.maxScore) * 100} className="h-2" />
              </View>
              <Text className="text-sm text-gray-500">{factor.description}</Text>
            </CardContent>
          </Card>
        ))}

        <Text className="text-base font-semibold mb-3 mt-6">积分变化</Text>

        <Card className="mb-20">
          <CardContent className="p-4">
            {creditHistory.map((item, index) => (
              <View key={index} className="flex items-center justify-between py-3">
                <View className="flex items-center gap-3">
                  <Shield
                    size={16}
                    color={item.type === 'increase' ? '#10B981' : '#EF4444'}
                  />
                  <View>
                    <Text className="text-sm font-semibold">{item.description}</Text>
                    <Text className="text-xs text-gray-500">{item.date}</Text>
                  </View>
                </View>
                <Badge
                  className={item.type === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                >
                  {item.type === 'increase' ? '+' : ''}{item.score}
                </Badge>
              </View>
            ))}
          </CardContent>
        </Card>
      </View>
    </View>
  )
}
