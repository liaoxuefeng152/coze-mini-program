import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp, ChevronRight } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

interface Circle {
  id: string
  name: string
  description: string
  coverUrl: string
  memberCount: number
  isJoined: boolean
  isOfficial: boolean
}

export default function CirclesPage() {
  const [circles, setCircles] = useState<Circle[]>([
    {
      id: '1',
      name: '健身运动',
      description: '分享健身心得，一起运动打卡',
      coverUrl: 'https://via.placeholder.com/400x200?text=健身',
      memberCount: 12850,
      isJoined: true,
      isOfficial: true
    },
    {
      id: '2',
      name: '美食探店',
      description: '发现美食，分享探店体验',
      coverUrl: 'https://via.placeholder.com/400x200?text=美食',
      memberCount: 9860,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '3',
      name: '旅行户外',
      description: '分享旅行故事，组队户外探险',
      coverUrl: 'https://via.placeholder.com/400x200?text=旅行',
      memberCount: 8540,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '4',
      name: '读书学习',
      description: '好书推荐，学习交流',
      coverUrl: 'https://via.placeholder.com/400x200?text=读书',
      memberCount: 6320,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '5',
      name: '宠物生活',
      description: '萌宠日常，宠物养护经验',
      coverUrl: 'https://via.placeholder.com/400x200?text=宠物',
      memberCount: 11200,
      isJoined: true,
      isOfficial: true
    },
    {
      id: '6',
      name: '电影追剧',
      description: '影视推荐，追剧讨论',
      coverUrl: 'https://via.placeholder.com/400x200?text=电影',
      memberCount: 7680,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '7',
      name: '职场成长',
      description: '职场经验分享，职业发展',
      coverUrl: 'https://via.placeholder.com/400x200?text=职场',
      memberCount: 5430,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '8',
      name: '相亲脱单',
      description: '相亲经验分享，脱单攻略',
      coverUrl: 'https://via.placeholder.com/400x200?text=相亲',
      memberCount: 15670,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '9',
      name: '备婚结婚',
      description: '备婚攻略，婚礼分享',
      coverUrl: 'https://via.placeholder.com/400x200?text=备婚',
      memberCount: 4320,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '10',
      name: '居家生活',
      description: '家居装饰，生活小妙招',
      coverUrl: 'https://via.placeholder.com/400x200?text=居家',
      memberCount: 3890,
      isJoined: false,
      isOfficial: true
    }
  ])

  const handleJoinCircle = (circleId: string) => {
    setCircles(prev =>
      prev.map(circle =>
        circle.id === circleId
          ? { ...circle, isJoined: !circle.isJoined }
          : circle
      )
    )

    const circle = circles.find(c => c.id === circleId)
    Taro.showToast({
      title: circle?.isJoined ? '已退出' : '已加入',
      icon: 'none'
    })
  }

  const handleCircleDetail = (circleId: string) => {
    Taro.navigateTo({ url: `/pages/circles/detail?id=${circleId}` })
  }

  return (
    <View className="circles-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">兴趣圈子</Text>
        <Text className="text-sm text-gray-500 mt-1">找到志同道合的TA</Text>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        <View className="section-header flex items-center justify-between mb-3">
          <Text className="text-lg font-semibold">官方圈子</Text>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp size={12} color="#9ca3af" />
            <Text>热门</Text>
          </Badge>
        </View>

        <View className="circles-list grid grid-cols-2 gap-3">
          {circles.map(circle => (
            <Card key={circle.id} className="circle-card overflow-hidden">
              <CardContent className="p-0">
                <View className="cover-section relative" onClick={() => handleCircleDetail(circle.id)}>
                  <Image
                    src={circle.coverUrl}
                    mode="aspectFill"
                    className="w-full h-24"
                  />
                  {circle.isOfficial && (
                    <Badge className="absolute top-2 left-2 bg-amber-500 text-white">
                      官方
                    </Badge>
                  )}
                  {circle.isJoined && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                      已加入
                    </Badge>
                  )}
                </View>

                <View className="info-section p-3">
                  <Text className="block font-semibold mb-1">{circle.name}</Text>
                  <Text className="block text-xs text-gray-500 mb-2 line-clamp-2">
                    {circle.description}
                  </Text>
                  <View className="flex items-center justify-between">
                    <View className="flex items-center gap-1">
                      <Users size={12} color="#9ca3af" />
                      <Text className="text-xs text-gray-500">
                        {circle.memberCount > 10000
                          ? `${(circle.memberCount / 10000).toFixed(1)}万`
                          : circle.memberCount}
                      </Text>
                    </View>
                    <ChevronRight size={16} color="#d1d5db" />
                  </View>
                </View>

                <View className="action-section px-3 pb-3">
                  <Button
                    className={`w-full py-2 rounded-lg ${
                      circle.isJoined
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-rose-500 text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleJoinCircle(circle.id)
                    }}
                  >
                    {circle.isJoined ? '退出' : '加入'}
                  </Button>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        <View className="tips-section mt-6">
          <View className="bg-rose-50 rounded-lg p-4">
            <Text className="block text-sm font-semibold text-rose-700 mb-2">
              💡 加入圈子有什么好处？
            </Text>
            <Text className="block text-xs text-rose-600 mb-1">
              • 找到志同道合的朋友
            </Text>
            <Text className="block text-xs text-rose-600 mb-1">
              • 提高匹配成功率
            </Text>
            <Text className="block text-xs text-rose-600">
              • 发布动态，增加曝光
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
