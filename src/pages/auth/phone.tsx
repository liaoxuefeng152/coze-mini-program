import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react-taro'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './index.css'

export default function PhoneBindPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleGetCode = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }

    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    Taro.showToast({ title: '验证码已发送', icon: 'success' })
  }

  const handleNext = async () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }

    if (!code || code.length !== 6) {
      Taro.showToast({ title: '请输入6位验证码', icon: 'none' })
      return
    }

    setLoading(true)

    try {
      // 模拟验证
      await new Promise(resolve => setTimeout(resolve, 1000))

      Taro.showToast({ title: '绑定成功', icon: 'success' })
      setTimeout(() => {
        Taro.redirectTo({ url: '/pages/auth/basic' })
      }, 1000)
    } catch (error) {
      Taro.showToast({ title: '验证失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="phone-bind-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <Button variant="ghost" className="p-2" onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={20} color="#333333" />
        </Button>
        <Text className="text-lg font-semibold">绑定手机号</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">手机号绑定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <View>
              <Text className="block text-sm font-medium text-gray-700 mb-2">手机号</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  type="number"
                  placeholder="请输入手机号"
                  value={phone}
                  onInput={(e) => setPhone(e.detail.value)}
                  maxlength={11}
                />
              </View>
            </View>

            <View>
              <Text className="block text-sm font-medium text-gray-700 mb-2">验证码</Text>
              <View className="flex gap-2">
                <View className="flex-1 bg-gray-50 rounded-lg px-4 py-3">
                  <Input
                    className="w-full bg-transparent"
                    type="number"
                    placeholder="请输入验证码"
                    value={code}
                    onInput={(e) => setCode(e.detail.value)}
                    maxlength={6}
                  />
                </View>
                <Button
                  variant="outline"
                  className="whitespace-nowrap px-4"
                  onClick={handleGetCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </Button>
              </View>
            </View>
          </CardContent>
        </Card>

        <View className="tips bg-gray-100 rounded-lg p-3 mb-4">
          <Text className="text-xs text-gray-500">
            未注册用户将自动创建账号，绑定即表示同意《用户协议》和《隐私政策》
          </Text>
        </View>

        <Button
          className="w-full bg-[#FF6B8B] text-white rounded-full py-4"
          onClick={handleNext}
          disabled={loading}
        >
          下一步
        </Button>
      </View>
    </View>
  )
}
