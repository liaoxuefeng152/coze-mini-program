import { View, Text, Image, Video, Swiper, SwiperItem } from '@tarojs/components'
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
  images?: string[]  // 多张图片
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
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=450&fit=crop'
    ],
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
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
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
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=450&fit=crop'
    ],
    content: '今天拍了一组夕阳照片，光影很美📷',
    likes: 234,
    comments: 45,
    status: 'normal',
    createdAt: '1周前'
  }
]

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useLoad((options) => {
    const postId = options.id
    console.log('详情页接收到的动态 ID:', postId)
    const foundPost = allPosts.find(p => p.id === postId)
    console.log('找到的动态数据:', foundPost)
    if (foundPost) {
      console.log('动态类型:', foundPost.type)
      console.log('视频 URL:', foundPost.videoUrl)
      console.log('图片数组:', foundPost.images)
      setPost(foundPost)
    } else {
      console.error('未找到动态，ID:', postId)
    }
  })

  const handleLike = () => {
    setIsLiked(!isLiked)
    Taro.showToast({ title: isLiked ? '取消点赞' : '点赞成功', icon: 'success' })
  }

  const handleShare = () => {
    Taro.showToast({ title: '分享成功', icon: 'success' })
  }

  // 点击图片放大
  const handleImagePreview = (index: number) => {
    if (post && post.images && post.images.length > 0) {
      Taro.previewImage({
        current: post.images[index],  // 当前显示图片的 http 链接
        urls: post.images             // 需要预览的图片 http 链接列表
      })
    } else if (post) {
      // 单张图片（向后兼容）
      Taro.previewImage({
        current: post.coverUrl,
        urls: [post.coverUrl]
      })
    }
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
            <View className="video-container mb-4 relative w-full" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <Video
                src={post.videoUrl}
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                controls
                poster={post.coverUrl}
                autoplay={false}
                loop={false}
                muted={false}
                initialTime={0}
                duration={0}
                direction={0}
                showProgress
                showFullscreenBtn
                showPlayBtn
                showCenterPlayBtn
                enableProgressGesture
                objectFit="cover"
              />
            </View>
          ) : (
            <View className="image-container mb-4 relative w-full">
              {/* 单张图片 */}
              {(!post.images || post.images.length === 0) ? (
                <Image
                  src={post.coverUrl}
                  mode="aspectFill"
                  className="w-full rounded-lg"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => handleImagePreview(0)}
                />
              ) : (
                /* 多张图片滑动 */
                <View className="relative">
                  <Swiper
                    className="image-swiper w-full rounded-lg"
                    style={{ aspectRatio: '16/9' }}
                    indicatorDots
                    indicatorColor="rgba(0, 0, 0, 0.3)"
                    indicatorActiveColor="#FF6B8B"
                    circular={false}
                    onChange={(e) => {
                      setCurrentImageIndex(e.detail.current)
                    }}
                  >
                    {post.images.map((imgUrl, index) => (
                      <SwiperItem key={index}>
                        <Image
                          src={imgUrl}
                          mode="aspectFill"
                          className="w-full h-full"
                          onClick={() => handleImagePreview(index)}
                        />
                      </SwiperItem>
                    ))}
                  </Swiper>
                  {/* 图片数量指示器 */}
                  {post.images.length > 1 && (
                    <View className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded-full">
                      <Text className="text-xs text-white">
                        {currentImageIndex + 1} / {post.images.length}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
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
