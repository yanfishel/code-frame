import React from 'react';
import { useParams } from 'next/navigation';


const Index = () => {

  const params = useParams();

  console.log(params?.snippetId);


  
  return (
    <div>
      Hello
    </div>
  );
};

export default Index;