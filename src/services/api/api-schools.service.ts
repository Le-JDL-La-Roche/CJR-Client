import http from '../http.module'
import type { DataHttpResponse } from '$models/responses/data-http-response.model'
import { api } from '$services/store'
import type { School } from '$models/features/school.model'

export default class ApiSchoolsService {
  async getSchools() {
    return await http.get<DataHttpResponse<{ schools: School[] }>>(`${api}/schools`)
  }

  async postSchool(school: School) {
    return await http.post<DataHttpResponse<{ schools: School[] }>>(`${api}/schools`, school)
  }

  async putSchool(school: Partial<School>, id: number | string) {
    return await http.put<DataHttpResponse<{ schools: School[] }>>(`${api}/schools/${id}`, school)
  }

  async deleteSchool(id: number | string) {
    return await http.delete<DataHttpResponse<{ schools: School[] }>>(`${api}/schools/${id}`)
  }
}
