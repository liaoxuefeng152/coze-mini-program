/* eslint-disable no-restricted-syntax */
import { View, Text, Input, Picker, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './index.css'

export default function BasicInfoPage() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    educationIndex: 0,
    occupation: '',
    incomeIndex: 0,
    city: '',
    hometown: '',
    smokingIndex: 0,
    drinkingIndex: 0,
   作息类型Index: 0
  })

  const educationOptions = ['高中', '大专', '本科', '硕士', '博士']
  const incomeOptions = ['10万以下', '10-20万', '20-50万', '50-100万', '100万以上']
  const smokingOptions = ['不吸烟', '偶尔', '经常']
  const drinkingOptions = ['不饮酒', '偶尔', '经常']
  const 作息类型Options = ['早起型', '夜猫子', '灵活型']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePickerChange = (field, e) => {
    setFormData(prev => ({ ...prev, [field]: e.detail.value }))
  }

  const handleNext = async () => {
    // 验证必填项
    if (!formData.age) {
      Taro.showToast({ title: '请填写年龄', icon: 'none' })
      return
    }
    if (!formData.height) {
      Taro.showToast({ title: '请填写身高', icon: 'none' })
      return
    }
    if (!formData.city) {
      Taro.showToast({ title: '请填写现居城市', icon: 'none' })
      return
    }

    try {
      // TODO: 调用后端保存基础信息
      console.log('基础信息', formData)

      Taro.showToast({
        title: '保存成功',
        icon: 'success'
      })

      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/profile/preferences' })
      }, 1000)
    } catch (error) {
      console.error('保存失败', error)
    }
  }

  return (
    <View className="profile-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">完善资料</Text>
        <Text className="block text-sm text-gray-500 mt-1">填写基础信息，让AI更懂你</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">性别</Text>
              <View className="flex gap-2">
                <Button
                  className={`flex-1 py-2 ${
                    formData.gender === 'male'
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => handleInputChange('gender', 'male')}
                >
                  男
                </Button>
                <Button
                  className={`flex-1 py-2 ${
                    formData.gender === 'female'
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => handleInputChange('gender', 'female')}
                >
                  女
                </Button>
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">年龄</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  type="number"
                  placeholder="请输入年龄"
                  value={formData.age}
                  onInput={(e) => handleInputChange('age', e.detail.value)}
                />
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">身高（cm）</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  type="number"
                  placeholder="请输入身高"
                  value={formData.height}
                  onInput={(e) => handleInputChange('height', e.detail.value)}
                />
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">体重（kg）</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  type="number"
                  placeholder="请输入体重"
                  value={formData.weight}
                  onInput={(e) => handleInputChange('weight', e.detail.value)}
                />
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">学历</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={educationOptions}
                  value={formData.educationIndex}
                  onChange={(e) => handlePickerChange('educationIndex', e)}
                >
                  <Text className="w-full">
                    {educationOptions[formData.educationIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">职业</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  placeholder="请输入职业"
                  value={formData.occupation}
                  onInput={(e) => handleInputChange('occupation', e.detail.value)}
                />
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">年收入</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={incomeOptions}
                  value={formData.incomeIndex}
                  onChange={(e) => handlePickerChange('incomeIndex', e)}
                >
                  <Text className="w-full">
                    {incomeOptions[formData.incomeIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">现居城市</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  placeholder="如：北京市朝阳区"
                  value={formData.city}
                  onInput={(e) => handleInputChange('city', e.detail.value)}
                />
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">籍贯</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Input
                  className="w-full bg-transparent"
                  placeholder="如：山东济南"
                  value={formData.hometown}
                  onInput={(e) => handleInputChange('hometown', e.detail.value)}
                />
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">吸烟</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={smokingOptions}
                  value={formData.smokingIndex}
                  onChange={(e) => handlePickerChange('smokingIndex', e)}
                >
                  <Text className="w-full">
                    {smokingOptions[formData.smokingIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">饮酒</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={drinkingOptions}
                  value={formData.drinkingIndex}
                  onChange={(e) => handlePickerChange('drinkingIndex', e)}
                >
                  <Text className="w-full">
                    {drinkingOptions[formData.drinkingIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="form-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">作息类型</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={作息类型Options}
                  value={formData.作息类型Index}
                  onChange={(e) => handlePickerChange('作息类型Index', e)}
                >
                  <Text className="w-full">
                    {作息类型Options[formData.作息类型Index]}
                  </Text>
                </Picker>
              </View>
            </View>
          </CardContent>
        </Card>

        <View className="mt-6">
          <Button
            className="w-full bg-rose-500 text-white rounded-full py-4 text-lg"
            onClick={handleNext}
          >
            下一步
          </Button>
        </View>
      </View>
    </View>
  )
}
