import React, { useEffect, useState } from 'react';

interface UserProfileProps {
    id: string;
}

interface UserDetail {
    id: string;
    name: string;
    email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
    const [user, setUser] = useState<UserDetail | null>(null);

    useEffect(() => {
        // fetch(`/api/users/${id}`)
        //     .then(res => res.json())
        //     .then(data => setUser(data))
        //     .catch(console.error);
    }, [id]);

    if (!user) {
        return <div className="p-6">加载中...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">用户详情</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>姓名:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserProfile;