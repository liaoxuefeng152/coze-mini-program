import { View, Text, Button, Image, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, CircleCheck } from 'lucide-react-taro'
import './index.css'

export default function ManualAuthPage() {
  const [handIdCardUrl, setHandIdCardUrl] = useState('')
  const [remark, setRemark] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        setHandIdCardUrl(tempFilePath)
        // TODO: 上传到对象存储
      }
    })
  }

  const handleSubmit = async () => {
    if (!handIdCardUrl) {
      Taro.showToast({
        title: '请上传手持身份证照片',
        icon: 'none'
      })
      return
    }

    setLoading(true)

    try {
      // TODO: 调用后端提交人工审核
      console.log('人工审核', { handIdCardUrl, remark })

      Taro.showToast({
        title: '提交成功',
        icon: 'success'
      })

      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    } catch (error) {
      console.error('提交失败', error)
      setLoading(false)
    }
  }

  return (
    <View className="auth-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">人工审核</Text>
        <Text className="block text-sm text-gray-500 mt-1">上传手持身份证照片，等待人工审核</Text>
      </View>

      <View className="content px-4 py-6">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">上传手持身份证照片</CardTitle>
          </CardHeader>
          <CardContent>
            <View
              className="upload-area border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50"
              onClick={handleChooseImage}
            >
              {handIdCardUrl ? (
                <View className="preview-container relative">
                  <Image
                    src={handIdCardUrl}
                    mode="aspectFill"
                    className="w-full h-48 rounded-lg"
                  />
                  <View className="success-badge absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <CircleCheck size={20} color="#ffffff" />
                  </View>
                </View>
              ) : (
                <View className="upload-placeholder text-center">
                  <Upload size={48} color="#9ca3af" />
                  <Text className="block text-sm text-gray-500 mt-3">点击上传照片</Text>
                  <Text className="block text-xs text-gray-400 mt-1">支持 JPG、PNG 格式</Text>
                </View>
              )}
            </View>

            <View className="requirements mt-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">
                拍摄要求：
              </Text>
              <View className="requirement-item flex items-start gap-2 mb-2">
                <Text className="text-xs text-gray-600">•</Text>
                <Text className="text-xs text-gray-600 flex-1">
                  本人手持身份证，正面朝向镜头
                </Text>
              </View>
              <View className="requirement-item flex items-start gap-2 mb-2">
                <Text className="text-xs text-gray-600">•</Text>
                <Text className="text-xs text-gray-600 flex-1">
                  身份证信息清晰可见，无遮挡
                </Text>
              </View>
              <View className="requirement-item flex items-start gap-2">
                <Text className="text-xs text-gray-600">•</Text>
                <Text className="text-xs text-gray-600 flex-1">
                  光线充足，避免反光
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">备注说明（可选）</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="bg-gray-50 rounded-lg p-4">
              <Textarea
                className="w-full bg-transparent"
                placeholder="请输入备注信息..."
                value={remark}
                onInput={(e) => setRemark(e.detail.value)}
                maxlength={200}
              />
              <Text className="block text-xs text-gray-400 text-right mt-1">
                {remark.length}/200
              </Text>
            </View>
          </CardContent>
        </Card>

        <View className="info-card mb-4">
          <View className="bg-blue-50 rounded-lg p-4 flex gap-2">
            <FileText size={20} color="#3b82f6" />
            <View className="flex-1">
              <Text className="block text-sm font-semibold text-blue-700 mb-1">
                审核说明
              </Text>
              <Text className="block text-xs text-blue-600">
                提交后 1 小时内完成审核，结果将通过系统通知
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Button
            className="w-full bg-rose-500 text-white rounded-full py-4 text-lg"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !handIdCardUrl}
          >
            提交审核
          </Button>
        </View>
      </View>
    </View>
  )
}
