import http from './utils/http';

export function myhome(parmas = {}) {
    return http.post('/demo/xxx', parmas)
}
