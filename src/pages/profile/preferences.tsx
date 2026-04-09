import { View, Text, Picker, Slider, Button, Checkbox, CheckboxGroup } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './index.css'

export default function PreferencesPage() {
  const [formData, setFormData] = useState({
    ageMin: 22,
    ageMax: 35,
    heightMin: 160,
    heightMax: 180,
    educationIndex: 2,
    incomeIndex: 1,
    maritalStatus: ['single'],
    acceptDistance: 'same_city',
    acceptDivorcedWithChildren: false,
    consumptionView: 'moderate',
    familyView: 'traditional'
  })

  const educationOptions = ['不限', '高中', '大专', '本科', '硕士', '博士']
  const incomeOptions = ['不限', '10万以下', '10-20万', '20-50万', '50-100万', '100万以上']
  const maritalOptions = ['未婚', '离异', '丧偶']

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = async () => {
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
        Taro.navigateTo({ url: '/pages/profile/personality-test' })
      }, 1000)
    } catch (error) {
      console.error('保存失败', error)
    }
  }

  return (
    <View className="profile-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">择偶要求</Text>
        <Text className="block text-sm text-gray-500 mt-1">设置您的择偶标准</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">基本要求</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <View className="range-group">
              <Text className="block text-sm font-medium text-gray-700 mb-3">
                年龄范围：{formData.ageMin} - {formData.ageMax} 岁
              </Text>
              <View className="flex items-center gap-4">
                <Slider
                  className="flex-1"
                  value={formData.ageMin}
                  min={18}
                  max={50}
                  showValue
                  onChange={(e) => handleSliderChange('ageMin', e.detail.value)}
                />
                <Text className="text-xs text-gray-500 w-8">-</Text>
                <Slider
                  className="flex-1"
                  value={formData.ageMax}
                  min={18}
                  max={60}
                  showValue
                  onChange={(e) => handleSliderChange('ageMax', e.detail.value)}
                />
              </View>
            </View>

            <View className="range-group">
              <Text className="block text-sm font-medium text-gray-700 mb-3">
                身高范围：{formData.heightMin} - {formData.heightMax} cm
              </Text>
              <View className="flex items-center gap-4">
                <Slider
                  className="flex-1"
                  value={formData.heightMin}
                  min={150}
                  max={200}
                  showValue
                  onChange={(e) => handleSliderChange('heightMin', e.detail.value)}
                />
                <Text className="text-xs text-gray-500 w-8">-</Text>
                <Slider
                  className="flex-1"
                  value={formData.heightMax}
                  min={150}
                  max={220}
                  showValue
                  onChange={(e) => handleSliderChange('heightMax', e.detail.value)}
                />
              </View>
            </View>

            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">最低学历</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={educationOptions}
                  value={formData.educationIndex}
                  onChange={(e) => setFormData(prev => ({ ...prev, educationIndex: e.detail.value[0] }))}
                >
                  <Text className="w-full">
                    {educationOptions[formData.educationIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">最低收入</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={incomeOptions}
                  value={formData.incomeIndex}
                  onChange={(e) => setFormData(prev => ({ ...prev, incomeIndex: e.detail.value[0] }))}
                >
                  <Text className="w-full">
                    {incomeOptions[formData.incomeIndex]}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="checkbox-group">
              <Text className="block text-sm font-medium text-gray-700 mb-3">接受婚姻状况</Text>
              <CheckboxGroup onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: e.detail.value }))}>
                <View className="flex flex-wrap gap-2">
                  {maritalOptions.map((option, index) => (
                    <View key={index} className="checkbox-item">
                      <Checkbox
                        value={option}
                        checked={formData.maritalStatus.includes(option)}
                        color="#f43f5e"
                      />
                      <Text className="ml-2">{option}</Text>
                    </View>
                  ))}
                </View>
              </CheckboxGroup>
            </View>

            {formData.maritalStatus.includes('离异') && (
              <View className="bg-amber-50 rounded-lg p-3">
                <Text className="block text-xs text-amber-600">
                  接受离异是否接受带小孩：
                </Text>
                <View className="flex gap-4 mt-2">
                  <Button
                    size="mini"
                    className={formData.acceptDivorcedWithChildren ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}
                    onClick={() => setFormData(prev => ({ ...prev, acceptDivorcedWithChildren: true }))}
                  >
                    接受
                  </Button>
                  <Button
                    size="mini"
                    className={!formData.acceptDivorcedWithChildren ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}
                    onClick={() => setFormData(prev => ({ ...prev, acceptDivorcedWithChildren: false }))}
                  >
                    不接受
                  </Button>
                </View>
              </View>
            )}

            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">地域要求</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={['同城', '省内', '全国']}
                  onChange={(e) => {
                    const values = ['same_city', 'same_province', 'anywhere']
                    setFormData(prev => ({ ...prev, acceptDistance: values[e.detail.value] }))
                  }}
                >
                  <Text className="w-full">
                    {formData.acceptDistance === 'same_city' ? '同城' :
                     formData.acceptDistance === 'same_province' ? '省内' : '全国'}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">消费观</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={['节约型', '适中型', '享受型']}
                  onChange={(e) => {
                    const values = ['frugal', 'moderate', 'enjoyable']
                    setFormData(prev => ({ ...prev, consumptionView: values[e.detail.value] }))
                  }}
                >
                  <Text className="w-full">
                    {formData.consumptionView === 'frugal' ? '节约型' :
                     formData.consumptionView === 'moderate' ? '适中型' : '享受型'}
                  </Text>
                </Picker>
              </View>
            </View>

            <View className="picker-group">
              <Text className="block text-sm font-medium text-gray-700 mb-2">家庭观</Text>
              <View className="bg-gray-50 rounded-lg px-4 py-3">
                <Picker
                  mode="selector"
                  range={['传统型', '现代型', '开放型']}
                  onChange={(e) => {
                    const values = ['traditional', 'modern', 'open']
                    setFormData(prev => ({ ...prev, familyView: values[e.detail.value] }))
                  }}
                >
                  <Text className="w-full">
                    {formData.familyView === 'traditional' ? '传统型' :
                     formData.familyView === 'modern' ? '现代型' : '开放型'}
                  </Text>
                </Picker>
              </View>
            </View>
          </CardContent>
        </Card>

        <View className="mt-6 space-y-3">
          <Button
            className="w-full bg-rose-500 text-white rounded-full py-4 text-lg"
            onClick={handleNext}
          >
            下一步
          </Button>

          <Button
            className="w-full bg-white text-gray-600 rounded-full py-3 text-sm border border-gray-300"
            onClick={() => Taro.navigateBack()}
          >
            跳过，稍后填写
          </Button>
        </View>
      </View>
    </View>
  )
}
