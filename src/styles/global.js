import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Exo:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap');



  html,body, #root{
    font-family: 'Exo', sans-serif !important;

    background:#fafafa;
  }

p{
  font-family: 'Exo', sans-serif !important;
  font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #fff;

}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none !important;
    transition: all 0.3s;
}


`;
