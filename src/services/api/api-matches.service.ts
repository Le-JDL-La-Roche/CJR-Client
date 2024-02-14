import http from '../http.module'
import type { DataHttpResponse } from '$models/responses/data-http-response.model'
import { api } from '$services/store'
import type { Match } from '$models/features/match.model'

export default class ApiMatchesService {
  async getMatches() {
    return await http.get<DataHttpResponse<{ matches: Match[] }>>(`${api}/matches`)
  }

  async postMatch(match: Match) {
    return await http.post<DataHttpResponse<{ matches: Match[] }>>(`${api}/matches`, match)
  }

  async putMatch(match: Partial<Match>, id: number | string) {
    return await http.put<DataHttpResponse<{ matches: Match[] }>>(`${api}/matches/${id}`, match)
  }

  async deleteMatch(id: number | string) {
    return await http.delete<DataHttpResponse<{ matches: Match[] }>>(`${api}/matches/${id}`)
  }
}
