
import { updatePassword, getAuth } from 'firebase/auth';

export async function updateUserPassword(newPassword: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error('User is not authenticated');

  await updatePassword(user, newPassword);
}
