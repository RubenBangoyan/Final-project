export interface Profile {
  lastLogin?: string;
}

export interface SecurityTabProps {
  profile: Profile;
  theme: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}