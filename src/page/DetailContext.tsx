import { createContext } from 'solid-js';
import type { FontReporter } from '../components/fonts/utils';

export interface DetailContextType {
    reporter: FontReporter;
    packageName: string;
    subName: string;
    cnName: string;
    version: string;
}
export const DetailedContext = createContext<DetailContextType>();
