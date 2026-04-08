import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, CheckCircle, Star } from 'lucide-react-taro'
import './index.css'

interface AuthItem {
  type: string
  name: string
  icon: string
  status: 'pending' | 'approved' | 'rejected'
  description: string
  benefit: string
}

export default function PremiumAuthPage() {
  const [authItems, setAuthItems] = useState<AuthItem[]>([
    {
      type: 'education',
      name: '学历认证',
      icon: '🎓',
      status: 'pending',
      description: '上传学历证书',
      benefit: '提高匹配权重 +10%'
    },
    {
      type: 'work',
      name: '工作认证',
      icon: '💼',
      status: 'pending',
      description: '上传工作证明',
      benefit: '提高匹配权重 +10%'
    },
    {
      type: 'house',
      name: '房产认证',
      icon: '🏠',
      status: 'pending',
      description: '上传房产证',
      benefit: '提高匹配权重 +10%'
    },
    {
      type: 'car',
      name: '车产认证',
      icon: '🚗',
      status: 'pending',
      description: '上传行驶证',
      benefit: '提高匹配权重 +10%'
    },
    {
      type: 'income',
      name: '收入认证',
      icon: '💰',
      status: 'pending',
      description: '上传收入证明',
      benefit: '提高匹配权重 +10%'
    }
  ])

  const handleAuth = (item: AuthItem) => {
    if (item.status === 'approved') {
      Taro.showToast({
        title: '已完成认证',
        icon: 'none'
      })
      return
    }

    Taro.showModal({
      title: `${item.name}`,
      content: `是否开始${item.name}？认证后将${item.benefit}`,
      success: (res) => {
        if (res.confirm) {
          // TODO: 跳转到对应认证页面
          console.log('开始认证', item.type)
        }
      }
    })
  }

  const getApprovedCount = () => {
    return authItems.filter(item => item.status === 'approved').length
  }

  const getMatchScoreBonus = () => {
    return getApprovedCount() * 10
  }

  return (
    <View className="auth-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">高信用认证</Text>
        <Text className="block text-sm text-gray-500 mt-1">完成认证，提高匹配成功率</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <View className="flex items-center gap-3 mb-3">
              <Star size={32} color="#ffffff" fill="#ffffff" />
              <View>
                <Text className="block text-xl font-bold">信用等级</Text>
                <Text className="block text-sm opacity-90">已认证 {getApprovedCount()}/5</Text>
              </View>
            </View>
            <View className="bg-white/20 rounded-lg p-3 mt-4">
              <Text className="block text-sm">
                匹配权重提升：<Text className="font-bold text-lg">+{getMatchScoreBonus()}%</Text>
              </Text>
            </View>
          </CardContent>
        </Card>

        <View className="auth-list space-y-3">
          <Text className="block text-sm font-semibold text-gray-700 mb-3">
            可选认证（全部完成后获得专属徽章）
          </Text>

          {authItems.map((item, index) => (
            <Card key={item.type} className="auth-item">
              <CardContent className="p-4">
                <View className="flex items-center gap-4">
                  <View className="icon-container text-3xl">
                    {item.icon}
                  </View>
                  <View className="flex-1">
                    <View className="flex items-center gap-2 mb-1">
                      <Text className="block font-semibold">{item.name}</Text>
                      {item.status === 'approved' && (
                        <CheckCircle size={16} color="#22c55e" />
                      )}
                      {item.status === 'approved' && (
                        <Badge className="text-xs">已认证</Badge>
                      )}
                    </View>
                    <Text className="block text-xs text-gray-500">{item.description}</Text>
                    <Text className="block text-xs text-rose-500 mt-1">{item.benefit}</Text>
                  </View>
                </View>
                <View className="mt-3">
                  <Button
                    className={`w-full py-2 ${
                      item.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-rose-500 text-white'
                    }`}
                    size="small"
                    onClick={() => handleAuth(item)}
                  >
                    {item.status === 'approved' ? '已完成' : '立即认证'}
                  </Button>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        <View className="tips-card mt-6">
          <View className="bg-amber-50 rounded-lg p-4">
            <Text className="block text-sm font-semibold text-amber-700 mb-2">
              💡 认证说明
            </Text>
            <Text className="block text-xs text-amber-600 mb-2">
              • 高信用认证为可选项，非强制
            </Text>
            <Text className="block text-xs text-amber-600 mb-2">
              • 认证越多，匹配成功率越高
            </Text>
            <Text className="block text-xs text-amber-600">
              • 完成全部认证后获得"高信用"专属徽章
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
