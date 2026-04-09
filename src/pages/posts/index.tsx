import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Play, FileText } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

interface Post {
  id: string
  userId: string
  nickname: string
  avatarUrl: string
  circleName: string
  type: 'image' | 'video'
  coverUrl: string
  videoUrl?: string
  content: string
  likes: number
  comments: number
  status: 'normal' | 'pending' | 'rejected'
  createdAt: string
}

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState('my')
  const [myPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '健身运动',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      content: '今天跑步5公里，感觉棒极了！坚持就是胜利💪 #健身打卡 #健康生活',
      likes: 128,
      comments: 32,
      status: 'normal',
      createdAt: '2小时前'
    },
    {
      id: '2',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '美食探店',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
      content: '分享一家超棒的咖啡馆，环境优雅，咖啡香浓☕ 店名：漫时光咖啡厅',
      likes: 256,
      comments: 45,
      status: 'normal',
      createdAt: '1天前'
    },
    {
      id: '3',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '读书学习',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      content: '读完了这本书，深受启发，推荐给大家📚 《原则》- 瑞·达利欧',
      likes: 89,
      comments: 15,
      status: 'normal',
      createdAt: '2天前'
    },
    {
      id: '4',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '旅行户外',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      content: '周末去爬山，风景超美，心情特别好🏔️ 目的地：香山',
      likes: 312,
      comments: 67,
      status: 'normal',
      createdAt: '3天前'
    },
    {
      id: '5',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '宠物生活',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
      content: '我家猫咪今天超级可爱，忍不住拍下来分享🐱 品种：英短蓝猫',
      likes: 567,
      comments: 123,
      status: 'normal',
      createdAt: '5天前'
    },
    {
      id: '6',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '电影追剧',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
      content: '周末看电影，这部电影太感人了😭 《肖申克的救赎》',
      likes: 156,
      comments: 28,
      status: 'normal',
      createdAt: '1周前'
    },
    {
      id: '7',
      userId: '1',
      nickname: '小可爱',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      circleName: '摄影爱好者',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop',
      content: '今天拍了一组夕阳照片，光影很美📷',
      likes: 234,
      comments: 45,
      status: 'normal',
      createdAt: '1周前'
    }
  ])
  const [followPosts] = useState<Post[]>([
    {
      id: '8',
      userId: '2',
      nickname: '小美',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      circleName: '旅行户外',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      content: '海边日落太美了，想去看看海🌅 地点：三亚',
      likes: 89,
      comments: 15,
      status: 'normal',
      createdAt: '3小时前'
    },
    {
      id: '9',
      userId: '3',
      nickname: '小芳',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      circleName: '美食探店',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      content: '发现一家超好吃的火锅店，味道正宗🍲 店名：海底捞',
      likes: 234,
      comments: 56,
      status: 'normal',
      createdAt: '5小时前'
    },
    {
      id: '10',
      userId: '4',
      nickname: '小红',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      circleName: '健身运动',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      content: '今天练背，感觉肌肉在燃烧💪 背部训练日',
      likes: 456,
      comments: 89,
      status: 'normal',
      createdAt: '8小时前'
    },
    {
      id: '11',
      userId: '5',
      nickname: '小丽',
      avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
      circleName: '电影追剧',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop',
      content: '周末看电影，这部电影太感人了😭 《泰坦尼克号》',
      likes: 123,
      comments: 34,
      status: 'normal',
      createdAt: '12小时前'
    },
    {
      id: '12',
      userId: '6',
      nickname: '小雅',
      avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
      circleName: '读书学习',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
      content: '读书笔记，分享一段有感触的话📖',
      likes: 78,
      comments: 12,
      status: 'normal',
      createdAt: '1天前'
    },
    {
      id: '13',
      userId: '2',
      nickname: '小美',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      circleName: '宠物生活',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
      content: '狗狗今天好活泼，追蝴蝶的样子太可爱了🐕',
      likes: 678,
      comments: 145,
      status: 'normal',
      createdAt: '2天前'
    },
    {
      id: '14',
      userId: '7',
      nickname: '小静',
      avatarUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=100&h=100&fit=crop',
      circleName: '音乐爱好者',
      type: 'video',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      content: '今天弹了一首曲子，希望能和大家分享🎹',
      likes: 345,
      comments: 56,
      status: 'normal',
      createdAt: '3天前'
    },
    {
      id: '15',
      userId: '8',
      nickname: '小敏',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      circleName: '职场成长',
      type: 'image',
      coverUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop',
      content: '今天参加了职业规划培训，收获满满💼',
      likes: 156,
      comments: 28,
      status: 'normal',
      createdAt: '4天前'
    }
  ])

  const handlePostDetail = (postId: string) => {
    Taro.navigateTo({ url: `/pages/posts/detail?id=${postId}` })
  }

  const handlePublish = () => {
    Taro.navigateTo({ url: '/pages/posts/publish' })
  }

  const renderPostCard = (post: Post) => {
    const statusBadge = post.status === 'pending'
      ? <Badge className="bg-orange-500 text-white">审核中</Badge>
      : post.status === 'rejected'
        ? <Badge className="bg-red-500 text-white">驳回</Badge>
        : null

    return (
      <Card
        className="post-card mb-3 overflow-hidden"
        onClick={() => handlePostDetail(post.id)}
      >
        <CardContent className="p-0">
          <View className="cover-section relative">
            <Image
              src={post.coverUrl}
              mode="aspectFill"
              className="w-full h-48"
            />
            {post.type === 'video' && (
              <View className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <Play size={48} color="#ffffff" />
              </View>
            )}
            {statusBadge && (
              <View className="absolute top-2 right-2">
                {statusBadge}
              </View>
            )}
          </View>

          <View className="content-section p-4">
            <View className="flex items-center justify-between mb-2">
              <View className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.avatarUrl} />
                  <AvatarFallback>{post.nickname[0]}</AvatarFallback>
                </Avatar>
                <Text className="text-sm font-semibold">{post.nickname}</Text>
                <Badge variant="secondary" className="text-xs">{post.circleName}</Badge>
              </View>
              <Text className="text-xs text-gray-500">{post.createdAt}</Text>
            </View>

            <Text className="text-sm mb-3 line-clamp-2">{post.content}</Text>

            <View className="flex items-center gap-4">
              <View className="flex items-center gap-1 text-gray-500">
                <Heart size={16} color="#999999" />
                <Text className="text-xs">{post.likes}</Text>
              </View>
              <View className="flex items-center gap-1 text-gray-500">
                <MessageCircle size={16} color="#999999" />
                <Text className="text-xs">{post.comments}</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    )
  }

  return (
    <View className="posts-page h-full bg-[#FAFAFA]">
      <View className="content h-full overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 bg-gray-200 p-1 rounded-xl mx-4 mt-4">
            <TabsTrigger value="my" className="data-[state=active]:bg-white data-[state=active]:shadow">
              我的动态
            </TabsTrigger>
            <TabsTrigger value="follow" className="data-[state=active]:bg-white data-[state=active]:shadow">
              关注动态
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my" className="mt-4 px-4">
            {myPosts.length > 0 ? (
              myPosts.map(post => renderPostCard(post))
            ) : (
              <View className="empty-state text-center py-12">
                <FileText size={48} color="#FF6B8B" />
                <Text className="text-lg font-semibold mt-4">暂无动态</Text>
                <Text className="text-sm text-gray-500 mt-2">去发布第一条动态吧</Text>
              </View>
            )}
          </TabsContent>

          <TabsContent value="follow" className="mt-4 px-4">
            {followPosts.length > 0 ? (
              followPosts.map(post => renderPostCard(post))
            ) : (
              <View className="empty-state text-center py-12">
                <FileText size={48} color="#999999" />
                <Text className="text-lg font-semibold mt-4">暂无关注</Text>
                <Text className="text-sm text-gray-500 mt-2">去发现更多动态</Text>
              </View>
            )}
          </TabsContent>
        </Tabs>

        <View className="fab-container fixed right-4 bottom-20">
          <Button
            className="w-14 h-14 rounded-full bg-[#FF6B8B] text-white shadow-lg flex items-center justify-center"
            onClick={handlePublish}
          >
            <Play size={24} color="#ffffff" />
          </Button>
        </View>
      </View>
    </View>
  )
}
