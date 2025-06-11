export interface Profile {
  firstName?: string;
  lastName?: string;
  avatarSeed?: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  avatarSeed: string;
}

export interface ProfileTabProps {
  profile: Profile;
  name: string | null;
  surname: string | null;
  email: string | null;
  theme: string;
  handleSave: (values: ProfileFormValues) => void;
  loading?: boolean;
  handleClick?: () => void;
}