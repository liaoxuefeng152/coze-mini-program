import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { ArrowLeft, Camera, X } from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import './edit.css'

export default function ProfileEditPage() {
  const [nickname] = useState('小可爱')
  const [bio, setBio] = useState('爱生活，爱运动，期待遇到对的人。')
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop'
  ])

  const handleChoosePhoto = () => {
    if (photos.length >= 9) {
      Taro.showToast({ title: '最多上传9张照片', icon: 'none' })
      return
    }

    Taro.chooseImage({
      count: 9 - photos.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setPhotos([...photos, ...res.tempFilePaths])
      }
    })
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    setPhotos(newPhotos)
  }

  const handleSave = () => {
    if (!nickname.trim()) {
      Taro.showToast({ title: '请输入昵称', icon: 'none' })
      return
    }
    Taro.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const handleEditBasicInfo = () => {
    Taro.navigateTo({ url: '/pages/auth/basic' })
  }

  const handlePersonalityTest = () => {
    Taro.showToast({ title: '功能开发中', icon: 'none' })
  }

  const handlePreferences = () => {
    Taro.showToast({ title: '功能开发中', icon: 'none' })
  }

  return (
    <View className="profile-edit-page h-full bg-[#FAFAFA] flex flex-col">
      <View className="header bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex items-center justify-between">
          <View className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => Taro.navigateBack()}
            >
              <ArrowLeft size={20} color="#333333" />
            </Button>
            <Text className="text-lg font-semibold">编辑资料</Text>
          </View>
          <Button
            className="bg-[#FF6B8B] text-white px-6 py-2 rounded-full"
            onClick={handleSave}
          >
            <Text>保存</Text>
          </Button>
        </View>
      </View>

      <View className="content flex-1 overflow-y-auto px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">头像</Text>
            <View className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={photos[0]} />
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                onClick={handleChoosePhoto}
              >
                <Camera size={16} color="#FF6B8B" />
                <Text className="ml-1">更换头像</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">昵称</Text>
            <View className="input-wrapper bg-gray-50 rounded-xl px-4 py-3">
              <Text className="text-sm text-gray-800">{nickname}</Text>
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-base font-semibold mb-3">个人简介</Text>
            <View className="bg-gray-50 rounded-xl p-3">
              <Textarea
                style={{ width: '100%', minHeight: '120px', backgroundColor: 'transparent', boxSizing: 'border-box' }}
                placeholder="介绍一下自己吧..."
                value={bio}
                onInput={(e) => setBio(e.detail.value)}
                maxlength={200}
              />
            </View>
            <Text className="text-xs text-gray-500 text-right mt-1">{bio.length}/200</Text>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <View className="flex items-center justify-between mb-3">
              <Text className="text-base font-semibold">相册</Text>
              <Text className="text-xs text-gray-500">{photos.length}/9</Text>
            </View>
            <View className="photos-grid grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <View key={index} className="photo-item relative">
                  <Image
                    src={photo}
                    mode="aspectFill"
                    className="w-full h-24 rounded-lg"
                  />
                  {index > 0 && (
                    <View
                      className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <X size={14} color="#ffffff" />
                    </View>
                  )}
                  {index === 0 && (
                    <View className="absolute bottom-1 left-1 bg-[#FF6B8B] px-2 py-1 rounded">
                      <Text className="text-xs text-white">头像</Text>
                    </View>
                  )}
                </View>
              ))}
              {photos.length < 9 && (
                <View
                  className="upload-btn w-full h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center"
                  onClick={handleChoosePhoto}
                >
                  <Camera size={24} color="#999999" />
                  <Text className="text-xs text-gray-500 mt-1">添加照片</Text>
                </View>
              )}
            </View>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <View
              className="menu-item flex items-center justify-between py-3 cursor-pointer"
              onClick={handleEditBasicInfo}
            >
              <Text className="text-base">编辑基础信息</Text>
              <Text className="text-sm text-gray-400">{`>`}</Text>
            </View>
            <View
              className="menu-item flex items-center justify-between py-3 cursor-pointer"
              onClick={handlePersonalityTest}
            >
              <Text className="text-base">性格测试</Text>
              <Text className="text-sm text-gray-400">{`>`}</Text>
            </View>
            <View
              className="menu-item flex items-center justify-between py-3 cursor-pointer"
              onClick={handlePreferences}
            >
              <Text className="text-base">择偶偏好</Text>
              <Text className="text-sm text-gray-400">{`>`}</Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  )
}
