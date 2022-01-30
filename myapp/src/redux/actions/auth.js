import { GET_AUTH_TOKEN } from "./actionTypes";


export const getToken = () => async (dispatch) => {
  console.log('reached')
  // get login in with google 
  let response = await fetch(`https://accounts.google.com/o/oauth2/v2/auth?
    scope=[https://www.googleapis.com/auth/youtube.force-ssl, https://www.googleapis.com/auth/youtubepartner]&
    include_granted_scopes=true&
    state=state_parameter_passthrough_value&
    redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback&
    response_type=token&
    client_id=285321037795-kn7s9dthm6ngian41h0kqlfg92arnpqj.apps.googleusercontent.com`, {
      // mode: 'no-cors',
      headers: {
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Credentials": true
      }
    })

  //   <GoogleLogin
  //   clientId="285321037795-kn7s9dthm6ngian41h0kqlfg92arnpqj.apps.googleusercontent.com"
  //   buttonText="Login"
  //   onSuccess={responseGoogle}
  //   // scope='https://www.googleapis.com/auth/youtube.force-ssl'
  //   onFailure={responseGoogle}
  //   cookiePolicy={'single_host_origin'}
  //   isSignedIn={true}
  // />

  // const responseGoogle = (response) => {
  //   if (response.accessToken === undefined | null){
  //     console.log(response)
  //   }
  //   let token = response.accessToken
  //   setauth(token)
  // }

    console.log(response)
    dispatch({
      type: GET_AUTH_TOKEN,
      payload: '',
    });
  };