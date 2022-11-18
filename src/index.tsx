import './index.css';
import { render } from 'solid-js/web';

import { App } from './App';
import { Router, hashIntegration, Route, Routes } from '@solidjs/router';
import { FontDetails } from './page/FontDetails';
import { PackageDetails } from './page/PackageDetails';

render(() => {
    return (
        <>
            <Router source={hashIntegration()}>
                <Routes>
                    <Route path="/" element={App}></Route>
                    <Route path="/fonts/:packageName" element={PackageDetails}></Route>
                    <Route path="/fonts/:packageName/:fontName" element={FontDetails}></Route>
                </Routes>
            </Router>
        </>
    );
}, document.getElementById('root') as HTMLElement);
