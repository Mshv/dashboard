import axios from "axios";

// const TOKEN_KEY = 'jwt';

// export const login = () => {
//   localStorage.setItem(TOKEN_KEY, 'TestLogin');
// }

// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// }

// export const async login = (props) => {
  // export const login = async (props) => {
export const login = async (props): Promise<any> => {
  // export const login = (props) => {
console.log(" Satrting in login() method ... ");
console.log(props);
const sendData = {
  username: props.userName,
  password: props.password,
  token:props.token
};
console.log(" sendData isLogin : ", sendData);
try {
  const response = await axios.post(process.env.POST_AUTH_CALL, sendData);
  if (response.data === null) return null;
  if (response.data.status === 'Authorized User !!!'){
    console.log("Authorized User !!!");
    console.log(response);
    return response;
  } else {
    console.log("NOT Authorized User !!!");
    return null;
  }
} catch (error) {
  console.log("ERR ", error.response);
  return error.response;
}

// Axios
// .post(process.env.POST_AUTH_CALL, sendData)
// .then(response => {
//   console.log(response);
//   if (response.data.status === 'Authorized User !!!') {
//     console.log("Authorized User");
//   return response;
// } else {
//   return null;
// }
// })
// .catch(function(error) {
//   console.log(error);
// });


}





 

