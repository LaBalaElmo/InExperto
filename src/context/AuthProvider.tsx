import { ReactNode, createContext, useState } from "react";
import { User } from "../declarations/user/user.did";

const AuthContext = createContext({});

type AuthProviderProps = {
    children: ReactNode;
};

export type AuthContextType = {
    userId: string;
    token: string;
    user: User;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthContextType>({} as AuthContextType);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
