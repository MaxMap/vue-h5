import request from './request';

const http = {
    get(url, params, headers) {
        const config = {
            method: 'GET',
            url: url,
            params: params ? params : {},
            headers: headers ? headers : {}
        }
        return request(config);
    },
    post(url, data, headers) {
        const config = {
            method: 'POST',
            url: url,
            data: data ? data : {},
            headers: headers ? headers : {}
        }
        return request(config);
    }
}
export default http