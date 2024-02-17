import type { School } from '$models/features/school.model'
import type { Team } from '$models/features/team.model'
import ApiSchoolsService from '$services/api/api-schools.service'
import ApiTeamsService from '$services/api/api-teams.service'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

const apiTeams = new ApiTeamsService()
const apiSchools = new ApiSchoolsService()

export const load: PageLoad = async () => {
  let teams: Team[] = []
  let schools: School[] = []

  ;(await apiTeams.getTeams()).subscribe({
    next: (res) => {
      teams = res.body.data!.teams
    },
    error: (err) => {
      throw error(err.status, err.body.message)
    }
  })
  ;(await apiSchools.getSchools()).subscribe({
    next: (res) => {
      schools = res.body.data!.schools
    },
    error: (err) => {
      throw error(err.status, err.body.message)
    }
  })

  return { teams, schools }
}
