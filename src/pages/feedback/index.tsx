import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import './index.css'

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('bug')
  const [content, setContent] = useState('')
  const [contact] = useState('')

  const feedbackTypes = [
    { value: 'bug', label: '功能异常' },
    { value: 'suggestion', label: '功能建议' },
    { value: 'other', label: '其他问题' }
  ]

  const handleSubmit = () => {
    if (!content.trim()) {
      Taro.showToast({ title: '请输入反馈内容', icon: 'none' })
      return
    }

    Taro.showToast({ title: '提交成功', icon: 'success' })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  return (
    <View className="feedback-page h-full bg-[#FAFAFA] flex flex-col">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">意见反馈</Text>
        </View>
      </View>

      <View className="content flex-1 overflow-y-auto px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">反馈类型</Text>
            <View className="type-options flex flex-wrap gap-2">
              {feedbackTypes.map(type => (
                <Button
                  key={type.value}
                  variant={feedbackType === type.value ? "default" : "outline"}
                  className={feedbackType === type.value ? "bg-[#FF6B8B] text-white" : ""}
                  onClick={() => setFeedbackType(type.value)}
                >
                  <Text>{type.label}</Text>
                </Button>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">反馈内容</Text>
            <Textarea
              style={{ width: '100%', minHeight: '200px' }}
              placeholder="请详细描述您遇到的问题或建议..."
              value={content}
              onInput={(e) => setContent(e.detail.value)}
              maxlength={500}
            />
            <Text className="text-xs text-gray-500 text-right mt-1">{content.length}/500</Text>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">联系方式（选填）</Text>
            <View className="input-wrapper bg-gray-50 rounded-xl px-4 py-3">
              <Text className="text-sm text-gray-800">
                {contact || '手机号或邮箱，方便我们联系您'}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 mt-2">
              我们会认真处理您的反馈，感谢您的支持！
            </Text>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-[#FF6B8B] text-white py-3 rounded-xl flex items-center justify-center gap-2 mb-20"
          onClick={handleSubmit}
        >
          <Send size={18} color="#ffffff" />
          <Text>提交反馈</Text>
        </Button>
      </View>
    </View>
  )
}
