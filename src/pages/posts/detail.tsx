import { View, Text, Image, Video, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, Send, Play } from 'lucide-react-taro'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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

interface Comment {
  id: string
  userId: string
  nickname: string
  avatarUrl?: string
  content: string
  likes: number
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
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
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
  const [videoError, setVideoError] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'guest1',
      nickname: '游客',
      content: '这条动态真棒！👍',
      likes: 0,
      createdAt: '刚刚'
    }
  ])

  useLoad((options) => {
    const postId = options.id
    console.log('=== 详情页加载 ===')
    console.log('接收到的动态 ID:', postId)

    const foundPost = allPosts.find(p => p.id === postId)
    console.log('找到的动态数据:', foundPost)

    if (foundPost) {
      console.log('动态类型:', foundPost.type)
      console.log('是否为视频:', foundPost.type === 'video')
      console.log('视频 URL:', foundPost.videoUrl)
      console.log('封面 URL:', foundPost.coverUrl)
      console.log('图片数组:', foundPost.images)
      console.log('================')

      setPost(foundPost)
      setVideoError(false)
      setIsPlaying(false)  // 重置播放状态

      // 延迟检查渲染状态
      setTimeout(() => {
        console.log('延迟检查：post.state:', post)
      }, 1000)
    } else {
      console.error('未找到动态，ID:', postId)
      Taro.showToast({
        title: '动态不存在',
        icon: 'none'
      })
    }
  })

  // 视频加载错误处理
  const handleVideoError = (e) => {
    console.error('视频加载错误:', e)
    setVideoError(true)
    Taro.showToast({
      title: '视频加载失败',
      icon: 'none'
    })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    Taro.showToast({ title: isLiked ? '取消点赞' : '点赞成功', icon: 'success' })
  }

  const handleShare = () => {
    Taro.showToast({ title: '分享成功', icon: 'success' })
  }

  // 滚动到评论区
  const handleScrollToComments = (e) => {
    e.stopPropagation()  // 防止事件冒泡
    console.log('滚动到评论区')
    Taro.pageScrollTo({
      selector: '.comments-section',
      duration: 300
    })
  }

  // 播放视频
  const handlePlayVideo = () => {
    console.log('播放视频')
    setIsPlaying(true)
  }

  // 关闭视频播放
  const handleCloseVideo = () => {
    console.log('关闭视频')
    setIsPlaying(false)
  }

  // 提交评论
  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      Taro.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }

    console.log('提交评论:', commentText)

    // 创建新评论
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      nickname: '我',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      content: commentText.trim(),
      likes: 0,
      createdAt: '刚刚'
    }

    // 添加到评论列表
    setComments([...comments, newComment])

    // 更新动态的评论数
    if (post) {
      setPost({ ...post, comments: post.comments + 1 })
    }

    // 显示成功提示
    Taro.showToast({
      title: '评论成功',
      icon: 'success'
    })

    // 清空评论输入框
    setCommentText('')

    // 滚动到评论区
    setTimeout(() => {
      Taro.pageScrollTo({
        selector: '.comments-section',
        duration: 300
      })
    }, 100)
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
          <View className="media-container mb-4">
            {/* 视频类型 */}
            {post.type === 'video' && post.videoUrl && (
              <View className="relative w-full">
                {!isPlaying ? (
                  /* 显示封面图 + 播放图标 */
                  <View
                    className="video-cover w-full rounded-lg overflow-hidden"
                    style={{ aspectRatio: '16/9', backgroundColor: '#F0F0F0' }}
                  >
                    <Image
                      src={post.coverUrl}
                      mode="aspectFill"
                      className="w-full h-full"
                      onError={() => {
                        console.log('封面图加载失败')
                      }}
                    />
                    <View
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
                      onClick={handlePlayVideo}
                      style={{ cursor: 'pointer' }}
                    >
                      <View className="bg-black bg-opacity-40 rounded-full p-4" style={{ backdropFilter: 'blur(4px)' }}>
                        <Play size={64} color="#ffffff" />
                      </View>
                    </View>
                  </View>
                ) : (
                  /* 显示视频播放器 */
                  <View className="relative w-full">
                    <View
                      className="video-player w-full rounded-lg"
                      style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#000' }}
                    >
                      {videoError ? (
                        <View className="video-error flex flex-col items-center justify-center h-full">
                          <Text className="text-gray-500 mb-2">视频加载失败</Text>
                          <Text className="text-xs text-gray-400">请检查网络或稍后重试</Text>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={handleCloseVideo}
                          >
                            关闭
                          </Button>
                        </View>
                      ) : (
                        <Video
                          id={`video-${post.id}`}
                          src={post.videoUrl}
                          className="w-full h-full"
                          controls
                          poster={post.coverUrl}
                          autoplay
                          loop={false}
                          muted={false}
                          showPlayBtn
                          showCenterPlayBtn
                          showFullscreenBtn
                          enableProgressGesture
                          showProgress
                          objectFit="contain"
                          onError={handleVideoError}
                          onPlay={() => {
                            console.log('视频开始播放')
                          }}
                          onPause={() => console.log('视频暂停')}
                          onEnded={() => {
                            console.log('视频播放结束')
                            setIsPlaying(false)
                          }}
                        />
                      )}
                    </View>
                    {/* 关闭按钮 */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-black bg-opacity-50"
                      onClick={handleCloseVideo}
                    >
                      <Text className="text-white text-xs">✕ 关闭</Text>
                    </Button>
                  </View>
                )}
              </View>
            )}

            {/* 图片类型 */}
            {post.type === 'image' && (
              <View className="image-container relative w-full rounded-lg overflow-hidden">
                {/* 单张图片 */}
                {(!post.images || post.images.length === 0) ? (
                  <Image
                    src={post.coverUrl}
                    mode="aspectFill"
                    className="w-full h-full"
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => handleImagePreview(0)}
                  />
                ) : (
                      <View className="relative">
                        {/* 多张图片滑动 */}
                        <Swiper
                          className="image-swiper w-full h-full"
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
          </View>

          <View className="stats-section flex items-center gap-6 mb-4">
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-gray-500 p-0"
              onClick={(e) => {
                e.stopPropagation()
                handleLike()
              }}
            >
              <Heart size={16} color={isLiked ? '#FF6B8B' : '#999999'} />
              <Text className="text-sm">{post.likes + (isLiked ? 1 : 0)}</Text>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-gray-500 p-0"
              onClick={handleScrollToComments}
            >
              <MessageCircle size={16} color="#999999" />
              <Text className="text-sm">{post.comments}</Text>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-gray-500 p-0"
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              <Share2 size={16} color="#999999" />
              <Text className="text-sm">分享</Text>
            </Button>
          </View>

          <Separator />

          <View className="comments-section mt-4">
            <Text className="text-base font-semibold mb-3">评论 ({post.comments})</Text>
            {comments.length === 0 ? (
              <View className="text-center py-8">
                <Text className="text-sm text-gray-500">还没有评论，快来发表第一条评论吧~</Text>
              </View>
            ) : (
              comments.map((comment) => (
                <View key={comment.id} className="comment-item mb-4">
                  <View className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      {comment.avatarUrl ? (
                        <AvatarImage src={comment.avatarUrl} />
                      ) : null}
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
                          <Heart size={12} color="#999999" />
                          <Text className="text-xs text-gray-500">{comment.likes}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </View>

      <View className="footer bg-white px-4 py-3 border-t border-gray-100" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <View className="flex items-center gap-3">
          <View className="flex-1 relative">
            <Textarea
              className="text-sm w-full"
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: '20px',
                padding: '10px 40px 10px 16px',
                minHeight: '40px',
                maxHeight: '120px',
                lineHeight: '20px',
                boxSizing: 'border-box'
              }}
              placeholder="说点什么吧..."
              value={commentText}
              onInput={(e) => setCommentText(e.detail.value)}
              onConfirm={handleSubmitComment}
              maxlength={200}
              cursorSpacing={10}
              disableDefaultPadding
            />
            <View
              className="absolute right-2 bottom-2"
              onClick={handleSubmitComment}
              style={{ cursor: 'pointer' }}
            >
              <View className="bg-[#FF6B8B] rounded-full p-1">
                <Send size={16} color="#ffffff" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
