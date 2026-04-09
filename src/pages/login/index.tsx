import { View, Text, Button, Checkbox } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Heart, User } from 'lucide-react-taro'
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

    Taro.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('用户信息', res.userInfo)
        // TODO: 调用后端登录接口
        Taro.showToast({
          title: '登录成功',
          icon: 'success'
        })
        // 登录成功后跳转到认证页面
        setTimeout(() => {
          Taro.navigateTo({ url: '/pages/auth/basic' })
        }, 1000)
      },
      fail: (err) => {
        console.error('获取用户信息失败', err)
        Taro.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  }

  const handleGetPhoneNumber = (e) => {
    console.log('获取手机号', e)
    // TODO: 调用后端获取手机号接口
  }

  return (
    <View className="login-page h-full flex flex-col items-center justify-center">
      <View className="logo-section mb-12 flex flex-col items-center">
        <View className="logo-icon mb-4">
          <Heart size={80} color="#f43f5e" />
        </View>
        <Text className="block text-3xl font-bold text-rose-500 mb-2">AI相亲</Text>
        <Text className="block text-sm text-gray-500">真实 · 高效 · 安全</Text>
      </View>

      <View className="login-section w-full px-8">
        <Button
          className="w-full bg-rose-500 text-white rounded-full py-4 text-lg mb-4"
          onClick={handleWechatLogin}
        >
          <View className="flex items-center justify-center gap-2">
            <User size={24} color="#ffffff" />
            <Text>微信授权登录</Text>
          </View>
        </Button>

        <Button
          className="w-full bg-green-500 text-white rounded-full py-4 text-lg"
          openType="getPhoneNumber"
          onGetPhoneNumber={handleGetPhoneNumber}
        >
          <View className="flex items-center justify-center gap-2">
            <Text>获取手机号</Text>
          </View>
        </Button>
      </View>

      <View className="agreement-section mt-8 px-8">
        <View className="flex items-center gap-2">
          <Checkbox
            checked={agreed}
            value="agreed"
            onChange={(e: any) => setAgreed(e.detail.value.includes('agreed'))}
            color="#f43f5e"
          />
          <Text className="text-sm text-gray-600">
            我已阅读并同意
            <Text className="text-rose-500">《用户协议》</Text>
            <Text>和</Text>
            <Text className="text-rose-500">《隐私协议》</Text>
          </Text>
        </View>
      </View>

      <View className="tips-section mt-12 px-8 text-center">
        <Text className="text-xs text-gray-400">
          登录即表示您同意遵守平台规则
          {'\n'}AI相亲 · 用心遇见真爱
        </Text>
      </View>
    </View>
  )
}
