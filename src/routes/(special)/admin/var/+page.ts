import type { PageLoad } from './$types'
import { goto } from '$app/navigation'
import ApiAuthService from '$services/api/api-auth.service'
import CookiesService from '$services/cookies.service'
import ApiMatchesService from '$services/api/api-matches.service'

const cookies = new CookiesService()
const apiAuth = new ApiAuthService()
const apiMatches = new ApiMatchesService()

export const load: PageLoad = async () => {
  let streams: { ter1: string; ter2: string; glob: string } = { ter1: '', ter2: '', glob: '' }

  if (cookies.get('JWT')) {
    ;(await apiAuth.getVerify()).subscribe({
      error: () => {
        cookies.delete('JWT')
        goto('/connexion')
      }
    })
  } else {
    goto('/connexion')
  }

  ;(await apiMatches.getStreams()).subscribe({
    next: (res) => {
      streams = res.body.data!
    },
    error: () => {
      goto('/admin')
    }
  })

  return streams
}
