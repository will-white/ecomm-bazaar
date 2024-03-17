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
  idToken: IdToken;
  setIdToken: Dispatch<SetStateAction<IdToken>>;
}

export const UserContext = createContext<IdTokenContext | null>(null);

export interface UserProvider {
  readonly children: ReactNode[] | ReactNode;
}

const getToken = () => {
  const strToken = localStorage.getItem('idToken');

  if (strToken == null) return null;

  return JSON.parse(strToken);
};

const UserProvider = ({ children }: UserProvider) => {
  const [idToken, setIdToken] = useState<IdToken | null>(getToken());

  useEffect(() => {
    if (idToken) {
      localStorage.setItem('idToken', JSON.stringify(idToken));
    }
  }, [idToken]);

  const context = useMemo(
    () => ({
      idToken,
      setIdToken,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idToken?.email, idToken?.firstName, idToken?.lastName, idToken?.id]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
