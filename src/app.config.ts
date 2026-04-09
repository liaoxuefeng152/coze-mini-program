export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/circles/index',
    'pages/posts/index',
    'pages/posts/detail',
    'pages/posts/publish',
    'pages/chat/list',
    'pages/chat/detail',
    'pages/me/index',
    'pages/likes/index',
    'pages/profile/detail',
    'pages/profile/edit',
    'pages/favorites/index',
    'pages/blocklist/index',
    'pages/settings/index',
    'pages/feedback/index',
    'pages/auth/index',
    'pages/auth/basic',
    'pages/auth/face',
    'pages/auth/manual',
    'pages/auth/marriage',
    'pages/auth/premium',
    'pages/profile/index',
    'pages/profile/basic-info',
    'pages/profile/personality-test',
    'pages/profile/preferences',
    'pages/login/index',
    'pages/messages/index',
    'pages/credit/index',
    'pages/circles/posts'
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
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './assets/tabbar/user.png',
        selectedIconPath: './assets/tabbar/user-active.png',
      }
    ]
  }
})
