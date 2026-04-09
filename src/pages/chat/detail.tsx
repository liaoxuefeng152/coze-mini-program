import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Send, Image as ImageIcon } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import './detail.css'

interface Message {
  id: string
  userId: string
  content: string
  type: 'text' | 'image'
  imageUrl?: string
  timestamp: string
  isSelf: boolean
}

export default function ChatDetailPage() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      userId: '1',
      content: '你好，很高兴认识你！',
      type: 'text',
      timestamp: '09:30',
      isSelf: false
    },
    {
      id: '2',
      userId: '2',
      content: '你好呀！我也很高兴认识你~',
      type: 'text',
      timestamp: '09:32',
      isSelf: true
    },
    {
      id: '3',
      userId: '1',
      content: '看到你的资料，我们有很多共同爱好呢',
      type: 'text',
      timestamp: '09:35',
      isSelf: false
    },
    {
      id: '4',
      userId: '2',
      content: '是啊，我也很喜欢旅行和美食',
      type: 'text',
      timestamp: '09:38',
      isSelf: true
    },
    {
      id: '5',
      userId: '1',
      content: '这是我们上次去海边旅行的照片，风景超美！',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
      timestamp: '09:40',
      isSelf: false
    },
    {
      id: '6',
      userId: '2',
      content: '太美了！我也想去海边玩',
      type: 'text',
      timestamp: '09:42',
      isSelf: true
    }
  ])
  const [inputText, setInputText] = useState('')
  const [otherUser] = useState({
    id: '1',
    nickname: '小美',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    online: true
  })

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    Taro.showToast({ title: '消息发送成功', icon: 'success' })
    setInputText('')
  }

  const handleSendImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: () => {
        Taro.showToast({ title: '图片发送成功', icon: 'success' })
      }
    })
  }

  const renderMessage = (msg: Message) => (
    <View
      key={msg.id}
      className={`message-item mb-4 flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
    >
      {!msg.isSelf && (
        <Avatar className="w-10 h-10 mr-2">
          <AvatarImage src={otherUser.avatarUrl} />
          <AvatarFallback>{otherUser.nickname[0]}</AvatarFallback>
        </Avatar>
      )}
      <View className={`message-content max-w-70 ${msg.isSelf ? 'order-first' : ''}`}>
        <Card className={msg.isSelf ? 'bg-[#FF6B8B] border-[#FF6B8B]' : ''}>
          <CardContent className="p-3">
            {msg.type === 'image' && msg.imageUrl ? (
              <Image
                src={msg.imageUrl}
                mode="widthFix"
                className="w-48 rounded-lg"
              />
            ) : (
              <Text className={`text-sm ${msg.isSelf ? 'text-white' : 'text-gray-800'}`}>
                {msg.content}
              </Text>
            )}
          </CardContent>
        </Card>
        <Text className={`text-xs text-gray-400 mt-1 ${msg.isSelf ? 'text-right' : 'text-left'}`}>
          {msg.timestamp}
        </Text>
      </View>
      {msg.isSelf && (
        <Avatar className="w-10 h-10 ml-2">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
          <AvatarFallback>我</AvatarFallback>
        </Avatar>
      )}
    </View>
  )

  return (
    <View className="chat-detail-page h-full bg-[#FAFAFA] flex flex-col">
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
            <Avatar className="w-10 h-10">
              <AvatarImage src={otherUser.avatarUrl} />
              <AvatarFallback>{otherUser.nickname[0]}</AvatarFallback>
            </Avatar>
            <View>
              <Text className="text-base font-semibold">{otherUser.nickname}</Text>
              <View className="flex items-center gap-1">
                <View className={`w-2 h-2 rounded-full ${otherUser.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                <Text className="text-xs text-gray-500">
                  {otherUser.online ? '在线' : '离线'}
                </Text>
              </View>
            </View>
          </View>
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateTo({ url: `/pages/profile/detail?id=${otherUser.id}` })}
          >
            <Text className="text-sm text-gray-600">查看资料</Text>
          </Button>
        </View>
      </View>

      <View className="messages-container flex-1 overflow-y-auto px-4 py-4">
        {messages.map(msg => renderMessage(msg))}
      </View>

      <View className="input-area bg-white px-4 py-3 border-t border-gray-100" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <View className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="p-2"
            onClick={handleSendImage}
          >
            <ImageIcon size={20} color="#999999" />
          </Button>
          <View className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <Text
              className="text-sm text-gray-600"
            >
              {inputText || '输入消息...'}
            </Text>
          </View>
          <Button
            className="bg-[#FF6B8B] text-white px-4 py-2 rounded-full"
            onClick={handleSendMessage}
          >
            <Send size={18} color="#ffffff" />
          </Button>
        </View>
      </View>
    </View>
  )
}
