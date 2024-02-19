import { goto } from '$app/navigation'
import ApiAuthService from '$services/api/api-auth.service'
import CookiesService from '$services/cookies.service'
import type { LayoutLoad } from './$types'

const cookies = new CookiesService()
const apiAuth = new ApiAuthService()

export const load: LayoutLoad = async () => {
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
