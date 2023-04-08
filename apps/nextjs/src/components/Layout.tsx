type Props = {
  children?: React.ReactNode;
};
export const Layout: React.FC<Props> = ({ children }) => {
  return <div className="min-h-screen bg-sky-100">{children}</div>;
};
