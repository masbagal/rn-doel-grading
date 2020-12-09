import * as React from 'react';

type Actions = {
  defineUser: (user: any) => void;
}

const UserContext = React.createContext<any>(null!);
const UserContextAction = React.createContext<Actions>(null!);

export default function UserContextWrapper(props: React.PropsWithChildren<unknown>) {
  const [user, setUser] = React.useState<any>(null);

  const actions = {
    defineUser: (user: any) => setUser(user)
  }

  return (
    <UserContext.Provider value={user}>
      <UserContextAction.Provider value={actions}>
        {props.children}
      </UserContextAction.Provider>
    </UserContext.Provider>
  )
}

export function useUser(): [any, Actions] {
  return [React.useContext(UserContext), React.useContext(UserContextAction)];
}