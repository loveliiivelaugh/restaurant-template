import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { AuthProvider } from '../Auth/Auth';
import { PageTransitionWrapper, ThemeProvider } from '../theme/ThemeProvider';


const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        // Provides Authentication
        <AuthProvider>
            {/* Provides Query Client */}
            <QueryClientProvider client={queryClient}>
                {/* Provides App Theme */}
                <ThemeProvider>
                    <PageTransitionWrapper>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            {children}
                        </LocalizationProvider>
                    </PageTransitionWrapper>
                </ThemeProvider>
            </QueryClientProvider>
        </AuthProvider>
    );
};