import { chainOptions } from "@giving/constants/chainOptions";
import ModalContext from "@giving/contexts/modal-context";
import WalletContext from "@giving/contexts/wallet-context";
import { WalletProvider } from "@terra-money/wallet-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import About from "./registration/About";
import StepsLayout from "./registration/Layout";

export default function App() {
  return (
    <WalletProvider {...chainOptions}>
      <WalletContext>
        <ModalContext>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<h1>Dashboard</h1>} />
              <Route
                path="register"
                element={
                  <StepsLayout classes="my-0 md:my-20 justify-self-center" />
                }
              >
                <Route path="step1" element={<About />} />
                <Route path="step2" element={<h1>Step 2</h1>} />
                <Route path="step3" element={<h1>Step 3</h1>} />
                <Route path="step4" element={<h1>Step 4</h1>} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}
