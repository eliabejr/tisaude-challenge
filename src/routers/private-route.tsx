import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "~/guards/context";


interface ProtectedRouteProps {
  element: JSX.Element;
  roles: string[];
}

const PrivateRoute: React.FC<ProtectedRouteProps> = ({
  element,
  roles,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    setIsLoading(true);
    if (user === null && isLoading) {
      return
    } else if (!roles.includes(user.role)) {
      toast({
        title: 'Você não tem permissão para visualizar esta página',
        status: 'error',
        isClosable: true,
      })
      return navigate('/login')
    }
    setIsLoading(false);
  }, [user, roles, isLoading]);

  if (isLoading) {
    return <div></div>;
  }

  if (!isLoading && !roles.includes(user.role)) {
    toast({
      title: 'Você não tem permissão para visualizar esta página',
      status: 'error',
      isClosable: true,
    })
    navigate('/produtos')
    return <div></div>
  }

  console.log('foi')
  return <>{element}</>;
};


export default PrivateRoute;