import * as fs from 'fs';

let localCanisters, prodCanisters, canisters

export const initCanisterIds = (dfxNetowrk: string, mode: String) => {
  try {
    localCanisters = JSON.parse(fs.readFileSync(".dfx/local/canister_ids.json", {encoding: "utf8"}))
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production")
  }
  try {
    prodCanisters = JSON.parse(fs.readFileSync("canister_ids.json", {encoding: "utf8"}))
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local")
  }
  
  // const network =
  // process.env.VITE_DFX_NETWORK ||
  // (process.env.NODE_ENV === "production" ? "ic" : "local")

  const network =
  dfxNetowrk ||
  (mode === "production" ? "ic" : "local")
  
  console.info(`initCanisterIds: network=${network}`)
  // console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`)
  console.info(`initCanisterIds: DFX_NETWORK=${dfxNetowrk}`)
  
  canisters = network === "local" ? localCanisters : prodCanisters
  // for (const canister in canisters) {
  //   process.env[`VITE_PUBLIC_${canister.toUpperCase()}_CANISTER_ID`] =
  //   canisters[canister][network]
  // }
  const canisterID = []
  for (const canister in canisters) {
    canisterID.push(canister.toUpperCase())
    canisterID.push(canisters[canister][network])
  }
  return canisterID
}
