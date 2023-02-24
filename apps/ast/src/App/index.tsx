import { chainOptions } from "@ap/constants";
import { ModalContext } from "@ap/contexts";
import WalletContext from "@ap/contexts/wallet-context";
import { WalletProvider } from "@terra-money/wallet-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
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
                element={<StepsLayout classes="place-self-center" />}
              >
                <Route path="step1" element={<h1>Step 1</h1>} />
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
