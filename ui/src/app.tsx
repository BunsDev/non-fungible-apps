import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { themeGlobals } from '@/theme/globals';
import { ComponentsTest, Home, Mint } from './views';
import { ConnectKitButton } from 'connectkit';
import { MintTest } from './views/mint-test';
import { ToastProvider } from './components';
import { CreateAP } from './views/access-point';

export const App = () => {
  themeGlobals();
  return (
    <>
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
        {/* TODO remove after adding NavBar */}
        <ConnectKitButton />
      </div>
      <ToastProvider />
      <HashRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/create-ap/:id" element={<CreateAP />} />
          {/** TODO remove for release */}
          <Route path="/components-test" element={<ComponentsTest />} />
          <Route path="/mint-test" element={<MintTest />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </HashRouter>
    </>
  );
};
