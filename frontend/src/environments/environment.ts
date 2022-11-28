import { UserManagerSettings } from "oidc-client-ts";

export const environment = {
  production: false,
  shoppingApiUrl: 'https://w99t7cssw6.execute-api.us-east-1.amazonaws.com/prod',
  amazonCognitoDomain: 'shopping-list-auth',
  authSettings: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_5tj7OPEpi',
    client_id: '6fbjr861aeqbrlvah2ik2gacag',
    redirect_uri: 'http://localhost:4200/login-callback',
    post_logout_redirect_uri: 'http://localhost:4200/logout-callback',
    response_type: 'code',
    scope: 'openid profile email',
    revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: true,
    loadUserInfo: true,
  } as UserManagerSettings
};