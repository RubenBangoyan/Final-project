import React from 'react';

interface UserInfo {
    name: string;
    surname: string;
    email: string;
    phone: string;
    city: string;
    avatarUrl?: string;
}

interface Props {
    user: UserInfo;
}

const ProfileInfo: React.FC<Props> = ({ user }) => {
    return (
        <div className="profile-info">
            <div className="avatar">
                <img src={user.avatarUrl || '/default-avatar.png'} alt="avatar" />
            </div>
            <div className="user-details">
                <p>{user.name}</p>
                <p>{user.surname}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.city}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
