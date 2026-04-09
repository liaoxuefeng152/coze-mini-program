import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react-taro'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Play, Users } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

interface Post {
  id: string
  userId: string
  nickname: string
  avatarUrl: string
  type: 'image' | 'video'
  coverUrl: string
  content: string
  likes: number
  comments: number
  createdAt: string
}

export default function CirclePostsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [posts] = useState<Post[]>([
    {
      id: '1',
      userId: '1',
      nickname: '健身达人',
      avatarUrl: 'https://via.placeholder.com/100',
      type: 'image',
      coverUrl: 'https://via.placeholder.com/400x300?text=健身',
      content: '今天健身房打卡，坚持就是胜利！',
      likes: 128,
      comments: 32,
      createdAt: '2小时前'
    },
    {
      id: '2',
      userId: '2',
      nickname: '运动小美',
      avatarUrl: 'https://via.placeholder.com/100',
      type: 'video',
      coverUrl: 'https://via.placeholder.com/400x300?text=瑜伽',
      content: '分享一组瑜伽动作，舒缓身心',
      likes: 256,
      comments: 45,
      createdAt: '1天前'
    }
  ])

  const handlePostDetail = (postId: string) => {
    Taro.navigateTo({ url: `/pages/posts/detail?id=${postId}` })
  }

  const handlePublish = () => {
    Taro.navigateTo({ url: '/pages/posts/publish' })
  }

  const renderPostCard = (post: Post) => (
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
            <View className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play size={48} color="#ffffff" />
            </View>
          )}
        </View>

        <View className="content-section p-4">
          <View className="flex items-center gap-2 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.avatarUrl} />
              <AvatarFallback>{post.nickname[0]}</AvatarFallback>
            </Avatar>
            <Text className="text-sm font-semibold">{post.nickname}</Text>
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

  return (
    <View className="circle-posts-page h-full bg-[#FAFAFA] flex flex-col">
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
            <View>
              <Text className="text-lg font-bold">健身运动</Text>
              <View className="flex items-center gap-1 mt-1">
                <Users size={14} color="#999999" />
                <Text className="text-xs text-gray-500">12850 成员</Text>
              </View>
            </View>
          </View>
          <Button
            className="bg-[#FF6B8B] text-white px-4 py-2 rounded-lg text-sm"
            onClick={handlePublish}
          >
            发布
          </Button>
        </View>
      </View>

      <View className="content flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 bg-gray-200 p-1 rounded-xl mx-4 mt-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow">
              全部
            </TabsTrigger>
            <TabsTrigger value="image" className="data-[state=active]:bg-white data-[state=active]:shadow">
              图文
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-white data-[state=active]:shadow">
              短视频
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 px-4">
            {posts.length > 0 ? (
              posts.map(post => renderPostCard(post))
            ) : (
              <View className="empty-state text-center py-12">
                <Heart size={48} color="#999999" />
                <Text className="text-lg font-semibold mt-4">暂无动态</Text>
                <Text className="text-sm text-gray-500 mt-2">快来发布第一条动态吧</Text>
              </View>
            )}
          </TabsContent>

          <TabsContent value="image" className="mt-4 px-4">
            {posts.filter(p => p.type === 'image').length > 0 ? (
              posts.filter(p => p.type === 'image').map(post => renderPostCard(post))
            ) : (
              <View className="empty-state text-center py-12">
                <Text className="text-lg font-semibold mt-4">暂无图文动态</Text>
              </View>
            )}
          </TabsContent>

          <TabsContent value="video" className="mt-4 px-4">
            {posts.filter(p => p.type === 'video').length > 0 ? (
              posts.filter(p => p.type === 'video').map(post => renderPostCard(post))
            ) : (
              <View className="empty-state text-center py-12">
                <Text className="text-lg font-semibold mt-4">暂无视频动态</Text>
              </View>
            )}
          </TabsContent>
        </Tabs>
      </View>
    </View>
  )
}
