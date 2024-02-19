import http from '../http.module'
import type { DataHttpResponse } from '$models/responses/data-http-response.model'
import { api } from '$services/store'
import type { Live } from '$models/features/live.model'

export default class ApiLivesService {
  async getLives() {
    return await http.get<DataHttpResponse<{ lives: Live[] }>>(`${api}/lives`)
  }

  async postLive(live: Live) {
    return await http.post<DataHttpResponse<{ lives: Live[] }>>(`${api}/lives`, live)
  }

  async putLive(live: Partial<Live>, id: number | string) {
    return await http.put<DataHttpResponse<{ lives: Live[] }>>(`${api}/lives/${id}`, live)
  }

  async deleteLive(id: number | string) {
    return await http.delete<DataHttpResponse<{ lives: Live[] }>>(`${api}/lives/${id}`)
  }
}
