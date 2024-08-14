import TransitionLink from "./TransitionLink"

const Navigation = () => {
    return (
        <nav className="w-full p-5 flex flex-row place-items-center justify-between">
            <h1 className="text-3xl tracking-tight font-bold text-neutral-900">
                Manas
            </h1>
            <div className="flex gap-5">
                <TransitionLink href="/learning2" label="Home" />
                <TransitionLink href="/learning2/work" label="Work" />
                <TransitionLink href="/learning2/about" label="About" />
            </div>
        </nav>
    )
}

export default Navigation
