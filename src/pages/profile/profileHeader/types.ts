export interface ProfileHeaderProps {
  loading: boolean;
  profile: {
    firstName?: string;
    lastName?: string;
    avatarSeed?: string;
    joinDate?: string;
    lastLogin?: string;
  } | null;
  email?: string | null;
  theme: string;
}