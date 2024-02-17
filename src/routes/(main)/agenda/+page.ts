import type { Match } from '$models/features/match.model'
import type { School } from '$models/features/school.model'
import type { Team } from '$models/features/team.model'
import ApiMatchesService from '$services/api/api-matches.service'
import ApiSchoolsService from '$services/api/api-schools.service'
import ApiTeamsService from '$services/api/api-teams.service'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import type { Event } from '$models/features/event.model'
import ApiAgendaService from '$services/api/api-agenda.service'

const apiMatches = new ApiMatchesService()
const apiTeams = new ApiTeamsService()
const apiSchools = new ApiSchoolsService()
const apiAgenda = new ApiAgendaService()

export const load: PageLoad = async () => {
  let matches: Match[] = []
  let teams: Team[] = []
  let schools: School[] = []
  let events: Event[] = []

  ;(await apiMatches.getMatches()).subscribe({
    next: (res) => {
      matches = res.body.data!.matches
    },
    error: (err) => {
      throw error(err.status, err.body.message)
    }
  })
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
  ;(await apiAgenda.getAgenda()).subscribe({
    next: (res) => {
      events = res.body.data!.events
    },
    error: (err) => {
      throw error(err.status, err.body.message)
    }
  })

  return { matches, teams, schools, events }
}
