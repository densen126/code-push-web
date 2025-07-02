import AuthMenu from "../menu/AuthMenu";
export default function Sidebar() {
    return (
        <aside className="w-64 bg-base-200 border-r flex flex-col">
            <div className="h-16 flex items-center justify-center text-xl font-bold">
                code-push-web
            </div>
            <AuthMenu />
        </aside>
    );
}
