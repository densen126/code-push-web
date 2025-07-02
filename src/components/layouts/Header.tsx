import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
    return (
        <header className="h-16 flex items-center justify-between border-b px-6 bg-base-100">
            <div className="font-semibold text-lg">Dashboard</div>
            <ThemeToggle />
        </header>
    );
}
