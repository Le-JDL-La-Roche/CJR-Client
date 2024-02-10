import type { PageLoad } from '../$types'
import ApiAuthService from '$services/api/api-auth.service'

const apiAuth = new ApiAuthService()

export const load: PageLoad = async () => {
  return {}
}
