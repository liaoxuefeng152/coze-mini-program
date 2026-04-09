import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Heart, Users, Settings, Bell, MessageCircle, LogOut } from 'lucide-react-taro'
import './index.css'

interface MenuItem {
  icon: React.ReactNode
  title: string
  path?: string
  action?: () => void
  danger?: boolean
}

export default function ProfilePage() {
  const userInfo = {
    nickname: '小美',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    userId: '520888',
    isVerified: true
  }

  const stats = [
    { label: '喜欢', value: 128 },
    { label: '被喜欢', value: 56 },
    { label: '匹配', value: 8 },
    { label: '动态', value: 24 },
    { label: '圈子', value: 3 }
  ]

  const menuItems: MenuItem[] = [
    { icon: <MessageCircle size={20} color="#6b7280" />, title: '我的动态', path: '/pages/profile/posts' },
    { icon: <Users size={20} color="#6b7280" />, title: '我的圈子', path: '/pages/circles/my' },
    { icon: <Heart size={20} color="#6b7280" />, title: '喜欢/匹配', path: '/pages/likes/index' },
    { icon: <Heart size={20} color="#6b7280" />, title: '黑名单', path: '/pages/blocklist/index' },
    { icon: <Settings size={20} color="#6b7280" />, title: '设置', path: '/pages/settings/index' },
    { icon: <Bell size={20} color="#6b7280" />, title: '意见反馈', path: '/pages/feedback/index' },
    { icon: <LogOut size={20} color="#ef4444" />, title: '注销账号', action: handleLogout, danger: true }
  ]

  function handleLogout() {
    Taro.showModal({
      title: '注销账号',
      content: '确定要注销账号吗？注销后所有数据将无法恢复。',
      confirmText: '确定注销',
      confirmColor: '#f43f5e',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '账号已注销', icon: 'none' })
          setTimeout(() => {
            Taro.reLaunch({ url: '/pages/login/index' })
          }, 1500)
        }
      }
    })
  }

  const handleMenuClick = (item: MenuItem) => {
    if (item.action) {
      item.action()
    } else if (item.path) {
      Taro.navigateTo({ url: item.path })
    }
  }

  const handleAvatarClick = () => {
    Taro.navigateTo({ url: '/pages/profile/edit' })
  }

  return (
    <View className="profile-page h-full bg-gray-50">
      {/* 顶部用户信息 */}
      <View className="bg-gradient-to-r from-rose-500 to-pink-500 px-4 pt-8 pb-6">
        <View className="flex items-center gap-4" onClick={handleAvatarClick}>
          <Avatar className="w-16 h-16 border-2 border-white">
            <AvatarImage src={userInfo.avatarUrl} />
            <AvatarFallback className="bg-rose-300">美</AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <View className="flex items-center gap-2">
              <Text className="text-xl font-bold text-white">{userInfo.nickname}</Text>
              {userInfo.isVerified && (
                <Badge className="bg-white text-rose-500 text-xs">已认证</Badge>
              )}
            </View>
            <Text className="text-sm text-white opacity-80 mt-1">ID: {userInfo.userId}</Text>
          </View>
          <ArrowRight size={20} color="#ffffff" />
        </View>
      </View>

      {/* 数据统计 */}
      <View className="bg-white mx-4 -mt-4 rounded-xl p-4 shadow-sm">
        <View className="flex justify-around">
          {stats.map((stat, index) => (
            <View key={index} className="text-center">
              <Text className="text-xl font-bold text-gray-900">{stat.value}</Text>
              <Text className="text-xs text-gray-500 mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 菜单列表 */}
      <View className="mt-4 mx-4 space-y-2">
        {menuItems.map((item, index) => (
          <Card
            key={index}
            className={`cursor-pointer ${item.danger ? 'border-red-100' : ''}`}
            onClick={() => handleMenuClick(item)}
          >
            <CardContent className="p-4">
              <View className={`flex items-center gap-3 ${item.danger ? 'text-red-500' : ''}`}>
                <View className={item.danger ? 'text-red-500' : 'text-gray-500'}>
                  {item.icon}
                </View>
                <Text className={`flex-1 ${item.danger ? 'text-red-500' : 'text-gray-900'}`}>
                  {item.title}
                </Text>
                <ArrowRight size={18} color={item.danger ? '#ef4444' : '#d1d5db'} />
              </View>
            </CardContent>
          </Card>
        ))}
      </View>

      {/* 底部留白 */}
      <View className="h-20" />
    </View>
  )
}
