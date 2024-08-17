import SmoothScrolling from './components/SmoothScrolling'


export default function RootLayout({ children }: any) {
    return (
        <SmoothScrolling>{children}</SmoothScrolling>
    );
}
