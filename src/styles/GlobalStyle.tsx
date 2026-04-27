import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: #f8fafc;
        color: #1e293b;
        font-family: "Poppins", sans-serif;
    }
    body::-webkit-scrollbar {
    width: 12px;
    background: rgba(55, 55, 55, 0.2);
    filter: blur(10px);
        }
    body::-webkit-scrollbar-thumb {
    background: rgba(84, 84, 84, 0.5);
    border-radius: 10px;
    
    }
`;

