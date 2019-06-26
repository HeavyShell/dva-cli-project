import request from '../utils/request';

export function query({pageSize,current,countries}) {
  return request({
    url: `/api/j/new_search_subjects?sort=T&range=0,10`,
    method: 'get',
    data:{
      limit:pageSize,
      start:(current-1)*pageSize,
      countries
    }
  });
}
