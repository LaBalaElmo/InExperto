import {createActor as createUserActor, canisterId as userCanisterId} from "../src/declarations/user";
import {createActor as createPageActor, canisterId as pageCanisterId} from "../src/declarations/page";

export const makeActor = (canisterId: any, createActor: any) => {
  return createActor(canisterId, {
    agentOptions: {
      host: import.meta.env.VITE_IC_HOST
    }
  })
}

export function makeUserActor() {
  return makeActor(userCanisterId, createUserActor)
}

export function makePageActor() {
  return makeActor(pageCanisterId, createPageActor)
}