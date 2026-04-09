import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft, ChevronRight, Bell, Lock, Info, LogOut } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import './index.css'

export default function SettingsPage() {
  const handleLogout = () => {
    Taro.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已退出登录', icon: 'success' })
          Taro.reLaunch({ url: '/pages/login/index' })
        }
      }
    })
  }

  const handleAbout = () => {
    Taro.showToast({ title: '关于我们', icon: 'none' })
  }

  const handlePrivacy = () => {
    Taro.showToast({ title: '隐私政策', icon: 'none' })
  }

  const handleTerms = () => {
    Taro.showToast({ title: '服务条款', icon: 'none' })
  }

  const handleClearCache = () => {
    Taro.showModal({
      title: '清除缓存',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '缓存已清除', icon: 'success' })
        }
      }
    })
  }

  return (
    <View className="settings-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => Taro.navigateBack()}
          >
            <ArrowLeft size={20} color="#333333" />
          </Button>
          <Text className="text-xl font-bold">设置</Text>
        </View>
      </View>

      <View className="content h-full overflow-y-auto px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-0">
            <View className="menu-item flex items-center justify-between p-4">
              <View className="flex items-center gap-3">
                <Bell size={20} color="#FF6B8B" />
                <Text className="text-base">消息通知</Text>
              </View>
              <Text className="text-sm text-gray-400">已开启</Text>
            </View>
            <Separator />
            <View className="menu-item flex items-center justify-between p-4">
              <View className="flex items-center gap-3">
                <Lock size={20} color="#3B82F6" />
                <Text className="text-base">隐私设置</Text>
              </View>
              <ChevronRight size={18} color="#999999" />
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-0">
            <View className="menu-item flex items-center justify-between p-4" onClick={handleAbout}>
              <View className="flex items-center gap-3">
                <Info size={20} color="#10B981" />
                <Text className="text-base">关于我们</Text>
              </View>
              <ChevronRight size={18} color="#999999" />
            </View>
            <Separator />
            <View className="menu-item flex items-center justify-between p-4" onClick={handlePrivacy}>
              <Text className="text-base">隐私政策</Text>
              <ChevronRight size={18} color="#999999" />
            </View>
            <Separator />
            <View className="menu-item flex items-center justify-between p-4" onClick={handleTerms}>
              <Text className="text-base">服务条款</Text>
              <ChevronRight size={18} color="#999999" />
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-0">
            <View className="menu-item flex items-center justify-between p-4" onClick={handleClearCache}>
              <Text className="text-base">清除缓存</Text>
              <Text className="text-sm text-gray-400">23.5 MB</Text>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-20">
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={18} color="#EF4444" />
              <Text className="text-red-500">退出登录</Text>
            </Button>
          </CardContent>
        </Card>

        <View className="text-center pb-8">
          <Text className="text-xs text-gray-400">当前版本 v1.0.0</Text>
        </View>
      </View>
    </View>
  )
}
