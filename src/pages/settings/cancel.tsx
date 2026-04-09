import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, ShieldAlert } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import './index.css'

export default function CancelApplyPage() {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!agreed) {
      Taro.showToast({ title: '请勾选确认', icon: 'none' })
      return
    }

    setLoading(true)

    try {
      // 模拟提交注销申请
      await new Promise(resolve => setTimeout(resolve, 1000))

      Taro.redirectTo({ url: '/pages/settings/canceling' })
    } catch (error) {
      Taro.showToast({ title: '操作失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="cancel-apply-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <Button variant="ghost" className="p-2" onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={20} color="#333333" />
        </Button>
        <Text className="text-lg font-semibold">注销账号</Text>
      </View>

      <View className="content px-4 py-6">
        <View className="bg-red-50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <ShieldAlert size={24} color="#EF4444" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-red-600 mb-2">
              注销后将造成以下影响
            </Text>
            <View className="space-y-2">
              <Text className="text-sm text-red-500">• 账号无法恢复，所有数据将被永久删除</Text>
              <Text className="text-sm text-red-500">• 需等待15天冷静期后方可正式注销</Text>
              <Text className="text-sm text-red-500">• 将自动退出所有已加入的圈子</Text>
              <Text className="text-sm text-red-500">• 取消所有待处理的匹配和聊天记录</Text>
              <Text className="text-sm text-red-500">• 无法使用微信一键登录重新注册</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-lg p-4 mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-3">注销后不可恢复的功能</Text>
          <View className="space-y-2">
            <View className="flex items-center gap-2">
              <View className="w-2 h-2 bg-gray-400 rounded-full"></View>
              <Text className="text-sm text-gray-500">个人资料和照片</Text>
            </View>
            <View className="flex items-center gap-2">
              <View className="w-2 h-2 bg-gray-400 rounded-full"></View>
              <Text className="text-sm text-gray-500">发布的动态和评论</Text>
            </View>
            <View className="flex items-center gap-2">
              <View className="w-2 h-2 bg-gray-400 rounded-full"></View>
              <Text className="text-sm text-gray-500">聊天记录和匹配记录</Text>
            </View>
            <View className="flex items-center gap-2">
              <View className="w-2 h-2 bg-gray-400 rounded-full"></View>
              <Text className="text-sm text-gray-500">认证信息和信用积分</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-lg p-4 mb-6">
          <View 
            className="flex items-start gap-3"
            onClick={() => setAgreed(!agreed)}
          >
            <Checkbox checked={agreed} />
            <Text className="flex-1 text-sm text-gray-600">
              我已阅读并理解上述影响，确认要注销账号
            </Text>
          </View>
        </View>

        <Button
          className="w-full bg-red-500 text-white rounded-full py-4"
          onClick={handleConfirm}
          disabled={!agreed || loading}
        >
          确认注销
        </Button>

        <Button
          variant="ghost"
          className="w-full mt-3 text-gray-500"
          onClick={() => Taro.navigateBack()}
        >
          取消
        </Button>
      </View>
    </View>
  )
}
