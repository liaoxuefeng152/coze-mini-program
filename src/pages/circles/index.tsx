import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

interface Circle {
  id: string
  name: string
  description: string
  coverUrl: string
  memberCount: number
  matchCount: number
  isJoined: boolean
  isOfficial: boolean
}

export default function CirclesPage() {
  const [circles, setCircles] = useState<Circle[]>([
    {
      id: '1',
      name: '健身运动',
      description: '分享健身心得，一起运动打卡，打造完美身材',
      coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop',
      memberCount: 12850,
      matchCount: 236,
      isJoined: true,
      isOfficial: true
    },
    {
      id: '2',
      name: '美食探店',
      description: '发现美食，分享探店体验，一起寻找城市美味',
      coverUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
      memberCount: 9860,
      matchCount: 189,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '3',
      name: '旅行户外',
      description: '分享旅行故事，组队户外探险，看遍大好河山',
      coverUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=200&fit=crop',
      memberCount: 8540,
      matchCount: 142,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '4',
      name: '读书学习',
      description: '好书推荐，学习交流，共同进步提升',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      memberCount: 6320,
      matchCount: 98,
      isJoined: true,
      isOfficial: true
    },
    {
      id: '5',
      name: '宠物生活',
      description: '萌宠日常，宠物养护经验，分享养宠乐趣',
      coverUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=200&fit=crop',
      memberCount: 11200,
      matchCount: 267,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '6',
      name: '电影追剧',
      description: '影视推荐，追剧讨论，一起看片吐槽',
      coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop',
      memberCount: 7680,
      matchCount: 156,
      isJoined: true,
      isOfficial: true
    },
    {
      id: '7',
      name: '职场成长',
      description: '职场经验分享，职业发展，打造职场竞争力',
      coverUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=200&fit=crop',
      memberCount: 5430,
      matchCount: 87,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '8',
      name: '相亲脱单',
      description: '相亲经验分享，脱单攻略，寻找真爱',
      coverUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop',
      memberCount: 15670,
      matchCount: 423,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '9',
      name: '备婚结婚',
      description: '备婚攻略，婚礼分享，打造完美婚礼',
      coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=200&fit=crop',
      memberCount: 4320,
      matchCount: 76,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '10',
      name: '居家生活',
      description: '家居装饰，生活小妙招，提升生活品质',
      coverUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=200&fit=crop',
      memberCount: 3890,
      matchCount: 64,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '11',
      name: '摄影爱好者',
      description: '摄影作品分享，技术交流，记录美好瞬间',
      coverUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=200&fit=crop',
      memberCount: 2980,
      matchCount: 52,
      isJoined: false,
      isOfficial: true
    },
    {
      id: '12',
      name: '音乐爱好者',
      description: '音乐分享，演唱会组队，一起享受音乐',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=200&fit=crop',
      memberCount: 4560,
      matchCount: 89,
      isJoined: true,
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
    Taro.navigateTo({ url: `/pages/circles/posts?id=${circleId}` })
  }

  return (
    <View className="circles-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">兴趣圈子</Text>
        <Text className="text-sm text-gray-500 mt-1">找到志同道合的TA</Text>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        <View className="section-header flex items-center justify-between mb-3">
          <Text className="text-lg font-semibold">官方圈子</Text>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp size={12} color="#999999" />
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
                      <Users size={12} color="#999999" />
                      <Text className="text-xs text-gray-500">
                        {circle.memberCount > 10000
                          ? `${(circle.memberCount / 10000).toFixed(1)}万`
                          : circle.memberCount}
                      </Text>
                    </View>
                    {circle.matchCount > 0 && (
                      <Text className="text-xs text-[#FF6B8B]">{circle.matchCount}匹配</Text>
                    )}
                  </View>
                </View>

                <View className="action-section px-3 pb-3">
                  <Button
                    className={`w-full py-2 rounded-lg ${
                      circle.isJoined
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-[#FF6B8B] text-white'
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
          <View className="bg-[#FFF0F5] rounded-lg p-4">
            <Text className="block text-sm font-semibold text-[#FF6B8B] mb-2">
              💡 加入圈子有什么好处？
            </Text>
            <Text className="block text-xs text-[#FF6B8B] mb-1">
              • 找到志同道合的朋友
            </Text>
            <Text className="block text-xs text-[#FF6B8B] mb-1">
              • 提高匹配成功率
            </Text>
            <Text className="block text-xs text-[#FF6B8B]">
              • 发布动态，增加曝光
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
