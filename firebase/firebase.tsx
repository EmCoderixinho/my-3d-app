import { createFirebaseAdminApp } from './FirebaseAdmin';
import { getFirestore } from 'firebase-admin/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

async function initializeAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  };
 
  return createFirebaseAdminApp(params);
}
 
export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // initialize admin
  await initializeAdmin();
 
  // now we can use the Firebase packages!
  const firestore = getFirestore();
 
  const { docs, size } = await firestore.collection('users').get();
  const users = docs.map(doc => doc.data())
 
  return res.send(users);
}