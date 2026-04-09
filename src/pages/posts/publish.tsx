import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Video, Plus, X, Camera } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface Circle {
  id: string
  name: string
}

export default function PublishPage() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image')
  const [content, setContent] = useState('')
  const [selectedCircle, setSelectedCircle] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [video, setVideo] = useState<string>('')

  const circles: Circle[] = [
    { id: '1', name: '健身运动' },
    { id: '2', name: '美食探店' },
    { id: '3', name: '旅行户外' },
    { id: '4', name: '读书学习' },
    { id: '5', name: '宠物生活' },
    { id: '6', name: '电影追剧' },
    { id: '7', name: '职场成长' },
    { id: '8', name: '相亲脱单' }
  ]

  const handleChooseImage = () => {
    if (images.length >= 9) {
      Taro.showToast({ title: '最多上传9张图片', icon: 'none' })
      return
    }

    Taro.chooseImage({
      count: 9 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImages([...images, ...res.tempFilePaths])
      }
    })
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleChooseVideo = () => {
    Taro.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: 'back',
      success: (res) => {
        setVideo(res.tempFilePath)
      }
    })
  }

  const handlePublish = async () => {
    if (!selectedCircle) {
      Taro.showToast({ title: '请选择圈子', icon: 'none' })
      return
    }

    if (activeTab === 'image' && images.length === 0) {
      Taro.showToast({ title: '请上传图片', icon: 'none' })
      return
    }

    if (activeTab === 'video' && !video) {
      Taro.showToast({ title: '请上传视频', icon: 'none' })
      return
    }

    try {
      await Network.request({
        url: '/api/posts/publish',
        method: 'POST',
        data: {
          type: activeTab,
          content,
          circleId: selectedCircle,
          media: activeTab === 'image' ? images : [video]
        }
      })

      Taro.showToast({ title: '发布成功，等待审核', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    } catch (error) {
      console.error('发布失败', error)
      Taro.showToast({ title: '发布失败', icon: 'none' })
    }
  }

  return (
    <View className="publish-page h-full bg-[#FAFAFA] flex flex-col">
      <View className="header bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <Text className="text-base text-gray-600" onClick={() => Taro.navigateBack()}>取消</Text>
        <Text className="text-lg font-bold">发布动态</Text>
        <Button
          className="bg-[#FF6B8B] text-white px-4 py-2 rounded-lg"
          onClick={handlePublish}
        >
          发布
        </Button>
      </View>

      <View className="content flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'image' | 'video')}>
          <TabsList className="w-full grid grid-cols-2 bg-gray-200 p-1 rounded-xl mx-4 mt-4">
            <TabsTrigger value="image" className="data-[state=active]:bg-white data-[state=active]:shadow">
              图文
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-white data-[state=active]:shadow">
              短视频
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="mt-4 px-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                <View className="upload-grid grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <View key={index} className="relative">
                      <Image
                        src={img}
                        mode="aspectFill"
                        className="w-full h-24 rounded-lg"
                      />
                      <View
                        className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X size={14} color="#ffffff" />
                      </View>
                    </View>
                  ))}
                  {images.length < 9 && (
                    <View
                      className="upload-btn w-full h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center"
                      onClick={handleChooseImage}
                    >
                      <Plus size={24} color="#999999" />
                      <Text className="text-xs text-gray-500 mt-1">添加图片</Text>
                    </View>
                  )}
                </View>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardContent className="p-4">
                <Textarea
                  style={{ width: '100%', minHeight: '120px' }}
                  placeholder="分享你的生活..."
                  value={content}
                  onInput={(e) => setContent(e.detail.value)}
                  maxlength={500}
                />
                <Text className="text-xs text-gray-500 text-right mt-1">{content.length}/500</Text>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="mt-4 px-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                {video ? (
                  <View className="video-preview relative">
                    <Image
                      src={video + '?vframe/jpg/offset/1'}
                      mode="aspectFill"
                      className="w-full h-48 rounded-lg"
                    />
                    <View
                      className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                      onClick={() => setVideo('')}
                    >
                      <X size={14} color="#ffffff" />
                    </View>
                    <View className="absolute bottom-1 left-1 bg-black bg-opacity-50 px-2 py-1 rounded">
                      <Video size={12} color="#ffffff" />
                      <Text className="text-xs text-white ml-1">10秒</Text>
                    </View>
                  </View>
                ) : (
                  <View
                    className="upload-video w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center"
                    onClick={handleChooseVideo}
                  >
                    <Camera size={32} color="#999999" />
                    <Text className="text-sm text-gray-500 mt-2">拍摄/上传视频</Text>
                    <Text className="text-xs text-gray-400 mt-1">限10秒，需本人出镜</Text>
                  </View>
                )}
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardContent className="p-4">
                <Textarea
                  style={{ width: '100%', minHeight: '80px' }}
                  placeholder="添加描述..."
                  value={content}
                  onInput={(e) => setContent(e.detail.value)}
                  maxlength={200}
                />
                <Text className="text-xs text-gray-500 text-right mt-1">{content.length}/200</Text>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <View className="px-4 mb-4">
          <Card>
            <CardContent className="p-4">
              <Text className="block text-sm font-semibold mb-3">选择圈子（必选）</Text>
              <View className="circles-list flex flex-wrap gap-2">
                {circles.map(circle => (
                  <Badge
                    key={circle.id}
                    className={`px-3 py-2 cursor-pointer ${
                      selectedCircle === circle.id
                        ? 'bg-[#FF6B8B] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedCircle(circle.id)}
                  >
                    {circle.name}
                  </Badge>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        <View className="px-4 pb-6">
          <Card className="bg-[#FFF0F5]">
            <CardContent className="p-4">
              <Text className="text-xs text-[#FF6B8B]">
                💡 发布须知：内容需经过AI审核，请确保内容健康向上，禁止发布违规信息
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  )
}
