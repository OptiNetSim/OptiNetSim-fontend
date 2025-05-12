import httpInstance from "@/utils/request";

export function getEquipmentLibAPI(){
  return httpInstance({
    url:'/api/equipment-libraries'
  })
}

export function createEquipmentLibAPI(equipment_libraries_name) {
  return httpInstance({
    url: '/api/equipment-libraries',
    method: 'POST',
    data: {
      library_name: equipment_libraries_name,  // 发送的请求体，包含光网络名称
    }
  });
}

export function updateEquipmentLibAPI(library_id, equipment_libraries_name) {
  return httpInstance({
    url: `/api/equipment-libraries/${library_id}`,  // 使用网络 ID 动态生成 URL
    method: 'PUT',
    data: {
      library_name: equipment_libraries_name  // 请求数据，包含新的光网络名称
    }
  });
}

export function deleteEquipmentLibAPI(library_id) {
  return httpInstance({
    url: `/api/equipment-libraries/${library_id}`,  // 动态传递 network_id
    method: 'DELETE',
  });
}

export function getEquipmentListAPI(library_id){
  return httpInstance({
    url:`/api/equipment-libraries/${library_id}/equipment`
  });
}

export function createEquipmentAPI(library_id, equipment_name, equipment_type) {
  return httpInstance({
    url: `/api/equipment-libraries/${library_id}/equipments`,
    method: 'POST',
    data: {
      equipment_name: equipment_name,
      equipment_type: equipment_type
    }
  });
}

export function updateEquipmentAPI(library_id, equipment_id, equipment_name, equipment_type) {
  return httpInstance({
    url: `/api/equipment-libraries/${library_id}/equipments/${equipment_id}`,
    method: 'PUT',
    data: {
      equipment_name: equipment_name,
      equipment_type: equipment_type
    }
  });
}


