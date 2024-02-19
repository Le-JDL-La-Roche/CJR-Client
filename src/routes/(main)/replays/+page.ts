import type { Live } from '$models/features/live.model'
import ApiLivesService from '$services/api/api-agenda.service copy'
import { error, type NumericRange } from '@sveltejs/kit'
import type { PageLoad } from './$types'

const apiLives = new ApiLivesService()

export const load: PageLoad = async () => {
  let lives: Live[] = []

  ;(await apiLives.getLives()).subscribe({
    next: (res) => {
      lives = res.body.data!.lives
    },
    error: (err) => {
      throw error(err.status as NumericRange<400, 599>, err.body.message)
    }
  })

  return { lives }
}
