/* eslint-disable no-restricted-syntax */
import { View, Text, Radio, RadioGroup, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleAlert, CircleCheck } from 'lucide-react-taro'
import './index.css'

export default function MarriageAuthPage() {
  const [maritalStatus, setMaritalStatus] = useState('single')
  const [loading, setLoading] = useState(false)

  const handleRadioChange = (e) => {
    setMaritalStatus(e.detail.value)
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // TODO: 调用后端保存婚姻状态
      console.log('婚姻状态', maritalStatus)

      if (maritalStatus === 'divorced') {
        Taro.showModal({
          title: '提示',
          content: '离异用户可能需要上传离婚证进行随机抽检，是否继续？',
          success: (res) => {
            if (res.confirm) {
              completeAuth()
            } else {
              setLoading(false)
            }
          }
        })
      } else {
        completeAuth()
      }
    } catch (error) {
      console.error('提交失败', error)
      setLoading(false)
    }
  }

  const completeAuth = () => {
    Taro.showToast({
      title: '基础认证完成',
      icon: 'success'
    })

    setTimeout(() => {
      // 跳转到个人资料页面
      Taro.redirectTo({ url: '/pages/profile/basic-info' })
    }, 1500)
  }

  return (
    <View className="auth-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">婚姻状态承诺</Text>
        <Text className="block text-sm text-gray-500 mt-1">请如实填写您的婚姻状况</Text>
      </View>

      <View className="step-indicator flex items-center justify-center py-4">
        <View className="flex items-center gap-2">
          <View className="step-circle flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-sm font-semibold">
            ✓
          </View>
          <View className="step-line w-12 h-1 bg-rose-500"></View>
          <View className="step-circle flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-sm font-semibold">
            ✓
          </View>
          <View className="step-line w-12 h-1 bg-rose-500"></View>
          <View className="step-circle active flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-sm font-semibold">
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
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">选择您的婚姻状况</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onChange={handleRadioChange}>
              <View className="radio-option flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-3">
                <Radio value="single" checked={maritalStatus === 'single'} color="#f43f5e" />
                <View className="flex-1">
                  <Text className="block font-medium">未婚</Text>
                  <Text className="block text-xs text-gray-500 mt-1">从未结过婚</Text>
                </View>
                <CircleCheck size={20} color={maritalStatus === 'single' ? '#f43f5e' : '#d1d5db'} />
              </View>

              <View className="radio-option flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-3">
                <Radio value="divorced" checked={maritalStatus === 'divorced'} color="#f43f5e" />
                <View className="flex-1">
                  <Text className="block font-medium">离异</Text>
                  <Text className="block text-xs text-gray-500 mt-1">已离婚，恢复单身</Text>
                </View>
                {maritalStatus === 'divorced' && <CircleCheck size={20} color="#f43f5e" />}
              </View>

              <View className="radio-option flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Radio value="widowed" checked={maritalStatus === 'widowed'} color="#f43f5e" />
                <View className="flex-1">
                  <Text className="block font-medium">丧偶</Text>
                  <Text className="block text-xs text-gray-500 mt-1">配偶已去世</Text>
                </View>
                {maritalStatus === 'widowed' && <CircleCheck size={20} color="#f43f5e" />}
              </View>
            </RadioGroup>

            {maritalStatus === 'divorced' && (
              <View className="bg-amber-50 rounded-lg p-3 mt-4 flex gap-2">
                <CircleAlert size={16} color="#f59e0b" />
                <Text className="text-xs text-amber-600">
                  系统将随机抽检离婚证，请确保婚姻状况真实
                </Text>
              </View>
            )}
          </CardContent>
        </Card>

        <View className="agreement-card mb-4">
          <View className="bg-rose-50 rounded-lg p-4">
            <Text className="block text-sm font-semibold text-rose-700 mb-2">
              ⚠️ 重要提示
            </Text>
            <Text className="block text-xs text-rose-600 mb-2">
              1. 请如实填写婚姻状况，虚假信息将导致认证失败
            </Text>
            <Text className="block text-xs text-rose-600 mb-2">
              2. 离异用户需配合随机抽检，上传离婚证
            </Text>
            <Text className="block text-xs text-rose-600">
              3. 婚姻状况造假将永久封禁账号
            </Text>
          </View>
        </View>

        <View className="mt-6">
          <Button
            className="w-full bg-rose-500 text-white rounded-full py-4 text-lg"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            提交并继续
          </Button>
        </View>
      </View>
    </View>
  )
}
