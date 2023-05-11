import requester from './request'

/**
 * Api公共方法
 * @function this.get() get请求
 * @function this.post() post请求
 * @function this.put() put请求
 * @function this.remove() delete请求
 */
class Common {
  /**
   * Get请求
   * @param {String} url 接口地址
   * @param {Object} params 请求参数
   * @param {Object} headers 请求头
   */
  static async get(url, params, headers, responseType) {
    return await (
      await requester({ url, method: 'GET', params, headers, responseType })
    ).data
  }

  /**
   * Post请求
   * @param {String} url 接口地址
   * @param {Object} data 请求参数
   * @param {Object} headers 请求头
   */
  static async post(url, data, headers) {
    return await requester({ url, method: 'POST', data, headers })
  }

  /**
   * Put请求
   * @param {String} url 接口地址
   * @param {Object} data 请求参数
   * @param {Object} headers 请求头
   */
  static async put(url, data, headers) {
    return await requester({ url, method: 'PUT', data, headers })
  }

  /**
   * Delete请求
   * @param {String} url 接口地址
   * @param {Object} data 请求参数
   * @param {Object} headers 请求头
   */
  static async remove(url, data, headers) {
    return await requester({ url, method: 'DELETE', data, headers })
  }
}

export default Common
