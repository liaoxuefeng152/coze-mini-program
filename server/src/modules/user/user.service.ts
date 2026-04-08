import { Injectable, BadRequestException } from '@nestjs/common'
import { DatabaseService } from '@/common/services/database.service'

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async login(code: string) {
    console.log('[UserService] 微信登录请求', { code })

    try {
      const supabase = this.db.getClient()

      const { data: { user }, error } = await supabase.auth.getUser(code)

      if (error) {
        console.error('[UserService] 登录失败', error)
        throw new BadRequestException('登录失败')
      }

      console.log('[UserService] 登录成功', { userId: user?.id })

      return {
        code: 200,
        msg: '登录成功',
        data: {
          userId: user?.id,
          accessToken: user?.access_token
        }
      }
    } catch (error) {
      console.error('[UserService] 登录异常', error)
      throw error
    }
  }

  async getProfile(userId?: string) {
    console.log('[UserService] 获取用户资料', { userId })

    try {
      const supabase = this.db.getClient()

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('[UserService] 获取资料失败', error)
        throw new BadRequestException('获取资料失败')
      }

      console.log('[UserService] 获取资料成功')

      return {
        code: 200,
        msg: '获取成功',
        data
      }
    } catch (error) {
      console.error('[UserService] 获取资料异常', error)
      throw error
    }
  }

  async updateProfile(profileData: any) {
    console.log('[UserService] 更新用户资料', profileData)

    try {
      const supabase = this.db.getClient()

      const { data, error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', profileData.id)
        .select()
        .single()

      if (error) {
        console.error('[UserService] 更新失败', error)
        throw new BadRequestException('更新失败')
      }

      console.log('[UserService] 更新成功')

      return {
        code: 200,
        msg: '更新成功',
        data
      }
    } catch (error) {
      console.error('[UserService] 更新异常', error)
      throw error
    }
  }

  async getRecommend(page: number, limit: number) {
    console.log('[UserService] 获取推荐用户', { page, limit })

    try {
      const supabase = this.db.getClient()

      const offset = (page - 1) * limit

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('[UserService] 获取推荐失败', error)
        throw new BadRequestException('获取推荐失败')
      }

      console.log('[UserService] 获取推荐成功')

      return {
        code: 200,
        msg: '获取成功',
        data: {
          users: data || [],
          total: 100,
          page,
          limit
        }
      }
    } catch (error) {
      console.error('[UserService] 获取推荐异常', error)
      throw error
    }
  }

  async likeUser(targetUserId: string) {
    console.log('[UserService] 喜欢用户', { targetUserId })

    try {
      const supabase = this.db.getClient()

      const { data, error } = await supabase
        .from('likes')
        .insert({
          from_user_id: 'current_user_id',
          to_user_id: targetUserId,
          is_mutual: false
        })
        .select()
        .single()

      if (error) {
        console.error('[UserService] 喜欢失败', error)
        throw new BadRequestException('喜欢失败')
      }

      console.log('[UserService] 喜欢成功')

      return {
        code: 200,
        msg: '喜欢成功',
        data
      }
    } catch (error) {
      console.error('[UserService] 喜欢异常', error)
      throw error
    }
  }

  async getLikes(type: 'my-likes' | 'liked-me' | 'matches') {
    console.log('[UserService] 获取喜欢列表', { type })

    try {
      const supabase = this.db.getClient()

      let query = supabase.from('likes').select('*')

      if (type === 'my-likes') {
        query = query.eq('from_user_id', 'current_user_id')
      } else if (type === 'liked-me') {
        query = query.eq('to_user_id', 'current_user_id')
      } else if (type === 'matches') {
        query = query.eq('is_mutual', true)
      }

      const { data, error } = await query

      if (error) {
        console.error('[UserService] 获取喜欢列表失败', error)
        throw new BadRequestException('获取失败')
      }

      console.log('[UserService] 获取喜欢列表成功')

      return {
        code: 200,
        msg: '获取成功',
        data: data || []
      }
    } catch (error) {
      console.error('[UserService] 获取喜欢列表异常', error)
      throw error
    }
  }

  async passUser(targetUserId: string) {
    console.log('[UserService] 跳过用户', { targetUserId })

    try {
      const supabase = this.db.getClient()

      const { data, error } = await supabase
        .from('passes')
        .insert({
          user_id: 'current_user_id',
          target_user_id: targetUserId
        })
        .select()
        .single()

      if (error) {
        console.error('[UserService] 跳过失败', error)
        throw new BadRequestException('跳过失败')
      }

      console.log('[UserService] 跳过成功')

      return {
        code: 200,
        msg: '跳过成功',
        data
      }
    } catch (error) {
      console.error('[UserService] 跳过异常', error)
      throw error
    }
  }
}
