import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, Trash2, Ban } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

interface ChatUser {
  id: string
  nickname: string
  avatarUrl: string
  lastMessage: string
  unreadCount: number
  time: string
  isMatched: boolean
  isArchived: boolean
  matchDays: number
  commonCircles: string[]
}

export default function ChatListPage() {
  const [chats] = useState<ChatUser[]>([
    {
      id: '1',
      nickname: '小美',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: '明天去公园散步吧？好久没见了😊',
      unreadCount: 2,
      time: '刚刚',
      isMatched: true,
      isArchived: false,
      matchDays: 7,
      commonCircles: ['健身运动', '旅行户外']
    },
    {
      id: '2',
      nickname: '小红',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      lastMessage: '我对你很感兴趣，想了解更多',
      unreadCount: 0,
      time: '10:30',
      isMatched: true,
      isArchived: false,
      matchDays: 5,
      commonCircles: ['美食探店']
    },
    {
      id: '3',
      nickname: '小芳',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      lastMessage: '这是我的性格测试结果，看看我们的匹配度',
      unreadCount: 1,
      time: '昨天',
      isMatched: true,
      isArchived: false,
      matchDays: 12,
      commonCircles: ['读书学习', '电影追剧']
    },
    {
      id: '4',
      nickname: '小丽',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      lastMessage: '周末有时间吗？一起去看电影吧🎬',
      unreadCount: 0,
      time: '3天前',
      isMatched: true,
      isArchived: false,
      matchDays: 20,
      commonCircles: ['电影追剧']
    },
    {
      id: '5',
      nickname: '小雅',
      avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
      lastMessage: '今天运动完感觉超棒！',
      unreadCount: 0,
      time: '1周前',
      isMatched: true,
      isArchived: false,
      matchDays: 15,
      commonCircles: ['健身运动', '宠物生活']
    },
    {
      id: '6',
      nickname: '小婷',
      avatarUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=100&h=100&fit=crop',
      lastMessage: '谢谢你的建议，我会考虑的',
      unreadCount: 0,
      time: '10天前',
      isMatched: true,
      isArchived: true,
      matchDays: 30,
      commonCircles: ['职场成长']
    },
    {
      id: '7',
      nickname: '小雪',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
      lastMessage: '最近在学习新技能，一起加油！',
      unreadCount: 0,
      time: '2周前',
      isMatched: true,
      isArchived: true,
      matchDays: 18,
      commonCircles: ['读书学习']
    },
    {
      id: '8',
      nickname: '小琳',
      avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
      lastMessage: '周末去爬山吗？我知道一个超美的地方',
      unreadCount: 3,
      time: '3天前',
      isMatched: true,
      isArchived: false,
      matchDays: 8,
      commonCircles: ['旅行户外']
    },
    {
      id: '9',
      nickname: '小慧',
      avatarUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=100&h=100&fit=crop',
      lastMessage: '分享给你一首超好听的歌🎵',
      unreadCount: 0,
      time: '5天前',
      isMatched: true,
      isArchived: false,
      matchDays: 6,
      commonCircles: ['音乐爱好者']
    },
    {
      id: '10',
      nickname: '小梅',
      avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
      lastMessage: '你看到我的新动态了吗？',
      unreadCount: 0,
      time: '1周前',
      isMatched: true,
      isArchived: true,
      matchDays: 25,
      commonCircles: ['摄影爱好者']
    }
  ])

  const handleChatDetail = (userId: string) => {
    Taro.navigateTo({ url: `/pages/chat/detail?id=${userId}` })
  }

  const handleDelete = (_userId: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除此聊天记录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  }

  const handleBlock = (_userId: string) => {
    Taro.showModal({
      title: '确认拉黑',
      content: '确定要拉黑该用户吗？拉黑后将无法接收对方消息',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已拉黑', icon: 'success' })
        }
      }
    })
  }

  const renderChatItem = (chat: ChatUser) => (
    <Card
      className={`chat-item mb-3 ${chat.isArchived ? 'opacity-50' : ''}`}
      onClick={() => handleChatDetail(chat.id)}
    >
      <CardContent className="p-4">
        <View className="flex items-center gap-3">
          <View className="relative">
            <Avatar className="w-14 h-14">
              <AvatarImage src={chat.avatarUrl} />
              <AvatarFallback>{chat.nickname[0]}</AvatarFallback>
            </Avatar>
            {chat.isMatched && !chat.isArchived && (
              <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF6B8B] rounded-full flex items-center justify-center">
                <Heart size={10} color="#ffffff" />
              </View>
            )}
          </View>

          <View className="flex-1 min-w-0">
            <View className="flex items-center justify-between mb-1">
              <Text className={`text-base font-semibold ${chat.isArchived ? 'text-gray-400' : ''}`}>
                {chat.nickname}
              </Text>
              <Text className={`text-xs ${chat.isArchived ? 'text-gray-400' : 'text-gray-500'}`}>
                {chat.time}
              </Text>
            </View>
            <View className="flex items-center justify-between mb-1">
              <Text className={`text-sm truncate ${chat.isArchived ? 'text-gray-400' : 'text-gray-500'}`}>
                {chat.lastMessage}
              </Text>
              {chat.unreadCount > 0 && !chat.isArchived && (
                <Badge className="bg-[#FF6B8B] text-white">
                  {chat.unreadCount}
                </Badge>
              )}
            </View>
            {chat.matchDays > 0 && !chat.isArchived && (
              <View className="flex items-center gap-2">
                <Text className="text-xs text-[#FF6B8B]">匹配{chat.matchDays}天</Text>
                <Text className="text-xs text-gray-400">·</Text>
                {chat.commonCircles.slice(0, 2).map((circle, index) => (
                  <Text key={index} className="text-xs text-gray-400">{circle}</Text>
                ))}
              </View>
            )}
            {chat.isArchived && (
              <Badge className="bg-gray-200 text-gray-500 text-xs mt-1">14天无互动</Badge>
            )}
          </View>

          <View className="action-buttons flex flex-col gap-1">
            <Button
              variant="ghost"
              className="p-2"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(chat.id)
              }}
            >
              <Trash2 size={14} color="#999999" />
            </Button>
            <Button
              variant="ghost"
              className="p-2"
              onClick={(e) => {
                e.stopPropagation()
                handleBlock(chat.id)
              }}
            >
              <Ban size={14} color="#999999" />
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  )

  return (
    <View className="chat-list-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">消息</Text>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        {chats.length > 0 ? (
          chats.map(chat => renderChatItem(chat))
        ) : (
          <View className="empty-state text-center py-12">
            <Heart size={48} color="#999999" />
            <Text className="text-lg font-semibold text-gray-900 mt-4">还没有聊天消息</Text>
            <Text className="text-sm text-gray-500 mt-2">先去匹配认识新朋友吧</Text>
          </View>
        )}
      </View>
    </View>
  )
}
