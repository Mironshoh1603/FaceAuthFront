
export const FaceAuthApiUrl = process.env.REACT_APP_FACEAUTH_URL;
export const FaceAuthRegister = FaceAuthApiUrl+"Register?code="+process.env.REACT_APP_FACEAUTH_REGISTER_APIKEY;
export const FaceAuthLogin = FaceAuthApiUrl+"Login?code="+process.env.REACT_APP_FACEAUTH_LOGIN_APIKEY;
