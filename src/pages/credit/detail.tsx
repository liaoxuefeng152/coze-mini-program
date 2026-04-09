import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Award, TrendingUp, TrendingDown, CircleCheck, Calendar } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import './detail.css'

interface CreditHistoryItem {
  date: string
  type: 'increase' | 'decrease'
  score: number
  description: string
  category: 'auth' | 'activity' | 'content' | 'interaction' | 'violation'
}

export default function CreditDetailPage() {
  useLoad((options) => {
    // 可以在这里接收用户ID参数，用于查询特定用户的信用评分
    console.log('信用评分详情页，用户ID:', options.userId)
  })

  const [creditScore] = useState(720)
  const [creditLevel] = useState('优秀')
  const [creditRank] = useState('前 10%')
  const [totalUsers] = useState(50000)
  const [rank] = useState(5000)

  const [creditFactors] = useState([
    { name: '基础信息', score: 100, maxScore: 100, description: '完善个人基础信息' },
    { name: '人脸认证', score: 80, maxScore: 80, description: '完成人脸识别认证' },
    { name: '实名认证', score: 80, maxScore: 80, description: '完成实名认证' },
    { name: '婚姻认证', score: 70, maxScore: 70, description: '证明单身或离婚状态' },
    { name: '活跃度', score: 85, maxScore: 100, description: '保持日常活跃使用' },
    { name: '优质内容', score: 60, maxScore: 100, description: '发布优质动态内容' },
    { name: '良好互动', score: 60, maxScore: 70, description: '保持友善互动' },
    { name: '遵守规则', score: 85, maxScore: 100, description: '遵守平台规则，无违规记录' }
  ])

  const [creditHistory] = useState<CreditHistoryItem[]>([
    { date: '2024-01-20', type: 'increase', score: 10, description: '完成实名认证', category: 'auth' },
    { date: '2024-01-18', type: 'increase', score: 20, description: '完善基础信息', category: 'auth' },
    { date: '2024-01-15', type: 'increase', score: 15, description: '发布优质动态', category: 'content' },
    { date: '2024-01-12', type: 'increase', score: 10, description: '连续活跃7天', category: 'activity' },
    { date: '2024-01-10', type: 'decrease', score: -5, description: '被投诉（已撤销）', category: 'violation' },
    { date: '2024-01-08', type: 'increase', score: 8, description: '优质回复', category: 'interaction' },
    { date: '2024-01-05', type: 'increase', score: 25, description: '完成人脸认证', category: 'auth' },
    { date: '2024-01-03', type: 'increase', score: 12, description: '发布热门动态', category: 'content' }
  ])

  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      auth: '认证完成',
      activity: '活跃度',
      content: '内容质量',
      interaction: '互动表现',
      violation: '违规记录'
    }
    return categoryMap[category] || category
  }

  const getCategoryColor = (category: string) => {
    const categoryColorMap: Record<string, string> = {
      auth: '#10B981',
      activity: '#3B82F6',
      content: '#F59E0B',
      interaction: '#8B5CF6',
      violation: '#EF4444'
    }
    return categoryColorMap[category] || '#9CA3AF'
  }

  const handleUpgrade = () => {
    Taro.navigateTo({ url: '/pages/auth/index' })
  }

  return (
    <View className="credit-detail-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">信用评分详情</Text>
        </View>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        {/* 信用评分总览 */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <View className="text-center mb-4">
              <View className="inline-block mb-3">
                <Award size={64} color="#FF6B8B" />
              </View>
              <Text className="text-sm text-gray-500">当前信用评分</Text>
              <Text className="text-6xl font-bold text-[#FF6B8B] mt-2">{creditScore}</Text>
              <View className="flex items-center justify-center gap-2 mt-3">
                <Badge className="bg-green-500 text-white">{creditLevel}</Badge>
                <Badge variant="outline" className="border-[#FF6B8B] text-[#FF6B8B]">
                  {creditRank}
                </Badge>
              </View>
            </View>

            <View className="mb-4">
              <View className="flex items-center justify-between mb-2">
                <Text className="text-sm text-gray-600">距离满分还需 280 分</Text>
                <Text className="text-sm text-[#FF6B8B] font-semibold">720/1000</Text>
              </View>
              <Progress value={72} className="h-3" />
            </View>

            <View className="grid grid-cols-2 gap-4 mt-4">
              <View className="text-center">
                <Text className="text-xs text-gray-500">排名</Text>
                <Text className="text-xl font-bold text-[#FF6B8B] mt-1">{rank.toLocaleString()}</Text>
              </View>
              <View className="text-center">
                <Text className="text-xs text-gray-500">总用户</Text>
                <Text className="text-xl font-bold text-gray-700 mt-1">{totalUsers.toLocaleString()}</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* 信用说明 */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <View className="flex items-start gap-3">
              <CircleCheck size={20} color="#10B981" style={{ flexShrink: 0 }} />
              <View className="flex-1">
                <Text className="text-base font-semibold mb-1">信用说明</Text>
                <Text className="text-sm text-gray-600 leading-relaxed">
                  信用评分是衡量用户信用状况的重要指标。评分越高，代表用户可信度越高，能够获得更多的匹配推荐和优质资源。信用评分由基础信息、认证完成度、活跃度、内容质量等多个维度综合计算得出。
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* 积分构成 */}
        <View className="flex items-center justify-between mb-3">
          <Text className="text-base font-semibold">积分构成</Text>
        </View>

        {creditFactors.map((factor, index) => (
          <Card key={index} className="mb-3">
            <CardContent className="p-4">
              <View className="flex items-center justify-between mb-2">
                <Text className="text-base font-semibold">{factor.name}</Text>
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

        {/* 历史记录 */}
        <View className="flex items-center justify-between mb-3 mt-6">
          <Text className="text-base font-semibold">评分历史</Text>
          <View className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={14} color="#9CA3AF" />
            <Text>最近30天</Text>
          </View>
        </View>

        <Card className="mb-20">
          <CardContent className="p-4">
            {creditHistory.map((item, index) => (
              <View key={index} className="flex items-start gap-3 py-3" style={index !== creditHistory.length - 1 ? { borderBottom: '1px solid #F0F0F0' } : {}}>
                <View className="mt-1" style={{ flexShrink: 0 }}>
                  {item.type === 'increase' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )}
                </View>
                <View className="flex-1">
                  <View className="flex items-center gap-2 mb-1">
                    <Text className="text-sm font-semibold">{item.description}</Text>
                    <Badge
                      className="text-xs"
                      style={{ backgroundColor: `${getCategoryColor(item.category)}20`, color: getCategoryColor(item.category) }}
                    >
                      {getCategoryName(item.category)}
                    </Badge>
                  </View>
                  <Text className="text-xs text-gray-500">{item.date}</Text>
                </View>
                <Badge
                  className={item.type === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  style={{ flexShrink: 0 }}
                >
                  {item.type === 'increase' ? '+' : ''}{item.score}
                </Badge>
              </View>
            ))}
          </CardContent>
        </Card>

        {/* 底部按钮 */}
        <View className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-100" style={{ zIndex: 100 }}>
          <Button
            className="w-full bg-[#FF6B8B] text-white"
            onClick={handleUpgrade}
          >
            <Text>提升信用评分</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}
