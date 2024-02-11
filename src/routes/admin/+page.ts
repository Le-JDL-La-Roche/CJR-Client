import type { PageLoad } from './$types'
import ApiAuthService from '$services/api/api-auth.service'
import CookiesService from '$services/cookies.service'
import { goto } from '$app/navigation'

const apiAuth = new ApiAuthService()
const cookies = new CookiesService()

export const load: PageLoad = async () => {
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
  return {}
}
