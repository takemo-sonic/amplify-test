export type UserSectionProps = {
  username: string;
  message: string;
  count: number;
  onSignOut: () => void;
};

const UserSection = ({
  username,
  message,
  count,
  onSignOut,
}: UserSectionProps) => (
  <div>
    <h2>Welcome, {username}</h2>
    <p>{message}</p>
    <p>{count}</p>
    <button type="button" onClick={onSignOut}>
      Sign out
    </button>
  </div>
);

export { UserSection };
