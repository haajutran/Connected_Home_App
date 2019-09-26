import * as authServices from './AuthServices';
import * as constant from './Constant';
import axios from 'axios';

async function getHeader() {
  const loggedUser = await authServices.getLoggedInUser();
  const token = loggedUser.access_token;
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  console.log(header);
  return header;
}

function getHeaderWithoutBearer() {
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return header;
}

export const login = async data => {
  console.log(data);
  try {
    const res = await axios.post(
      constant.BASE_URL + 'api/accounts/generatetoken',
      data,
      {
        headers: getHeaderWithoutBearer(),
      },
    );
    console.log(data);
    return res;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      error.response.data =
        'Tài khoản của bạn chưa được phân quyền để thực hiện tính năng này';
    }
    return error.response;
  }
};

export const get = async url => {
  try {
    const header = await getHeader();

    const res = await axios.get(constant.BASE_URL + url, {
      headers: header,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const post = async (url, data) => {
  try {
    const header = await getHeader();

    const res = await axios.post(
      constant.BASE_URL + url,
      JSON.stringify(data),
      {
        headers: header,
      },
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const upload = async (url, file) => {
  var data = new FormData();
  data.append('file', file);
  return axios.post(constant.BASE_URL + url, data).then(res => {
    return res.data;
  });
};

export const put = async (url, data) => {
  return await axios
    .put(constant.BASE_URL + url, JSON.stringify(data), {
      headers: getHeader(),
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error.response.status === 401 || error.response.status === 403) {
        error.response.data =
          'Tài khoản của bạn chưa được phân quyền để thực hiện tính năng này';
      }
      return error.response;
    });
};

export const remove = async url => {
  return await axios
    .delete(constant.BASE_URL + url, {headers: getHeader()})
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error.response.status === 401 || error.response.status === 403) {
        error.response.data =
          'Tài khoản của bạn chưa được phân quyền để thực hiện tính năng này';
      }
      return error.response;
    });
};

export const download = async (url, fileName) => {
  axios({
    url: constant.BASE_URL + url,
    method: 'GET',
    responseType: 'blob', // important
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  });
};
