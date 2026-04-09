import { View, Text, Image, Video } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react-taro'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import './detail.css'

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

// 模拟数据，与 posts/index.tsx 保持一致
const allPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    nickname: '小可爱',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    circleName: '健身运动',
    type: 'video',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
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
  }
]

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null)
  const [isLiked, setIsLiked] = useState(false)

  useLoad((options) => {
    const postId = options.id
    const foundPost = allPosts.find(p => p.id === postId)
    if (foundPost) {
      setPost(foundPost)
    }
  })

  const handleLike = () => {
    setIsLiked(!isLiked)
    Taro.showToast({ title: isLiked ? '取消点赞' : '点赞成功', icon: 'success' })
  }

  const handleShare = () => {
    Taro.showToast({ title: '分享成功', icon: 'success' })
  }

  if (!post) {
    return (
      <View className="post-detail-page h-full bg-[#FAFAFA] flex items-center justify-center">
        <Text className="text-gray-500">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="post-detail-page h-full bg-[#FAFAFA] flex flex-col">
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
            <Text className="text-lg font-semibold">动态详情</Text>
          </View>
          <Button variant="ghost" className="p-2">
            <Text className="text-sm text-gray-600">更多</Text>
          </Button>
        </View>
      </View>

      <View className="content flex-1 overflow-y-auto">
        <View className="post-section px-4 py-4">
          <View className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.avatarUrl} />
              <AvatarFallback>{post.nickname[0]}</AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <View className="flex items-center gap-2">
                <Text className="text-base font-semibold">{post.nickname}</Text>
                <Badge variant="secondary" className="text-xs">{post.circleName}</Badge>
              </View>
              <Text className="text-xs text-gray-500">{post.createdAt}</Text>
            </View>
          </View>

          <Text className="text-sm text-gray-800 mb-4 leading-relaxed">
            {post.content}
          </Text>

          {/* 根据动态类型显示不同内容 */}
          {post.type === 'video' && post.videoUrl ? (
            <View className="video-container mb-4 relative rounded-lg overflow-hidden">
              <Video
                src={post.videoUrl}
                className="w-full"
                style={{ height: '400px' }}
                controls
                poster={post.coverUrl}
              />
            </View>
          ) : (
            <Image
              src={post.coverUrl}
              mode="aspectFill"
              className="w-full h-96 rounded-lg mb-4"
            />
          )}

          <View className="stats-section flex items-center gap-6 mb-4">
            <View className="flex items-center gap-1 text-gray-500">
              <Heart size={16} color={isLiked ? '#FF6B8B' : '#999999'} />
              <Text className="text-sm">{post.likes + (isLiked ? 1 : 0)}</Text>
            </View>
            <View className="flex items-center gap-1 text-gray-500">
              <MessageCircle size={16} color="#999999" />
              <Text className="text-sm">{post.comments}</Text>
            </View>
            <View className="flex items-center gap-1 text-gray-500">
              <Share2 size={16} color="#999999" />
              <Text className="text-sm">分享</Text>
            </View>
          </View>

          <Separator />

          <View className="comments-section mt-4">
            <Text className="text-base font-semibold mb-3">评论 ({post.comments})</Text>
            <View className="comment-item mb-4">
              <View className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>访</AvatarFallback>
                </Avatar>
                <View className="flex-1">
                  <View className="flex items-center gap-2 mb-1">
                    <Text className="text-sm font-semibold">游客</Text>
                    <Text className="text-xs text-gray-500">刚刚</Text>
                  </View>
                  <Text className="text-sm text-gray-800 mb-1">这条动态真棒！👍</Text>
                  <View className="flex items-center gap-2">
                    <View className="flex items-center gap-1">
                      <Heart size={12} color="#999999" />
                      <Text className="text-xs text-gray-500">0</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="footer bg-white px-4 py-3 border-t border-gray-100" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <View className="flex items-center gap-3">
          <View className="flex-1 flex gap-2">
            <Button
              variant="outline"
              className={`flex-1 flex items-center justify-center gap-1 ${isLiked ? 'border-[#FF6B8B]' : ''}`}
              onClick={handleLike}
            >
              <Heart size={18} color={isLiked ? '#FF6B8B' : '#999999'} filled={isLiked} />
              <Text className="text-sm">{isLiked ? '已赞' : '点赞'}</Text>
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-1"
              onClick={handleShare}
            >
              <Share2 size={18} color="#999999" />
              <Text className="text-sm">分享</Text>
            </Button>
          </View>
          <View className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Text
              className="text-sm text-gray-400 flex-1"
              onClick={() => {}}
            >
              写评论...
            </Text>
            <Send size={16} color="#FF6B8B" />
          </View>
        </View>
      </View>
    </View>
  )
}
