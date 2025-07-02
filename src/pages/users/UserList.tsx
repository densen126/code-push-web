const users = [
    { id: "1", name: "张三", email: "zhangsan@test.com", role: "admin" },
    { id: "2", name: "李四", email: "lisi@test.com", role: "user" },
];

export default function UserList() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">用户管理</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>姓名</th>
                            <th>邮箱</th>
                            <th>角色</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className={`badge ${u.role === "admin" ? "badge-primary" : "badge-ghost"}`}>
                                        {u.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
