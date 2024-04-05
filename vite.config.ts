import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import EnvironmentPlugin from "vite-plugin-environment";
//@ts-ignore
import { initCanisterIds } from "./dfx.config"

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const canisterID = initCanisterIds(process.env.VITE_DFX_NETWORK, mode)
  for (let i = 0; i < canisterID.length; i++){
    const name = canisterID[i].toUpperCase();
    i++;
    const id = canisterID[i]
    process.env[`VITE_${name}_CANISTER_ID`] = id;
  }
  return defineConfig({
    plugins: [
      EnvironmentPlugin({VITE_DFX_NETWORK: "local"}),
      react()
    ],
  })
}
