export default defineAppConfig({
  pages: [
    // TabBar页面
    'pages/index/index',
    'pages/circles/index',
    'pages/posts/index',
    'pages/me/index',
    
    // 首页相关
    'pages/login/index',
    
    // 认证流程
    'pages/auth/index',
    'pages/auth/phone',
    'pages/auth/basic',
    'pages/auth/face',
    'pages/auth/manual',
    'pages/auth/marriage',
    'pages/auth/premium',
    
    // 资料相关
    'pages/profile/index',
    'pages/profile/detail',
    'pages/profile/edit',
    'pages/profile/basic-info',
    'pages/profile/personality-test',
    'pages/profile/preferences',
    
    // 圈子相关
    'pages/circles/posts',
    
    // 动态相关
    'pages/posts/detail',
    'pages/posts/publish',
    'pages/posts/rejected',
    'pages/posts/appeal',
    
    // 消息相关
    'pages/messages/index',
    'pages/chat/list',
    'pages/chat/detail',
    'pages/matches/success',
    
    // 喜欢与匹配
    'pages/likes/index',
    
    // 功能页面
    'pages/favorites/index',
    'pages/blocklist/index',
    'pages/feedback/index',
    'pages/credit/index',
    
    // 设置相关
    'pages/settings/index',
    'pages/settings/cancel',
    'pages/settings/canceling',
    'pages/settings/canceled',
    
    // 通用页面
    'pages/loading/index',
    'pages/empty/index',
    'pages/error/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'AI相亲',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#FF6B8B',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/home.png',
        selectedIconPath: './assets/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/circles/index',
        text: '圈子',
        iconPath: './assets/tabbar/users.png',
        selectedIconPath: './assets/tabbar/users-active.png',
      },
      {
        pagePath: 'pages/posts/index',
        text: '动态',
        iconPath: './assets/tabbar/play.png',
        selectedIconPath: './assets/tabbar/play-active.png',
      },
      {
        pagePath: 'pages/me/index',
        text: '我的',
        iconPath: './assets/tabbar/user.png',
        selectedIconPath: './assets/tabbar/user-active.png',
      }
    ]
  }
})
