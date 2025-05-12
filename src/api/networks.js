import httpInstance from "@/utils/request";

export function getNetworkListAPI(){
  return httpInstance({
    url:'/api/networks'
  })
}

export function getNetworkByIdAPI(networkId){
  return httpInstance({
    url:`/api/networks/${networkId}`
  })
}

export function createNewNetworkAPI(networkName) {
  return httpInstance({
    url: '/api/networks',
    method: 'POST',
    data: {
      network_name: networkName,  // 发送的请求体，包含光网络名称
    }
  });
}

export function deleteNetworkAPI(networkId) {
  return httpInstance({
    url: `/api/networks/${networkId}`,  // 动态传递 network_id
    method: 'DELETE',
  });
}

export function updateNetworkAPI(networkId, networkName) {
  return httpInstance({
    url: `/api/networks/${networkId}`,  // 使用网络 ID 动态生成 URL
    method: 'PUT',
    data: {
      network_name: networkName  // 请求数据，包含新的光网络名称
    }
  });
}
