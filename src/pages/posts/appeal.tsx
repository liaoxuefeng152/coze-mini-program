import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import './index.css'

export default function PostAppealPage() {
  const [appealText, setAppealText] = useState('')
  const [loading, setLoading] = useState(false)
  const appealCount = 1 // 模拟当前申诉次数

  const handleSubmit = async () => {
    if (!appealText.trim()) {
      Taro.showToast({ title: '请输入申诉理由', icon: 'none' })
      return
    }

    setLoading(true)

    try {
      // 模拟提交申诉
      await new Promise(resolve => setTimeout(resolve, 1000))

      Taro.showToast({ title: '申诉提交成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1000)
    } catch (error) {
      Taro.showToast({ title: '提交失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="post-appeal-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <Button variant="ghost" className="p-2" onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={20} color="#333333" />
        </Button>
        <Text className="text-lg font-semibold">申诉</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-sm font-medium text-gray-500 mb-2">原内容</Text>
            <View className="flex gap-3">
              <View className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Text className="text-xs text-gray-400">图片</Text>
              </View>
              <Text className="flex-1 text-sm text-gray-700">
                今天的健身打卡，坚持就是胜利！
              </Text>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-sm font-medium text-red-500 mb-2">驳回原因</Text>
            <Text className="text-sm text-gray-700 mb-2">
              内容包含敏感词汇或疑似广告信息，请修改后重新发布
            </Text>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              申诉理由 <Text className="text-red-500">*</Text>
            </Text>
            <Textarea
              style={{ width: '100%', minHeight: '120px' }}
              placeholder="请详细说明申诉理由..."
              value={appealText}
              onInput={(e) => setAppealText(e.detail.value)}
              maxlength={200}
            />
            <Text className="text-xs text-gray-400 text-right mt-1">
              {appealText.length}/200
            </Text>
          </CardContent>
        </Card>

        <View className="bg-amber-50 rounded-lg p-4 mb-6">
          <Text className="text-sm font-medium text-amber-700 mb-2">申诉须知</Text>
          <Text className="text-xs text-amber-600 mb-1">
            1. 每条动态最多可申诉2次
          </Text>
          <Text className="text-xs text-amber-600 mb-1">
            2. 申诉结果将在1-3个工作日内通知
          </Text>
          <Text className="text-xs text-amber-600">
            3. 恶意申诉将可能被限制功能使用
          </Text>
        </View>

        <Button
          className="w-full bg-[#FF6B8B] text-white rounded-full py-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          提交申诉（剩余{2 - appealCount}次）
        </Button>
      </View>
    </View>
  )
}
