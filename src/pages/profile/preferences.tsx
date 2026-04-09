/* eslint-disable no-restricted-syntax */
import { View, Text, Picker, Slider } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import './index.css'

export default function PreferencesPage() {
  const [formData, setFormData] = useState({
    ageMin: 22,
    ageMax: 35,
    heightMin: 160,
    heightMax: 180,
    educationIndex: 2,
    incomeIndex: 1,
    maritalStatus: ['未婚'],
    acceptDistanceIndex: 0,
    acceptChildren: false
  })

  const educationOptions = ['不限', '高中', '大专', '本科', '硕士', '博士']
  const incomeOptions = ['不限', '10万以下', '10-20万', '20-50万', '50-100万', '100万以上']
  const maritalOptions = ['未婚', '离异', '丧偶']
  const distanceOptions = ['同城', '省内', '全国']

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    // 验证
    if (formData.ageMin > formData.ageMax) {
      Taro.showToast({ title: '年龄范围无效', icon: 'none' })
      return
    }

    try {
      // TODO: 调用后端保存择偶要求
      console.log('择偶要求', formData)

      Taro.showToast({
        title: '保存成功',
        icon: 'success'
      })

      setTimeout(() => {
        Taro.navigateBack()
      }, 1000)
    } catch (error) {
      console.error('保存失败', error)
    }
  }

  return (
    <View className="profile-page h-full bg-[#FAFAFA]">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">择偶要求</Text>
        <Text className="block text-sm text-gray-500 mt-1">设置您的择偶标准</Text>
      </View>

      <View className="content flex-1 overflow-y-auto px-4 py-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">基本要求</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 年龄范围 */}
            <View className="range-group">
              <Text className="block text-sm font-medium text-gray-700 mb-3">
                年龄范围：{formData.ageMin} - {formData.ageMax} 岁
              </Text>
              <View className="flex items-center gap-4">
                <View style={{ flex: 1 }}>
                  <Slider
                    value={formData.ageMin}
                    min={18}
                    max={50}
                    showValue
                    backgroundColor="#E5E5E5"
                    activeColor="#FF6B8B"
                    onChange={(e) => handleSliderChange('ageMin', e.detail.value)}
                  />
                </View>
                <Text className="text-xs text-gray-500">-</Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={formData.ageMax}
                    min={18}
                    max={60}
                    showValue
                    backgroundColor="#E5E5E5"
                    activeColor="#FF6B8B"
                    onChange={(e) => handleSliderChange('ageMax', e.detail.value)}
                  />
                </View>
              </View>
            </View>

            {/* 身高范围 */}
            <View className="range-group">
              <Text className="block text-sm font-medium text-gray-700 mb-3">
                身高范围：{formData.heightMin} - {formData.heightMax} cm
              </Text>
              <View className="flex items-center gap-4">
                <View style={{ flex: 1 }}>
                  <Slider
                    value={formData.heightMin}
                    min={150}
                    max={200}
                    showValue
                    backgroundColor="#E5E5E5"
                    activeColor="#FF6B8B"
                    onChange={(e) => handleSliderChange('heightMin', e.detail.value)}
                  />
                </View>
                <Text className="text-xs text-gray-500">-</Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={formData.heightMax}
                    min={150}
                    max={220}
                    showValue
                    backgroundColor="#E5E5E5"
                    activeColor="#FF6B8B"
                    onChange={(e) => handleSliderChange('heightMax', e.detail.value)}
                  />
                </View>
              </View>
            </View>

            {/* 学历 */}
            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">最低学历</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={educationOptions}
                  value={formData.educationIndex}
                  onChange={(e) => setFormData(prev => ({ ...prev, educationIndex: e.detail.value as number }))}
                >
                  <Text className="w-full text-gray-800">
                    {educationOptions[formData.educationIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            {/* 收入 */}
            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">最低收入</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={incomeOptions}
                  value={formData.incomeIndex}
                  onChange={(e) => setFormData(prev => ({ ...prev, incomeIndex: e.detail.value as number }))}
                >
                  <Text className="w-full text-gray-800">
                    {incomeOptions[formData.incomeIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            {/* 婚姻状况 */}
            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">接受婚姻状况</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={maritalOptions}
                  value={maritalOptions.indexOf(formData.maritalStatus[0])}
                  onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: [maritalOptions[e.detail.value as number]] }))}
                >
                  <Text className="w-full text-gray-800">
                    {formData.maritalStatus[0]}
                  </Text>
                </Picker>
              </View>
            </View>

            {/* 是否接受异地 */}
            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">地域要求</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={distanceOptions}
                  value={formData.acceptDistanceIndex}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptDistanceIndex: e.detail.value as number }))}
                >
                  <Text className="w-full text-gray-800">
                    {distanceOptions[formData.acceptDistanceIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            {/* 是否接受带小孩 */}
            {formData.maritalStatus.includes('离异') && (
              <View className="bg-amber-50 rounded-lg p-3">
                <Text className="block text-sm text-amber-700 mb-2">
                  接受离异是否接受带小孩？
                </Text>
                <View className="flex gap-3">
                  <Button
                    className={`flex-1 ${formData.acceptChildren ? 'bg-[#FF6B8B] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                    onClick={() => setFormData(prev => ({ ...prev, acceptChildren: true }))}
                  >
                    接受
                  </Button>
                  <Button
                    className={`flex-1 ${!formData.acceptChildren ? 'bg-[#FF6B8B] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                    onClick={() => setFormData(prev => ({ ...prev, acceptChildren: false }))}
                  >
                    不接受
                  </Button>
                </View>
              </View>
            )}
          </CardContent>
        </Card>

        <View className="mt-6 pb-6">
          <Button
            className="w-full bg-[#FF6B8B] text-white rounded-full py-4 text-lg"
            onClick={handleSave}
          >
            保存
          </Button>
        </View>
      </View>
    </View>
  )
}
