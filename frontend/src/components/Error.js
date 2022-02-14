import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Error () {
  return <div>
   <h1>ERROR!</h1>
   <h3>This page does not exist, please try to login</h3>
   <Link to = '/'> go to home page</Link>
  </div>;
};
