import { useTheme } from "../../context/ThemeContext";


const themes = [
    { name: "light", label: "☀️" },
    { name: "dark", label: "🌙" },
    { name: "cupcake", label: "🧁" },
    { name: "synthwave", label: "🌈" },
    { name: "retro", label: "🎮" },
    { name: "valentine", label: "💖" },
    { name: "forest", label: "🌳" },
    { name: "luxury", label: "💎" }
];

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <>
            {themes.map(t => (
                <button
                    key={t.name}
                    className={`btn btn-sm btn-circle p-1 ${theme === t.name ? "btn-accent" : ""}`}
                    onClick={() => setTheme(t.name as any)}
                >
                    {t.label}
                </button>
            ))}
        </>
    );
}
