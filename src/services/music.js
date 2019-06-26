import request from '../utils/request';

export function query({pageSize,current,genre}) {
  return request({
    url: `/2api/j/v2/songlist/explore?type=hot&sample_cnt=5`,
    method: 'get',
    data:{
      limit:pageSize,
      genre:genre||0,
      // start:(current-1)*pageSize
    }
  });
}
