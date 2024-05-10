import type { PageLoad } from './$types'
import ApiAuthService from '$services/api/api-auth.service'
import ApiSchoolsService from '$services/api/api-schools.service'
import CookiesService from '$services/cookies.service'
import { goto } from '$app/navigation'
import type { School } from '$models/features/school.model'
import { error, type NumericRange } from '@sveltejs/kit'
// import type { Team } from '$models/features/team.model'
import type { Match } from '$models/features/match.model'
// import ApiTeamsService from '$services/api/api-teams.service'
import ApiMatchesService from '$services/api/api-matches.service'
import ApiAgendaService from '$services/api/api-agenda.service'
import type { Event } from '$models/features/event.model'
import type { Live } from '$models/features/live.model'
import ApiLivesService from '$services/api/api-agenda.service copy'

const apiSchools = new ApiSchoolsService()
// const apiTeams = new ApiTeamsService()
const apiMatches = new ApiMatchesService()
const apiAgenda = new ApiAgendaService()
const apiLives = new ApiLivesService()

export const load: PageLoad = async () => {
  let schools: School[] = []
  // let teams: Team[] = []
  let matches: Match[] = []
  let events: Event[] = []
  let lives: Live[] = []

  ;(await apiSchools.getSchools()).subscribe({
    next: (res) => {
      schools = res.body.data!.schools
    },
    error: (err) => {
      throw error(err.status as NumericRange<400, 599>, err.body.message)
    }
  })
  // ;(await apiTeams.getTeams()).subscribe({
  //   next: (res) => {
  //     teams = res.body.data!.teams
  //   },
  //   error: (err) => {
  //     throw error(err.status as NumericRange<400, 599>, err.body.message)
  //   }
  // })
  ;(await apiMatches.getMatches()).subscribe({
    next: (res) => {
      matches = res.body.data!.matches
    },
    error: (err) => {
      throw error(err.status as NumericRange<400, 599>, err.body.message)
    }
  })
  ;(await apiAgenda.getEvents()).subscribe({
    next: (res) => {
      events = res.body.data!.events
    },
    error: (err) => {
      throw error(err.status as NumericRange<400, 599>, err.body.message)
    }
  })
  ;(await apiLives.getLives()).subscribe({
    next: (res) => {
      lives = res.body.data!.lives
    },
    error: (err) => {
      throw error(err.status as NumericRange<400, 599>, err.body.message)
    }
  })

  return { schools, /*teams,*/ matches, events, lives }
}
