import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'

import { IRequestResponseDto } from './request.dto';


@Injectable()
export class RequestService {
  constructor() {}

  async post<R>(
    url: string,
    data: any,
    options?: { headers: Record<string, string>; shouldSendEncodedBody?: boolean },
    shouldValidateSoft?: boolean
  ): Promise<IRequestResponseDto<R>> {
    try {
      const { headers, shouldSendEncodedBody } = options || { headers: {} }
      const response = await axios.request({
        method: 'POST',
        url,
        headers: {
          'content-type': shouldSendEncodedBody ? 'application/x-www-form-urlencoded' : 'application/json',
          ...headers
        },
        data: shouldSendEncodedBody ? qs.stringify(data) : data
      })
      return {
        isSuccess: true,
        data: response.data as R
      }
    } catch (e) {
      return this.handleError(e as Error | AxiosError, url, 'POST', shouldValidateSoft)
    }
  }

  private handleError<R>(
    error: Error | AxiosError,
    url: string,
    method: string,
    shouldValidateSoft?: boolean
  ): IRequestResponseDto<R> {
    if (axios.isAxiosError(error)) {
      if (shouldValidateSoft) {
        Logger.warn(`EXTERNAL AXIOS ${method} REQUEST ERROR: ${error} ${url}`)
        return {
          isSuccess: false,
          errorConfig: {
            isTimeout: error.code === 'ECONNABORTED',
            status: error.response?.status || 0,
            data: error.response?.data
          }
        }
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    Logger.warn(`EXTERNAL ${method} REQUEST ERROR: ${error} ${url}`)
    if (shouldValidateSoft) {
      return {
        isSuccess: false
      }
    }
    throw new HttpException(error, HttpStatus.BAD_REQUEST)
  }
}
