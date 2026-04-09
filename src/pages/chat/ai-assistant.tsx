import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Sparkles, X, MessageCircle, Heart, Coffee } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import './ai-assistant.css'

type SuggestionType = 'opener' | 'topic' | 'reply' | 'advance'

interface SuggestionItem {
  id: string
  type: SuggestionType
  icon: React.ReactNode
  category: string
  content: string
}

export default function AIAssistantPage() {
  const suggestions: SuggestionItem[] = [
    // 开场白
    {
      id: 'opener-1',
      type: 'opener',
      icon: <MessageCircle size={16} color="#FF6B8B" />,
      category: '开场白',
      content: '你好，看到你的资料感觉我们有很多共同点'
    },
    {
      id: 'opener-2',
      type: 'opener',
      icon: <MessageCircle size={16} color="#FF6B8B" />,
      category: '开场白',
      content: '哈喽，很高兴认识你，你最近怎么样'
    },
    {
      id: 'opener-3',
      type: 'opener',
      icon: <MessageCircle size={16} color="#FF6B8B" />,
      category: '开场白',
      content: '嗨，看到你也喜欢美食，有什么推荐吗'
    },
    // 话题推荐
    {
      id: 'topic-1',
      type: 'topic',
      icon: <Sparkles size={16} color="#8B5CF6" />,
      category: '话题',
      content: '最近在追什么好看的剧吗'
    },
    {
      id: 'topic-2',
      type: 'topic',
      icon: <Sparkles size={16} color="#8B5CF6" />,
      category: '话题',
      content: '周末通常喜欢做什么放松'
    },
    {
      id: 'topic-3',
      type: 'topic',
      icon: <Sparkles size={16} color="#8B5CF6" />,
      category: '话题',
      content: '有没有想去旅行的地方'
    },
    {
      id: 'topic-4',
      type: 'topic',
      icon: <Sparkles size={16} color="#8B5CF6" />,
      category: '话题',
      content: '你觉得什么样的生活最理想'
    },
    // 回复建议
    {
      id: 'reply-1',
      type: 'reply',
      icon: <Heart size={16} color="#EC4899" />,
      category: '回复',
      content: '哈哈，我也是这么想的'
    },
    {
      id: 'reply-2',
      type: 'reply',
      icon: <Heart size={16} color="#EC4899" />,
      category: '回复',
      content: '这个想法很不错，我们可以一起试试'
    },
    {
      id: 'reply-3',
      type: 'reply',
      icon: <Heart size={16} color="#EC4899" />,
      category: '回复',
      content: '听起来很有趣，能多说说吗'
    },
    // 推进话术
    {
      id: 'advance-1',
      type: 'advance',
      icon: <Coffee size={16} color="#F59E0B" />,
      category: '推进',
      content: '要不我们找个时间见面聊聊'
    },
    {
      id: 'advance-2',
      type: 'advance',
      icon: <Coffee size={16} color="#F59E0B" />,
      category: '推进',
      content: '如果你不介意的话，我们可以加个微信'
    },
    {
      id: 'advance-3',
      type: 'advance',
      icon: <Coffee size={16} color="#F59E0B" />,
      category: '推进',
      content: '感觉我们聊得挺投缘，要不要交换联系方式'
    }
  ]

  const handleClose = () => {
    Taro.navigateBack()
  }

  const handleSelect = (suggestion: SuggestionItem) => {
    // 获取上一页的实例并调用设置内容的方法
    const pages = Taro.getCurrentPages()
    const prevPage = pages[pages.length - 2] as any
    
    if (prevPage && prevPage.setChatInput) {
      prevPage.setChatInput(suggestion.content)
    }
    
    Taro.navigateBack()
  }

  const getCategoryIcon = (type: SuggestionType) => {
    switch (type) {
      case 'opener':
        return <MessageCircle size={14} color="#999999" />
      case 'topic':
        return <Sparkles size={14} color="#999999" />
      case 'reply':
        return <Heart size={14} color="#999999" />
      case 'advance':
        return <Coffee size={14} color="#999999" />
    }
  }

  const getCategoryName = (type: SuggestionType) => {
    switch (type) {
      case 'opener':
        return '开场白'
      case 'topic':
        return '话题推荐'
      case 'reply':
        return '回复建议'
      case 'advance':
        return '推进话术'
    }
  }

  const groupedSuggestions = suggestions.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = []
    }
    acc[item.type].push(item)
    return acc
  }, {} as Record<SuggestionType, SuggestionItem[]>)

  return (
    <View 
      className="ai-assistant-page h-full" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <View className="drawer-container">
        {/* 顶部拖拽栏 */}
        <View className="drag-handle" />

        {/* 头部 */}
        <View className="header px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <View className="flex items-center gap-2">
            <Sparkles size={20} color="#FF6B8B" />
            <Text className="text-lg font-semibold text-gray-900">AI聊天助手</Text>
          </View>
          <Button 
            variant="ghost" 
            className="p-2" 
            onClick={handleClose}
          >
            <X size={20} color="#999999" />
          </Button>
        </View>

        {/* 内容区域 */}
        <View className="content">
          {(['opener', 'topic', 'reply', 'advance'] as SuggestionType[]).map(type => {
            const items = groupedSuggestions[type]
            if (!items || items.length === 0) return null

            return (
              <View key={type} className="mb-4">
                <View className="section-title px-4 mb-2 flex items-center gap-2">
                  {getCategoryIcon(type)}
                  <Text className="text-sm font-medium text-gray-600">
                    {getCategoryName(type)}
                  </Text>
                </View>

                <View className="suggestions-list px-4">
                  {items.map(item => (
                    <Card
                      key={item.id}
                      className="suggestion-card mb-2"
                      onClick={() => handleSelect(item)}
                    >
                      <CardContent className="p-3">
                        <View className="flex items-start gap-2">
                          <View className="icon-wrapper">
                            {item.icon}
                          </View>
                          <Text className="text-sm text-gray-800 flex-1 leading-5">
                            {item.content}
                          </Text>
                        </View>
                      </CardContent>
                    </Card>
                  ))}
                </View>
              </View>
            )
          })}

          {/* 底部提示 */}
          <View className="px-4 py-3">
            <View className="bg-blue-50 rounded-lg p-3">
              <Text className="text-xs text-blue-600 text-center">
                💡 点击推荐内容即可自动填入聊天框
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
