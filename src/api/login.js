import httpInstance from "@/utils/request";

export function getLoginAPI(username, password){
  return httpInstance({
    method: 'POST',
    url:'/api/auth/login',
    data: {
      username: username,
      password: password,
    }
  })
}

export function getRegisterAPI(username, password, email){
  return httpInstance({
    method: 'POST',
    url:'/api/auth/register',
    data: {
      username: username,
      password: password,
      email: email,
    }
  })
}
