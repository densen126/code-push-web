import { useSelector } from "react-redux";
import { RootState } from "../../store";

const menu = [
    { label: "仪表盘", to: "/dashboard", roles: ["admin", "user"] },
    { label: "用户管理", to: "/users", roles: ["admin"] },
    { label: "系统设置", to: "/settings", roles: ["admin"] },
];

export default function AuthMenu() {
    // const user = useSelector((s: RootState) => s.user.user);
    return (
        <nav className="flex-1 py-4 flex flex-col gap-2">
            {menu
                .filter(item => !item.roles || item.roles.some(r => ["mock1", "mock2"].includes(r)))
                .map(item => (
                    <a
                        key={item.to}
                        className="btn btn-ghost justify-start"
                        href={item.to}
                    >
                        {item.label}
                    </a>
                ))}
        </nav>
    );
}
