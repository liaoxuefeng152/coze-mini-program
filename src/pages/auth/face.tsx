import { View, Text, Button, Camera } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { useState } from 'react'
import { Camera as CameraIcon, CircleAlert } from 'lucide-react-taro'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './index.css'

export default function FaceAuthPage() {
  const [recorderManager, setRecorderManager] = useState<Taro.RecorderManager | null>(null)
  const [recording, setRecording] = useState(false)
  const [failCount, setFailCount] = useState(0)
  const [locked, setLocked] = useState(false)
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null)
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

  useReady(() => {
    // 检查是否被锁定
    const lockedTime = Taro.getStorageSync('faceAuthLockedUntil')
    if (lockedTime && new Date(lockedTime) > new Date()) {
      setLocked(true)
      setLockedUntil(new Date(lockedTime))
    }

    if (isWeapp) {
      const manager = Taro.getRecorderManager()

      manager.onStart(() => {
        console.log('录音开始')
        setRecording(true)
      })

      manager.onStop((res) => {
        console.log('录音结束', res.tempFilePath)
        setRecording(false)
        // TODO: 上传录音进行人脸核验
      })

      manager.onError((err) => {
        console.error('录音错误', err)
        setRecording(false)
        Taro.showToast({ title: '录音失败', icon: 'none' })
      })

      setRecorderManager(manager)
    }
  })

  const handleStartRecord = () => {
    if (!isWeapp) {
      Taro.showToast({ title: 'H5端暂不支持人脸核验', icon: 'none' })
      return
    }

    if (locked) {
      Taro.showToast({ title: '人脸核验已锁定', icon: 'none' })
      return
    }

    recorderManager?.start({
      format: 'wav',
      sampleRate: 16000,
      numberOfChannels: 1
    })
  }

  const handleStopRecord = () => {
    recorderManager?.stop()
  }

  const handleVerify = () => {
    // 模拟人脸核验
    const success = Math.random() > 0.3

    if (success) {
      Taro.showToast({
        title: '核验成功',
        icon: 'success'
      })
      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/auth/marriage' })
      }, 1000)
    } else {
      const newCount = failCount + 1
      setFailCount(newCount)

      if (newCount >= 3) {
        // 锁定24小时
        const lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000)
        Taro.setStorageSync('faceAuthLockedUntil', lockUntil.toISOString())
        setLocked(true)
        setLockedUntil(lockUntil)

        Taro.showModal({
          title: '提示',
          content: '人脸核验已临时锁定24小时，可以上传手持身份证走人工审核。',
          showCancel: false,
          success: () => {
            Taro.navigateTo({ url: '/pages/auth/manual' })
          }
        })
      } else {
        Taro.showToast({
          title: `核验失败，还剩${3 - newCount}次机会`,
          icon: 'none'
        })
      }
    }
  }

  const handleManualReview = () => {
    Taro.navigateTo({ url: '/pages/auth/manual' })
  }

  if (!isWeapp) {
    return (
      <View className="auth-page h-full bg-gray-50 flex items-center justify-center">
        <View className="text-center px-8">
          <CameraIcon size={64} color="#9ca3af" />
          <Text className="block text-lg font-semibold mt-4 text-gray-600">人脸核验功能仅在小程序中可用</Text>
          <Text className="block text-sm text-gray-500 mt-2">请在微信小程序中打开体验完整功能</Text>
        </View>
      </View>
    )
  }

  if (locked && lockedUntil) {
    const hours = Math.ceil((lockedUntil.getTime() - Date.now()) / (1000 * 60 * 60))

    return (
      <View className="auth-page h-full bg-gray-50 flex items-center justify-center">
        <View className="text-center px-8">
          <CircleAlert size={64} color="#f43f5e" />
          <Text className="block text-xl font-bold mt-4 text-gray-900">人脸核验已锁定</Text>
          <Text className="block text-sm text-gray-500 mt-2">
            为安全，人脸验证已临时锁定，还剩 {hours} 小时
          </Text>
          <Button
            className="mt-6 bg-rose-500 text-white rounded-full px-8"
            onClick={handleManualReview}
          >
            申请人工审核
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View className="auth-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <Text className="block text-2xl font-bold text-gray-900">人脸核验</Text>
        <Text className="block text-sm text-gray-500 mt-1">完成人脸核验，确保身份真实</Text>
      </View>

      <View className="step-indicator flex items-center justify-center py-4">
        <View className="flex items-center gap-2">
          <View className="step-circle flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-sm font-semibold">
            ✓
          </View>
          <View className="step-line w-12 h-0.5 bg-rose-500"></View>
          <View className="step-circle active flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-sm font-semibold">
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
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">请完成人脸动作</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="camera-preview mb-4">
              <Camera className="w-full h-64" devicePosition="front" />
            </View>

            <View className="action-instructions mb-4">
              <Text className="block text-sm text-gray-600 text-center">
                请按照提示完成动作：
              </Text>
              <Text className="block text-base font-semibold text-rose-500 text-center mt-2">
                张嘴 / 摇头 / 眨眼
              </Text>
            </View>

            <View className="flex gap-3">
              <Button
                className="flex-1 bg-rose-500 text-white rounded-full py-3"
                onClick={handleStartRecord}
                disabled={recording}
              >
                {recording ? '录制中...' : '开始录制'}
              </Button>
              <Button
                className="flex-1 bg-gray-500 text-white rounded-full py-3"
                onClick={handleStopRecord}
                disabled={!recording}
              >
                停止录制
              </Button>
            </View>
          </CardContent>
        </Card>

        <View className="fail-info mb-4">
          <View className="bg-amber-50 rounded-lg p-3">
            <Text className="block text-xs text-amber-600">
              已失败 {failCount}/3 次，还剩 {3 - failCount} 次机会
            </Text>
          </View>
        </View>

        <View className="mt-6 space-y-3">
          <Button
            className="w-full bg-rose-500 text-white rounded-full py-4 text-lg"
            onClick={handleVerify}
          >
            确认核验
          </Button>

          <Button
            className="w-full bg-white text-gray-600 rounded-full py-3 text-sm border border-gray-300"
            onClick={handleManualReview}
          >
            申请人工审核
          </Button>
        </View>
      </View>
    </View>
  )
}
