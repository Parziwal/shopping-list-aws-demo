// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { UserManagerSettings } from "oidc-client-ts";

export const environment = {
  production: false,
  shoppingApiUrl: 'https://p0uzstuh2d.execute-api.us-east-1.amazonaws.com/prod',
  authSettings: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_47jBqicW0',
    client_id: '5rt5duu78ta71jna0a43gio5d5',
    client_secret: 'sv84u0eq2p4upp0cra1d0mqcs32ocffrs7n6j7g24f235asqkpm',
    redirect_uri: 'http://localhost:4200/login-callback',
    post_logout_redirect_uri: 'http://localhost:4200/logout-callback',
    response_type: 'code',
    scope: 'openid profile email',
    revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: true,
    loadUserInfo: true,
    metadataSeed: {
      end_session_endpoint: 'https://shopping-list-demo.auth.us-east-1.amazoncognito.com/logout?client_id=5rt5duu78ta71jna0a43gio5d5&logout_uri=http://localhost:4200/logout-callback',
    }
  } as UserManagerSettings
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
