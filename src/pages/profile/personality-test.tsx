import { View, Text, Button, Progress } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, ChevronLeft, ChevronRight } from 'lucide-react-taro'
import './index.css'

const questions = [
  {
    id: 1,
    question: '当你第一次见到陌生人时，你会？',
    options: ['主动打招呼', '等待对方先开口', '观察后再决定', '保持沉默']
  },
  {
    id: 2,
    question: '周末你更喜欢做什么？',
    options: ['宅在家里', '外出社交', '独自运动', '学习充电']
  },
  {
    id: 3,
    question: '面对压力时，你通常会？',
    options: ['独自承受', '寻求朋友帮助', '制定计划解决', '转移注意力']
  },
  {
    id: 4,
    question: '你更喜欢哪种沟通方式？',
    options: ['面对面', '电话', '文字消息', '视频通话']
  },
  {
    id: 5,
    question: '在团队中，你通常是？',
    options: ['领导者', '追随者', '协调者', '创新者']
  },
  {
    id: 6,
    question: '做决定时，你更倾向于？',
    options: ['理性分析', '直觉判断', '询问他人', '拖延最后']
  },
  {
    id: 7,
    question: '你对待时间的方式是？',
    options: ['严格计划', '灵活应对', '习惯拖延', '随性而为']
  },
  {
    id: 8,
    question: '遇到冲突时，你会？',
    options: ['直接面对', '回避冲突', '寻求调解', '委婉表达']
  },
  {
    id: 9,
    question: '你更看重？',
    options: ['个人成就', '家庭幸福', '社交关系', '内心平静']
  },
  {
    id: 10,
    question: '面对新事物，你会？',
    options: ['积极尝试', '谨慎观察', '拒绝改变', '被动接受']
  },
  {
    id: 11,
    question: '你的消费观念是？',
    options: ['精打细算', '适度消费', '及时行乐', '投资未来']
  },
  {
    id: 12,
    question: '在恋爱中，你最看重？',
    options: ['外貌', '性格', '经济条件', '共同兴趣']
  },
  {
    id: 13,
    question: '你希望恋人的性格是？',
    options: ['温柔体贴', '独立自主', '幽默风趣', '稳重踏实']
  },
  {
    id: 14,
    question: '对于婚姻，你的态度是？',
    options: ['必须结婚', '顺其自然', '不排斥但非必需', '恐婚']
  },
  {
    id: 15,
    question: '你理想的生活方式是？',
    options: ['安稳平淡', '充满挑战', '平衡兼顾', '自由自在']
  }
]

export default function PersonalityTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) {
      Taro.showToast({ title: '请选择一个选项', icon: 'none' })
      return
    }

    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      submitTest(newAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedOption(null)
    }
  }

  const submitTest = async (finalAnswers: number[]) => {
    setLoading(true)

    try {
      // TODO: 调用后端保存性格测试结果并生成AI画像
      console.log('性格测试答案', finalAnswers)

      // 模拟AI分析结果
      const personalityTypes = ['浪漫型', '稳重型', '活泼型', '理性型', '温柔型', '独立型']
      const randomType = personalityTypes[Math.floor(Math.random() * personalityTypes.length)]

      Taro.showModal({
        title: '测试完成',
        content: `根据分析，您的性格类型是「${randomType}」`,
        showCancel: false,
        success: () => {
          Taro.redirectTo({ url: '/pages/index/index' })
        }
      })
    } catch (error) {
      console.error('提交失败', error)
      setLoading(false)
    }
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <View className="test-page h-full bg-gray-50">
      <View className="header bg-white px-4 py-6 border-b border-gray-100">
        <View className="flex items-center gap-3 mb-3">
          <Brain size={28} color="#f43f5e" />
          <View>
            <Text className="block text-2xl font-bold text-gray-900">性格测试</Text>
            <Text className="block text-sm text-gray-500">15道题，帮助AI更懂你</Text>
          </View>
        </View>
        <View className="progress-container">
          <Progress
            percent={progress}
            strokeWidth={8}
            activeColor="#f43f5e"
            backgroundColor="#fce7f3"
            borderRadius={4}
          />
          <Text className="block text-xs text-gray-500 text-center mt-2">
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
        </View>
      </View>

      <View className="content px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Q{currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View className="options-list space-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <View
                  key={index}
                  className={`option-item p-4 rounded-lg border-2 ${
                    selectedOption === index
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <Text className={`${
                    selectedOption === index ? 'text-rose-600 font-medium' : 'text-gray-700'
                  }`}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        <View className="action-buttons mt-6 flex gap-3">
          <Button
            className="flex-1 bg-gray-200 text-gray-700 rounded-full py-3"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <View className="flex items-center justify-center gap-2">
              <ChevronLeft size={18} color="#374151" />
              <Text>上一题</Text>
            </View>
          </Button>

          <Button
            className="flex-1 bg-rose-500 text-white rounded-full py-3"
            onClick={handleNext}
            loading={loading}
            disabled={loading}
          >
            <View className="flex items-center justify-center gap-2">
              <Text>{currentQuestionIndex === questions.length - 1 ? '提交' : '下一题'}</Text>
              <ChevronRight size={18} color="#ffffff" />
            </View>
          </Button>
        </View>
      </View>
    </View>
  )
}
