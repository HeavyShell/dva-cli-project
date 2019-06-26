import request from '../utils/request';

export function query({pageSize,current}) {
  return request({
    url: `/mock/api/users`,
    method: 'get',
    headers:{
      pagesize:pageSize,
      current
    }
  });
}

export function queryItem({id}) {
  return request({
    url: `/mock/api/users/${id}`,
    method: 'get',
  });
}

export function modifyItem({id,name,age,create_time,avatar,address,email,love_color,description}) {
  if(id){
    return request({
      url: `/mock/api/users/${id}`,
      method: 'put',
      data:{
        name,age,create_time,avatar,address,email,love_color,description
      }
    });
  }else{
    return request({
      url: `/mock/api/users`,
      method: 'post',
      data:{
        name,age,create_time,avatar,address,email,love_color,description
      }
    });
  }
  
}

export function deleteItem({id}) {
  return request({
    url: `/mock/api/users/${id}`,
    method: 'delete'
  });
}
