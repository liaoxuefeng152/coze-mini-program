import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { UserService } from './user.service'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: { code: string }) {
    return await this.userService.login(body.code)
  }

  @Get('profile')
  async getProfile(@Query('userId') userId?: string) {
    return await this.userService.getProfile(userId)
  }

  @Post('profile')
  async updateProfile(@Body() body: any) {
    return await this.userService.updateProfile(body)
  }

  @Get('recommend')
  async getRecommend(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.userService.getRecommend(Number(page), Number(limit))
  }

  @Post('like')
  async likeUser(@Body() body: { targetUserId: string }) {
    return await this.userService.likeUser(body.targetUserId)
  }

  @Get('likes')
  async getLikes(@Query('type') type: 'my-likes' | 'liked-me' | 'matches') {
    return await this.userService.getLikes(type)
  }

  @Post('pass')
  async passUser(@Body() body: { targetUserId: string }) {
    return await this.userService.passUser(body.targetUserId)
  }
}
