import { Common } from '../common.ts'

import type { RouterMiddleware } from '@oak/oak'

class Service60s {
  #cache = new Map<string, DailyNewsItem>()
  #TIP_PREFIX = '【微语】'

  handle(): RouterMiddleware<'/60s'> {
    return async (ctx) => {
      const data = await this.#fetch()

      switch (ctx.state.encoding) {
        case 'text':
          ctx.response.body = `每天 60s 看世界（${data.date}）\n\n${data.news
            .map((e, idx) => `${idx + 1}. ${e.title}`)
            .join('\n')}\n\n${data.tip ? `${this.#TIP_PREFIX}${data.tip}` : ''}`
          break

        case 'json':
        default:
          ctx.response.body = Common.buildJson(data)
          break
      }
    }
  }

  async #fetch() {
    const today = Common.localeDate()
    const cachedItem = this.#cache.get(today)

    if (cachedItem) {
      return cachedItem
    }

    const ZHIHU_COOKIE = globalThis.env?.ZHIHU_COOKIE ?? ''

    const api = 'https://www.zhihu.com/people/98-18-69-57/posts'
    const response = await fetch(api, {
      headers: {
        Cookie: ZHIHU_COOKIE,
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      },
    })

    const html = await response.text()

    const initialData = JSON.parse(
      /<script id="js-initialData" type="text\/json">(.+?)<\/script>/.exec(html)?.[1] || '{}',
    )

    const data = (Object.values(initialData?.initialState?.entities?.articles || {})[0] || {}) as any

    const { url: link, imageUrl: cover, updated: updatedAt = 0, content = '' } = data

    const REG_TAG = /<[^<>]+>/g
    const REG_ITEM = /<p\s+data-pid=[^<>]+>([^<>]+)<\/p>/g
    const items = ((content.match(REG_ITEM) || []) as string[])
      .map((e) => Common.transformEntities(e.replace(REG_TAG, '').trim()))
      .map((e) => e.replace(/(^\d+、\s*)|([。！～；]$)/g, ''))
      .filter((e) => e.length > 6)

    const todayInData = Common.localeDate(updatedAt * 1000)
    const news = items.filter((e) => !e.includes(this.#TIP_PREFIX))
    const tip = items.find((e) => e.includes(this.#TIP_PREFIX)) || ''

    const item = {
      date: Common.localeDate(updatedAt * 1000),
      cover,
      news: news.map((e) => ({
        title: e,
        link: `https://www.baidu.com/s?wd=${encodeURIComponent(e)}`,
      })),
      tip: tip
        .replace(this.#TIP_PREFIX, '')
        .replace(/[。！～]?早安$/, '')
        .trim(),
      link,
      updated: Common.localeTime(updatedAt * 1000),
      updated_at: updatedAt * 1000,
      api_updated: Common.localeTime(),
      api_updated_at: Date.now(),
    }

    // 有数据，且是今天的数据
    if (items.length && todayInData === today) {
      this.#cache.set(today, item)
    }

    return item
  }
}

export const service60s = new Service60s()

interface DailyNewsItem {
  date: string
  news: {
    title: string
    link: string
  }[]
  cover: string
  tip: string
  link: string
  updated: string
  updated_at: number
  api_updated: string
  api_updated_at: number
}
