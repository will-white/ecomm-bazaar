import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface IdToken {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface IdTokenContext {
  idToken?: IdToken;
  setIdToken: Dispatch<SetStateAction<IdToken | undefined>>;
}

export const UserContext = createContext<IdTokenContext | null>(null);

export interface UserProvider {
  readonly children: ReactNode[] | ReactNode;
}

const getToken = () => {
  const strToken = localStorage.getItem('idToken');

  if (strToken == null) return undefined;

  return JSON.parse(strToken) as IdToken;
};

const UserProvider = ({ children }: UserProvider) => {
  const [idToken, setIdToken] = useState<IdToken | undefined>(getToken());

  useEffect(() => {
    if (idToken) {
      localStorage.setItem('idToken', JSON.stringify(idToken));
    } else {
      localStorage.removeItem('idToken');
    }
  }, [idToken]);

  const context = useMemo(
    () => ({
      idToken,
      setIdToken,
    }),
    [idToken],
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
