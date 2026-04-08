import { pgTable, serial, timestamp, varchar, text, boolean, integer, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 系统表 - 必须保留
export const healthCheck = pgTable("health_check", {
  id: serial().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 用户表 - 微信登录用户
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    wx_openid: varchar("wx_openid", { length: 100 }).notNull().unique(),
    wx_unionid: varchar("wx_unionid", { length: 100 }),
    phone: varchar("phone", { length: 20 }).unique(),
    nickname: varchar("nickname", { length: 50 }).notNull(),
    avatar_url: varchar("avatar_url", { length: 500 }),
    is_active: boolean("is_active").default(true).notNull(),
    is_verified: boolean("is_verified").default(false).notNull(), // 是否已基础认证
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("users_wx_openid_idx").on(table.wx_openid),
    index("users_phone_idx").on(table.phone),
    index("users_is_verified_idx").on(table.is_verified),
    index("users_created_at_idx").on(table.created_at),
  ]
);

// 认证信息表 - 实名、人脸、婚姻状态认证
export const authentications = pgTable(
  "authentications",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    auth_type: varchar("auth_type", { length: 20 }).notNull(), // identity, face, marriage, education, work, house, car, income
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, approved, rejected, locked
    data: jsonb("data"), // 认证数据（身份证号、人脸结果等）
    rejected_reason: varchar("rejected_reason", { length: 500 }),
    fail_count: integer("fail_count").default(0).notNull(), // 失败次数
    locked_until: timestamp("locked_until", { withTimezone: true }), // 锁定到期时间
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("authentications_user_id_idx").on(table.user_id),
    index("authentications_auth_type_idx").on(table.auth_type),
    index("authentications_status_idx").on(table.status),
  ]
);

// 个人资料表 - 基础信息
export const profiles = pgTable(
  "profiles",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    gender: varchar("gender", { length: 10 }).notNull(), // male, female
    age: integer("age").notNull(),
    height: integer("height"), // cm
    weight: integer("weight"), // kg
    education: varchar("education", { length: 50 }), // 本科、硕士、博士等
    occupation: varchar("occupation", { length: 100 }),
    industry: varchar("industry", { length: 100 }),
    income_range: varchar("income_range", { length: 50 }), // 10-20万, 20-50万等
    city: varchar("city", { length: 100 }), // 现居城市
    province: varchar("province", { length: 50 }),
    hometown: varchar("hometown", { length: 100 }), // 籍贯
    marital_status: varchar("marital_status", { length: 20 }).notNull(), // single, divorced, widowed
    has_children: boolean("has_children").default(false),
    smoking: varchar("smoking", { length: 20 }), // never, occasionally, often
    drinking: varchar("drinking", { length: 20 }), // never, occasionally, often
   作息类型: varchar("作息类型", { length: 20 }), // early_bird, night_owl, flexible
    personality_tags: jsonb("personality_tags"), // AI 生成的性格标签
    lifestyle_tags: jsonb("lifestyle_tags"), // AI 生成的生活方式标签
    match_advantages: jsonb("match_advantages"), // AI 生成的匹配优势标签
    risk_tags: jsonb("risk_tags"), // AI 生成的风险提示标签
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("profiles_user_id_idx").on(table.user_id),
    index("profiles_gender_idx").on(table.gender),
    index("profiles_age_idx").on(table.age),
    index("profiles_city_idx").on(table.city),
    index("profiles_marital_status_idx").on(table.marital_status),
  ]
);

// 择偶要求表
export const preferences = pgTable(
  "preferences",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    age_min: integer("age_min"),
    age_max: integer("age_max"),
    height_min: integer("height_min"),
    height_max: integer("height_max"),
    education_min: varchar("education_min", { length: 50 }),
    income_min: varchar("income_min", { length: 50 }),
    accept_marital_status: jsonb("accept_marital_status"), // ["single", "divorced"]
    accept_divorced_with_children: boolean("accept_divorced_with_children").default(false),
    location_preference: varchar("location_preference", { length: 20 }), // same_city, same_province, anywhere
    lifestyle_preference: jsonb("lifestyle_preference"), // 生活习惯要求
    consumption_preference: varchar("consumption_preference", { length: 50 }), // 消费观
    family_view_preference: varchar("family_view_preference", { length: 50 }), // 家庭观
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("preferences_user_id_idx").on(table.user_id),
  ]
);

// 性格测试表
export const personalityTests = pgTable(
  "personality_tests",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    answers: jsonb("answers").notNull(), // 15题答案
    personality_type: varchar("personality_type", { length: 50 }), // AI 分析出的性格类型
    personality_description: text("personality_description"), // 性格描述
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("personality_tests_user_id_idx").on(table.user_id),
  ]
);

// 兴趣圈子表
export const circles = pgTable(
  "circles",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
    cover_image_url: varchar("cover_image_url", { length: 500 }),
    member_count: integer("member_count").default(0).notNull(),
    is_official: boolean("is_official").default(true).notNull(), // 是否官方圈子
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("circles_is_official_idx").on(table.is_official),
  ]
);

// 圈子成员表
export const circleMembers = pgTable(
  "circle_members",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    circle_id: varchar("circle_id", { length: 36 }).notNull().references(() => circles.id, { onDelete: "cascade" }),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    joined_at: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("circle_members_circle_id_idx").on(table.circle_id),
    index("circle_members_user_id_idx").on(table.user_id),
    index("circle_members_circle_user_idx").on(table.circle_id, table.user_id),
  ]
);

// 动态表 - 图文/视频
export const posts = pgTable(
  "posts",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    media_urls: jsonb("media_urls"), // 图片/视频 URL 数组
    media_type: varchar("media_type", { length: 20 }).notNull(), // image, video
    circle_ids: jsonb("circle_ids"), // 同步到的圈子 ID 数组
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, approved, rejected, hidden
    ai_audit_result: jsonb("ai_audit_result"), // AI 审核结果
    rejected_reason: varchar("rejected_reason", { length: 500 }),
    appeal_count: integer("appeal_count").default(0).notNull(),
    appeal_status: varchar("appeal_status", { length: 20 }), // none, pending, approved, rejected
    like_count: integer("like_count").default(0).notNull(),
    comment_count: integer("comment_count").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("posts_user_id_idx").on(table.user_id),
    index("posts_status_idx").on(table.status),
    index("posts_created_at_idx").on(table.created_at),
    index("posts_like_count_idx").on(table.like_count),
  ]
);

// 动态点赞表
export const postLikes = pgTable(
  "post_likes",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    post_id: varchar("post_id", { length: 36 }).notNull().references(() => posts.id, { onDelete: "cascade" }),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("post_likes_post_id_idx").on(table.post_id),
    index("post_likes_user_id_idx").on(table.user_id),
    index("post_likes_post_user_idx").on(table.post_id, table.user_id),
  ]
);

// 动态评论表
export const postComments = pgTable(
  "post_comments",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    post_id: varchar("post_id", { length: 36 }).notNull().references(() => posts.id, { onDelete: "cascade" }),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    parent_id: varchar("parent_id", { length: 36 }).references(() => postComments.id, { onDelete: "cascade" }), // 回复的评论
    content: text("content").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("post_comments_post_id_idx").on(table.post_id),
    index("post_comments_user_id_idx").on(table.user_id),
    index("post_comments_parent_id_idx").on(table.parent_id),
  ]
);

// 匹配表 - 双向匹配关系
export const matches = pgTable(
  "matches",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id_1: varchar("user_id_1", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    user_id_2: varchar("user_id_2", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    match_score: integer("match_score").notNull(), // 匹配分数 0-100
    match_reasons: jsonb("match_reasons"), // 匹配理由
    status: varchar("status", { length: 20 }).notNull().default("active"), // active, archived
    archived_at: timestamp("archived_at", { withTimezone: true }),
    last_message_at: timestamp("last_message_at", { withTimezone: true }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("matches_user_id_1_idx").on(table.user_id_1),
    index("matches_user_id_2_idx").on(table.user_id_2),
    index("matches_status_idx").on(table.status),
    index("matches_created_at_idx").on(table.created_at),
    index("matches_user_match_idx").on(table.user_id_1, table.user_id_2),
  ]
);

// 喜欢表 - 单向喜欢
export const likes = pgTable(
  "likes",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    from_user_id: varchar("from_user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    to_user_id: varchar("to_user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    is_mutual: boolean("is_mutual").default(false).notNull(), // 是否双向喜欢
    match_id: varchar("match_id", { length: 36 }).references(() => matches.id), // 关联的匹配 ID
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("likes_from_user_id_idx").on(table.from_user_id),
    index("likes_to_user_id_idx").on(table.to_user_id),
    index("likes_is_mutual_idx").on(table.is_mutual),
    index("likes_from_to_idx").on(table.from_user_id, table.to_user_id),
    index("likes_created_at_idx").on(table.created_at),
  ]
);

// 聊天会话表
export const chats = pgTable(
  "chats",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id_1: varchar("user_id_1", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    user_id_2: varchar("user_id_2", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    last_message: text("last_message"),
    last_message_at: timestamp("last_message_at", { withTimezone: true }),
    unread_count_1: integer("unread_count_1").default(0).notNull(),
    unread_count_2: integer("unread_count_2").default(0).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("active"), // active, archived
    archived_at: timestamp("archived_at", { withTimezone: true }),
    virtual_phone: varchar("virtual_phone", { length: 20 }), // 虚拟临时号（7天后可用）
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("chats_user_id_1_idx").on(table.user_id_1),
    index("chats_user_id_2_idx").on(table.user_id_2),
    index("chats_status_idx").on(table.status),
    index("chats_last_message_at_idx").on(table.last_message_at),
    index("chats_user_match_idx").on(table.user_id_1, table.user_id_2),
  ]
);

// 聊天消息表
export const messages = pgTable(
  "messages",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    chat_id: varchar("chat_id", { length: 36 }).notNull().references(() => chats.id, { onDelete: "cascade" }),
    sender_id: varchar("sender_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    message_type: varchar("message_type", { length: 20 }).notNull().default("text"), // text, image, voice
    is_read: boolean("is_read").default(false).notNull(),
    is_blocked: boolean("is_blocked").default(false).notNull(), // 是否被风控拦截
    blocked_reason: varchar("blocked_reason", { length: 500 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("messages_chat_id_idx").on(table.chat_id),
    index("messages_sender_id_idx").on(table.sender_id),
    index("messages_created_at_idx").on(table.created_at),
    index("messages_is_read_idx").on(table.is_read),
  ]
);

// 黑名单表
export const blocklist = pgTable(
  "blocklist",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    blocked_user_id: varchar("blocked_user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    reason: varchar("reason", { length: 500 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("blocklist_user_id_idx").on(table.user_id),
    index("blocklist_blocked_user_id_idx").on(table.blocked_user_id),
    index("blocklist_user_blocked_idx").on(table.user_id, table.blocked_user_id),
  ]
);
