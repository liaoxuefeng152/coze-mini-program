/* eslint-disable no-restricted-syntax */
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Heart } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import './index.css'

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false)

  const handleWechatLogin = () => {
    if (!agreed) {
      Taro.showToast({
        title: '请先同意隐私协议',
        icon: 'none'
      })
      return
    }

    // 模拟微信授权
    Taro.showLoading({ title: '授权中...' })

    // 模拟授权成功
    setTimeout(() => {
      Taro.hideLoading()
      // 授权成功后跳转到手机号绑定页面
      Taro.navigateTo({ url: '/pages/auth/phone' })
    }, 1500)
  }

  return (
    <View className="login-page h-full bg-white flex flex-col items-center justify-between py-20">
      {/* 顶部 LOGO 和标语 */}
      <View className="logo-section flex flex-col items-center">
        <View className="logo-icon mb-6">
          <Heart size={80} color="#FF6B8B" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">遇见对的人</Text>
      </View>

      {/* 中部按钮 */}
      <View className="login-section">
        <Button
          className="w-full px-16 py-3 rounded-lg"
          style={{
            width: '280px',
            height: '44px',
            backgroundColor: agreed ? '#FF6B8B' : '#E5E5E5',
            color: agreed ? '#FFFFFF' : '#999999'
          }}
          onClick={handleWechatLogin}
          disabled={!agreed}
        >
          <Text>微信一键登录</Text>
        </Button>
      </View>

      {/* 底部协议勾选 */}
      <View className="agreement-section px-8">
        <View className="flex items-center gap-2">
          <View
            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
              agreed ? 'bg-[#FF6B8B] border-[#FF6B8B]' : 'border-gray-300'
            }`}
            onClick={() => setAgreed(!agreed)}
          >
            {agreed && (
              <View className="w-3 h-3 bg-white rounded-sm"></View>
            )}
          </View>
          <Text className="text-sm text-gray-600">
            我已阅读并同意
            <Text className="text-[#FF6B8B]">《用户协议》</Text>
            <Text>和</Text>
            <Text className="text-[#FF6B8B]">《隐私协议》</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}
