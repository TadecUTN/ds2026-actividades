import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import type { ReactNode } from 'react';

interface LayoutProps { children: ReactNode };

function Layout({ children }: LayoutProps) {
    return (
        <div className='layout'>
            <Header />
            <Container className='py-4'> {children} </Container>
            <Footer />
        </div>
    );
}

export default Layout;