import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './index.css'

export default function BasicAuthPage() {
  const [realName, setRealName] = useState('')
  const [idCard, setIdCard] = useState('')
  const [loading, setLoading] = useState(false)

  const validateIdCard = (id) => {
    // 简单的身份证格式验证
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(id)
  }

  const handleNext = async () => {
    if (!realName.trim()) {
      Taro.showToast({
        title: '请输入真实姓名',
        icon: 'none'
      })
      return
    }

    if (!idCard.trim()) {
      Taro.showToast({
        title: '请输入身份证号',
        icon: 'none'
      })
      return
    }

    if (!validateIdCard(idCard)) {
      Taro.showToast({
        title: '身份证号格式错误',
        icon: 'none'
      })
      return
    }

    setLoading(true)

    try {
      // TODO: 调用后端验证身份证接口
      console.log('实名信息', { realName, idCard })

      Taro.showToast({
        title: '验证成功',
        icon: 'success'
      })

      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/auth/face' })
      }, 1000)
    } catch (error) {
      console.error('验证失败', error)
      Taro.showToast({
        title: '验证失败，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="auth-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">基础认证</Text>
        <Text className="block text-sm text-gray-500 mt-1">请填写真实信息，用于实名认证</Text>
      </View>

      <View className="step-indicator flex items-center justify-center py-4">
        <View className="flex items-center gap-2">
          <View className="step-circle active flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-sm font-semibold">
            1
          </View>
          <View className="step-line w-12 h-0.5 bg-gray-300"></View>
          <View className="step-circle flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 text-sm font-semibold">
            2
          </View>
          <View className="step-line w-12 h-0.5 bg-gray-300"></View>
          <View className="step-circle flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 text-sm font-semibold">
            3
          </View>
        </View>
        <View className="flex gap-4 ml-4 text-xs text-gray-500">
          <Text>实名</Text>
          <Text>人脸</Text>
          <Text>承诺</Text>
        </View>
      </View>

      <View className="content px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">填写实名信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <View>
              <Text className="block text-sm font-medium text-gray-700 mb-2">真实姓名</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  placeholder="请输入真实姓名"
                  value={realName}
                  onInput={(e) => setRealName(e.detail.value)}
                  maxlength={20}
                />
              </View>
            </View>

            <View>
              <Text className="block text-sm font-medium text-gray-700 mb-2">身份证号码</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  type="idcard"
                  placeholder="请输入身份证号码"
                  value={idCard}
                  onInput={(e) => setIdCard(e.detail.value)}
                  maxlength={18}
                />
              </View>
            </View>

            <View className="bg-rose-50 rounded-lg p-3 mt-4">
              <Text className="block text-xs text-rose-600">
                ⚠️ 请确保填写真实有效的身份信息
              </Text>
              <Text className="block text-xs text-rose-600 mt-1">
                平台将严格保护您的隐私安全
              </Text>
            </View>
          </CardContent>
        </Card>

        <View className="mt-6">
          <Button
            className="w-full bg-rose-500 text-white rounded-full py-4 text-lg"
            onClick={handleNext}
            loading={loading}
            disabled={loading}
          >
            下一步
          </Button>
        </View>
      </View>
    </View>
  )
}
