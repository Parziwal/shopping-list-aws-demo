import { UserManagerSettings } from "oidc-client-ts";

export const environment = {
  production: false,
  shoppingApiUrl: '${apiUrl}',
  amazonCognitoDomain: 'shopping-list-auth',
  authSettings: {
    authority: '${cognitoUrl}',
    client_id: '${clientId}',
    redirect_uri: '${clientUrl}/login-callback',
    post_logout_redirect_uri: '${clientUrl}/logout-callback',
    response_type: 'code',
    scope: 'openid profile email',
    revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: true,
    loadUserInfo: true,
  } as UserManagerSettings
};