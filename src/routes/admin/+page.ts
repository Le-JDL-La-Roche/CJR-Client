import type { PageLoad } from './$types'
import ApiAuthService from '$services/api/api-auth.service'
import ApiSchoolsService from '$services/api/api-schools.service'
import CookiesService from '$services/cookies.service'
import { goto } from '$app/navigation'
import type { School } from '$models/features/school.model'
import { error } from '@sveltejs/kit'

const apiAuth = new ApiAuthService()
const apiSchools = new ApiSchoolsService()
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

  let schools: School[] = []

  ;(await apiSchools.getSchools()).subscribe({
    next: (res) => {
      schools = res.body.data?.schools || []
    },
    error: (err) => {
      throw error(err.status, err.body.message)
    }
  })

  return {schools}
}
