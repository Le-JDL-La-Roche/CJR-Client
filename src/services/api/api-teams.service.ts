import http from '../http.module'
import type { DataHttpResponse } from '$models/responses/data-http-response.model'
import { api } from '$services/store'
import type { Team } from '$models/features/team.model'
import type { Match } from '$models/features/match.model'

/**
 * @deprecated Use `ApiSchoolsService` from '$services/api/api-school.service' instead
 */
export default class ApiTeamsService {
  async getTeams() {
    return await http.get<DataHttpResponse<{ teams: Team[] }>>(`${api}/teams`)
  }

  async postTeam(team: Team) {
    let team_ = { ...team, teammates: JSON.stringify(team.teammates) }
    return await http.post<DataHttpResponse<{ teams: Team[] }>>(`${api}/teams`, team_)
  }

  async putTeam(team: Partial<Team>, id: number | string) {
    let team_ = { ...team, teammates: JSON.stringify(team.teammates) }
    return await http.put<DataHttpResponse<{ teams: Team[] }>>(`${api}/teams/${id}`, team_)
  }

  async deleteTeam(id: number | string) {
    return await http.delete<DataHttpResponse<{ teams: Team[]; matches: Match[] }>>(`${api}/teams/${id}`)
  }
}
