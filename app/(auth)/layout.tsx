const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full flex justify-center p-44">
      {children}
    </div>
   );
}
 
export default AuthLayout;