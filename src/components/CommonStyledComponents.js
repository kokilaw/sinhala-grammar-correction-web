import styled from 'styled-components';

export const Title = styled.span`
    display: block;
    font-family: Poppins-Bold;
    font-size: 30px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
`;

export const SubTitle = styled.span`
    display: block;
    font-family: Poppins-Medium;
    font-size: 20px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
`;

export const LoadingAnimation = styled.div`
    display: inline-block;
    width: 46px;
    height: 46px;
    &:after {
        content: ' ';
        display: block;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 5px solid #58b846;
        border-color: #58b846 transparent #58b846 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const Input = styled.input`
    padding: 0.5em 0.6em;
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    vertical-align: middle;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(68, 68, 68, 0.137);
    }
`;

export const Button = styled.button`
    display: block;
    width: 200px;
    margin-top: 26px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
    padding: 10px;
    border: none;
    border-radius: 25px;
    color: #fff;
    background-color: ${props => props.backgroundColor || '#58b846'};
    font: 15px Poppins-Medium;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 1px;
    appearance: none;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
        box-shadow: 0 0.5em 0.5em -0.4em ${props =>
        props.shadowColor || '#8fc866'};
        transform: translateY(-0.25em);
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(68, 68, 68, 0.137);
    }
    &:disabled {
        background-color: #ccc;
        &:hover {
            box-shadow: none
            transform: none
        }
    }
`;
