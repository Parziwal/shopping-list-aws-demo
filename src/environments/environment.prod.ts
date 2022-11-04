import { UserManagerSettings } from "oidc-client-ts";

export const environment = {
  production: true,
  shoppingApiUrl: ' https://p0uzstuh2d.execute-api.us-east-1.amazonaws.com/prod',
  amazonCognitoDomain: 'shopping-list-demo',
  authSettings: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_47jBqicW0',
    client_id: 'uh4i750q97h7vmake9fs3qddq',
    client_secret: '18bg6hci4ua8jv9lng8u7lgpmokqhrlki6ec4e3ti9lruj21l2tu',
    redirect_uri: 'https://d2cymtu81o84an.cloudfront.net/login-callback',
    post_logout_redirect_uri: 'https://d2cymtu81o84an.cloudfront.net/logout-callback',
    response_type: 'code',
    scope: 'openid profile email',
    revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: true,
    loadUserInfo: true
  } as UserManagerSettings
};
