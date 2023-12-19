import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponent";

export const WrapperTypeProduct = styled.div`
display: flex;
align-items:center;
gap:25px;
justify-content:flex-start;
border-bottom:1px solid red;
height  :44px ;
`
export const WrapperProduct = styled.div`
margin-top: 20px;
display: flex;
gap:15px;
margin-left: 2px;
flex-wrap:  wrap;

`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #0000FF;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`
