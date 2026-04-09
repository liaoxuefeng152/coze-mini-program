import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react-taro'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import './detail.css'

export default function PostDetailPage() {
  const [post] = useState({
    id: '1',
    userId: '1',
    nickname: '小美',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    circleName: '旅行户外',
    type: 'image' as const,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop'
    ],
    videoUrl: '',
    content: '今天去海边度假，风景太美了！海风吹着特别舒服，心情超好~ 推荐大家一定要来一次海边旅行，治愈又放松 🌊🏖️',
    likes: 1289,
    comments: 234,
    shares: 56,
    isLiked: false,
    isCollected: false,
    createdAt: '2小时前'
  })
  const [comments] = useState([
    {
      id: '1',
      userId: '2',
      nickname: '小红',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      content: '风景真美！我也想去海边玩~',
      likes: 45,
      createdAt: '1小时前',
      isLiked: false
    },
    {
      id: '2',
      userId: '3',
      nickname: '小芳',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      content: '海风+夕阳，太浪漫了！',
      likes: 32,
      createdAt: '50分钟前',
      isLiked: true
    }
  ])

  const handleLike = () => {
    Taro.showToast({ title: '点赞成功', icon: 'success' })
  }

  const handleShare = () => {
    Taro.showToast({ title: '分享成功', icon: 'success' })
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

          <View className="images-grid grid grid-cols-3 gap-2 mb-4">
            {post.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                mode="aspectFill"
                className="w-full h-32 rounded-lg"
              />
            ))}
          </View>

          <View className="stats-section flex items-center gap-6 mb-4">
            <View className="flex items-center gap-1 text-gray-500">
              <Heart size={16} color="#FF6B8B" />
              <Text className="text-sm">{post.likes}</Text>
            </View>
            <View className="flex items-center gap-1 text-gray-500">
              <MessageCircle size={16} color="#999999" />
              <Text className="text-sm">{post.comments}</Text>
            </View>
            <View className="flex items-center gap-1 text-gray-500">
              <Share2 size={16} color="#999999" />
              <Text className="text-sm">{post.shares}</Text>
            </View>
          </View>

          <Separator />

          <View className="comments-section mt-4">
            <Text className="text-base font-semibold mb-3">评论 ({comments.length})</Text>
            {comments.map(comment => (
              <View key={comment.id} className="comment-item mb-4">
                <View className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatarUrl} />
                    <AvatarFallback>{comment.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <View className="flex-1">
                    <View className="flex items-center gap-2 mb-1">
                      <Text className="text-sm font-semibold">{comment.nickname}</Text>
                      <Text className="text-xs text-gray-500">{comment.createdAt}</Text>
                    </View>
                    <Text className="text-sm text-gray-800 mb-1">{comment.content}</Text>
                    <View className="flex items-center gap-2">
                      <View className="flex items-center gap-1">
                        <Heart
                          size={12}
                          color={comment.isLiked ? '#FF6B8B' : '#999999'}
                        />
                        <Text className="text-xs text-gray-500">{comment.likes}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="footer bg-white px-4 py-3 border-t border-gray-100" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <View className="flex items-center gap-3">
          <View className="flex-1 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-1"
              onClick={handleLike}
            >
              <Heart size={18} color="#FF6B8B" />
              <Text className="text-sm">点赞</Text>
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
