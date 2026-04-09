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
      nickname: '我',
      avatarUrl: 'https://via.placeholder.com/100',
      circleName: '健身运动',
      type: 'image',
      coverUrl: 'https://via.placeholder.com/400x300?text=健身',
      content: '今天跑步5公里，感觉棒极了！',
      likes: 128,
      comments: 32,
      status: 'normal',
      createdAt: '2小时前'
    },
    {
      id: '2',
      userId: '1',
      nickname: '我',
      avatarUrl: 'https://via.placeholder.com/100',
      circleName: '美食探店',
      type: 'video',
      coverUrl: 'https://via.placeholder.com/400x300?text=美食',
      content: '分享一家超棒的咖啡馆',
      likes: 256,
      comments: 45,
      status: 'normal',
      createdAt: '1天前'
    }
  ])
  const [followPosts] = useState<Post[]>([
    {
      id: '3',
      userId: '2',
      nickname: '小美',
      avatarUrl: 'https://via.placeholder.com/100',
      circleName: '旅行户外',
      type: 'image',
      coverUrl: 'https://via.placeholder.com/400x300?text=旅行',
      content: '周末去爬山，风景超美',
      likes: 89,
      comments: 15,
      status: 'normal',
      createdAt: '3小时前'
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
