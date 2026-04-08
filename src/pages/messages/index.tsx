import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Heart, Bot, Trash2 } from 'lucide-react-taro'
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
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('chats')
  const [chats] = useState<ChatUser[]>([
    {
      id: '1',
      nickname: '小美',
      avatarUrl: 'https://via.placeholder.com/100',
      lastMessage: '明天去公园散步吧',
      unreadCount: 2,
      time: '刚刚',
      isMatched: true
    },
    {
      id: '2',
      nickname: '小红',
      avatarUrl: 'https://via.placeholder.com/100',
      lastMessage: '我对你很感兴趣',
      unreadCount: 0,
      time: '10:30',
      isMatched: true
    }
  ])
  const [likes] = useState<ChatUser[]>([
    {
      id: '3',
      nickname: '小芳',
      avatarUrl: 'https://via.placeholder.com/100',
      lastMessage: '这是我的性格测试结果',
      unreadCount: 0,
      time: '昨天',
      isMatched: false
    }
  ])

  const handleChatDetail = (userId: string) => {
    Taro.navigateTo({ url: `/pages/chat/detail?id=${userId}` })
  }

  const handleAIBreaker = () => {
    Taro.showToast({ title: 'AI破冰正在开发中', icon: 'none' })
  }

  const renderChatItem = (chat: ChatUser) => (
    <Card
      className="chat-item mb-3"
      onClick={() => handleChatDetail(chat.id)}
    >
      <CardContent className="p-4">
        <View className="flex items-center gap-3">
          <View className="relative">
            <Avatar className="w-14 h-14">
              <AvatarImage src={chat.avatarUrl} />
              <AvatarFallback>{chat.nickname[0]}</AvatarFallback>
            </Avatar>
            {chat.isMatched && (
              <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                <Heart size={10} color="#ffffff" />
              </View>
            )}
          </View>

          <View className="flex-1 min-w-0">
            <View className="flex items-center justify-between mb-1">
              <Text className="text-base font-semibold">{chat.nickname}</Text>
              <Text className="text-xs text-gray-500">{chat.time}</Text>
            </View>
            <View className="flex items-center justify-between">
              <Text className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </Text>
              {chat.unreadCount > 0 && (
                <Badge className="bg-rose-500 text-white">
                  {chat.unreadCount}
                </Badge>
              )}
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  )

  return (
    <View className="messages-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900">消息</Text>
        </View>
        <Button
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleAIBreaker}
        >
          <Bot size={18} color="#f43f5e" />
          <Text>AI破冰</Text>
        </Button>
      </View>

      <View className="content h-full overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 bg-gray-200 p-1 rounded-xl mx-4 mt-4">
            <TabsTrigger value="chats" className="data-[state=active]:bg-white data-[state=active]:shadow">
              聊天
            </TabsTrigger>
            <TabsTrigger value="likes" className="data-[state=active]:bg-white data-[state=active]:shadow">
              喜欢
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="mt-4 px-4">
            {chats.length > 0 ? (
              <View>
                {chats.map(chat => (
                  <View key={chat.id}>
                    {renderChatItem(chat)}
                  </View>
                ))}
                <View className="clear-all mt-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 text-gray-500"
                    onClick={() => Taro.showModal({
                      title: '确认清除',
                      content: '确定要清空所有聊天记录吗？',
                      success: (res) => {
                        if (res.confirm) {
                          Taro.showToast({ title: '已清除', icon: 'success' })
                        }
                      }
                    })}
                  >
                    <Trash2 size={14} color="#6b7280" />
                    <Text>清空聊天记录</Text>
                  </Button>
                </View>
              </View>
            ) : (
              <View className="empty-state text-center py-12">
                <MessageCircle size={48} color="#f43f5e" />
                <Text className="text-lg font-semibold text-gray-900 mt-4">还没有聊天消息</Text>
                <Text className="text-sm text-gray-500 mt-2">先去匹配认识新朋友吧</Text>
              </View>
            )}
          </TabsContent>

          <TabsContent value="likes" className="mt-4 px-4">
            {likes.length > 0 ? (
              <View>
                {likes.map(like => (
                  <View key={like.id}>
                    {renderChatItem(like)}
                  </View>
                ))}
              </View>
            ) : (
              <View className="empty-state text-center py-12">
                <Heart size={48} color="#9ca3af" />
                <Text className="text-lg font-semibold text-gray-900 mt-4">还没有喜欢</Text>
                <Text className="text-sm text-gray-500 mt-2">多喜欢一些人吧</Text>
              </View>
            )}
          </TabsContent>
        </Tabs>
      </View>
    </View>
  )
}
