import Redis from 'ioredis'

const KUN_PATCH_REDIS_PREFIX = 'kun:touchgal'

const redisUrl = process.env.REDIS_URL || 'redis://redis.railway.internal:6379';

// 注意：如果您的 REDIS_URL 是完整的 URL 格式，ioredis 应该能自动处理。
// 但如果需要强制使用 IPv6，您可以尝试以下配置：

const redisInstance = new Redis(redisUrl, {
    // 明确要求使用 IPv6
    family: 6, 
    // ... 其他配置 ...
});
export const setKv = async (key: string, value: string, time?: number) => {
  const keyString = `${KUN_PATCH_REDIS_PREFIX}:${key}`
  if (time) {
    await redis.setex(keyString, time, value)
  } else {
    await redis.set(keyString, value)
  }
}

export const getKv = async (key: string) => {
  const keyString = `${KUN_PATCH_REDIS_PREFIX}:${key}`
  const value = await redis.get(keyString)
  return value
}

export const delKv = async (key: string) => {
  const keyString = `${KUN_PATCH_REDIS_PREFIX}:${key}`
  await redis.del(keyString)
}
