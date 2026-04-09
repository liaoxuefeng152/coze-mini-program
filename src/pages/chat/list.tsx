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
}

export default function ChatListPage() {
  const [chats] = useState<ChatUser[]>([
    {
      id: '1',
      nickname: '小美',
      avatarUrl: 'https://via.placeholder.com/100',
      lastMessage: '明天去公园散步吧',
      unreadCount: 2,
      time: '刚刚',
      isMatched: true,
      isArchived: false
    },
    {
      id: '2',
      nickname: '小红',
      avatarUrl: 'https://via.placeholder.com/100',
      lastMessage: '我对你很感兴趣',
      unreadCount: 0,
      time: '10:30',
      isMatched: true,
      isArchived: false
    },
    {
      id: '3',
      nickname: '小芳',
      avatarUrl: 'https://via.placeholder.com/100',
      lastMessage: '这是我的性格测试结果',
      unreadCount: 0,
      time: '3天前',
      isMatched: true,
      isArchived: true
    }
  ])

  const handleChatDetail = (userId: string) => {
    Taro.navigateTo({ url: `/pages/chat/detail?id=${userId}` })
  }

  const handleDelete = (userId: string) => {
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

  const handleBlock = (userId: string) => {
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
            <View className="flex items-center justify-between">
              <Text className={`text-sm truncate ${chat.isArchived ? 'text-gray-400' : 'text-gray-500'}`}>
                {chat.lastMessage}
              </Text>
              {chat.unreadCount > 0 && !chat.isArchived && (
                <Badge className="bg-[#FF6B8B] text-white">
                  {chat.unreadCount}
                </Badge>
              )}
            </View>
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
