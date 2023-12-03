import {
    AppOptions,
    cert,
    getApp,
    getApps,
    initializeApp,
    ServiceAccount,
  } from "firebase-admin/app";
  
  interface FirebaseAdminAppParams {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  }
  
  function formatFirebasePrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
  }
  
  export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = formatFirebasePrivateKey(params.privateKey);
  
    // if already created, return the same instance
    if (getApps().length === 0) {
      // create certificate
  
      const credentials: ServiceAccount = {
  
        projectId: params.projectId,
        clientEmail: params.clientEmail,
        privateKey,
      }
  
      const options: AppOptions = {
  
        credential: cert(credentials)
      }
  
      return initializeApp(options);
    } else {
      return getApp();
    }
  }