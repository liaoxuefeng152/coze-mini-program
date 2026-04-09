export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/circles/index',
    'pages/likes/index',
    'pages/posts/index',
    'pages/posts/detail',
    'pages/posts/publish',
    'pages/chat/list',
    'pages/chat/detail',
    'pages/me/index',
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
        pagePath: 'pages/likes/index',
        text: '喜欢',
        iconPath: './assets/tabbar/heart.png',
        selectedIconPath: './assets/tabbar/heart-active.png',
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
