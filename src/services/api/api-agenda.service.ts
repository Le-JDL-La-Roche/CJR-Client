import http from '../http.module'
import type { DataHttpResponse } from '$models/responses/data-http-response.model'
import { api } from '$services/store'
import type { Event } from '$models/features/event.model'

export default class ApiAgendaService {
  async getAgenda() {
    return await http.get<DataHttpResponse<{ events: Event[] }>>(`${api}/agenda`)
  }

  async postEvent(event: Event) {
    return await http.post<DataHttpResponse<{ events: Event[] }>>(`${api}/agenda`, event)
  }

  async putEvent(event: Partial<Event>, id: number | string) {
    return await http.put<DataHttpResponse<{ events: Event[] }>>(`${api}/agenda/${id}`, event)
  }

  async deleteEvent(id: number | string) {
    return await http.delete<DataHttpResponse<{ events: Event[] }>>(`${api}/agenda/${id}`)
  }
}
