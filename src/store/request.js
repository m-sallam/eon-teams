// import element from 'element-ui'

const root = process.env.VUE_APP_ROOT

const req = async (path, method, body, token) => {
  let signedHeader = {
    'Content-Type': 'application/json',
    'Authorization': token
  }
  let unsignedHeader = {
    'Content-Type': 'application/json'
  }
  let options = {
    method: method,
    headers: token ? signedHeader : unsignedHeader,
    body: body
  }
  try {
    let res = await window.fetch(root + path, options)
    let response = {status: false, message: '', json: {}}
    switch (res.status) {
      case 200:
        if (res.headers.get('content-type') && res.headers.get('content-type').includes('json')) {
          response.json = await res.json()
        }
        response.status = true
        break
      case 422:
        response.json = await res.json()
        response.message = response.json.message
        break
      case 403:
        response.message = 'Acess Denied!'
        break
      case 404:
        response.message = 'Not Found'
        break
      default:
        response.message = 'An error occured, please contact support!'
    }
    return response
  } catch (err) {
    console.log(err)
    // element.Message({ showClose: true, message: 'An error occured, try again later! <a style="cursor:pointer" onClick="location.reload()">Reload</a> ', type: 'error', dangerouslyUseHTMLString: true })
    return {status: false, message: 'An error occured, please contact support!'}
  }
}

export {req, root}
