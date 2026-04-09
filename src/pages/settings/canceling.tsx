import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Clock } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import './index.css'

const CANCEL_DAYS = 15

export default function CancelingPage() {
  // 模拟倒计时数据
  const remainingDays = CANCEL_DAYS
  const remainingHours = 12

  const handleRevoke = () => {
    Taro.showModal({
      title: '确认撤销注销',
      content: '确定要撤销注销申请吗？撤销后账号将恢复正常使用。',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已撤销注销申请', icon: 'success' })
          setTimeout(() => {
            Taro.navigateBack()
          }, 1500)
        }
      }
    })
  }

  return (
    <View className="canceling-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <Text className="text-lg font-semibold">注销申请中</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <View className="w-20 h-20 bg-[#FFF0F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={40} color="#FF6B8B" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-2">
              账号注销申请已提交
            </Text>
            <Text className="text-sm text-gray-500 mb-4">
              感谢您一路陪伴，祝您生活愉快
            </Text>
            
            <View className="bg-[#FFF0F5] rounded-lg p-4">
              <Text className="text-sm text-gray-500 mb-2">注销倒计时</Text>
              <View className="flex items-center justify-center gap-4">
                <View className="text-center">
                  <Text className="text-3xl font-bold text-[#FF6B8B]">
                    {remainingDays}
                  </Text>
                  <Text className="text-xs text-gray-500">天</Text>
                </View>
                <Text className="text-2xl text-gray-400">:</Text>
                <View className="text-center">
                  <Text className="text-3xl font-bold text-[#FF6B8B]">
                    {remainingHours}
                  </Text>
                  <Text className="text-xs text-gray-500">时</Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>

        <View className="bg-white rounded-lg p-4 mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-3">注销说明</Text>
          <View className="space-y-2">
            <View className="flex items-start gap-2">
              <View className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Text className="text-xs text-gray-500">1</Text>
              </View>
              <Text className="text-sm text-gray-500">
                冷静期为{CANCEL_DAYS}天，期间可随时撤销注销申请
              </Text>
            </View>
            <View className="flex items-start gap-2">
              <View className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Text className="text-xs text-gray-500">2</Text>
              </View>
              <Text className="text-sm text-gray-500">
                冷静期结束后，账号数据将被永久删除
              </Text>
            </View>
            <View className="flex items-start gap-2">
              <View className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Text className="text-xs text-gray-500">3</Text>
              </View>
              <Text className="text-sm text-gray-500">
                撤销后账号立即恢复正常使用
              </Text>
            </View>
          </View>
        </View>

        <Button
          variant="outline"
          className="w-full rounded-full py-4"
          onClick={handleRevoke}
        >
          撤销注销申请
        </Button>
      </View>
    </View>
  )
}
