import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import ProfileActions from './ProfileActions';

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Phone: {user.phone}</p>
            <p>City: {user.city}</p>

            <ProfileActions />
        </div>
    );
};

export default ProfilePage;
