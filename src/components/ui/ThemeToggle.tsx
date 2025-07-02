import { useTheme } from "../../context/ThemeContext";

const themes = [
    { name: "light", label: "☀️" },
    { name: "dark", label: "🌙" },
    { name: "cupcake", label: "🧁" },
    { name: "bumblebee", label: "🐝" }
];

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex gap-2 items-center">
            {themes.map(t => (
                <button
                    key={t.name}
                    className={`btn btn-sm ${theme === t.name ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => setTheme(t.name as any)}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
