import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'

@Injectable()
export class DatabaseService {
  private supabase: any

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder_key'

    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  getClient() {
    return this.supabase
  }
}
