export function ErrorReporter({ error }: { error: Error }): JSX.Element {
    return <pre style={{ color: 'red' }}>{error.stack}</pre>;
}
