import { InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleNameProduct = styled.div`
    color: rgb(35,35,35);
    font-size:24px;
    font-weight:300;
    line-height:32px;
    word-break:break-word;
`
export const WrapperStyleDescriptionProduct = styled.div`
    padding-bottom: 20px;
    color: rgb(35,35,35);
    font-size:18px;
    font-weight:300;
    line-height:32px;
    word-break:break-word;
`

export const WrapperPriceProduct = styled.div`
    background:rgb(250,250,250);
    border-radius:4px;
`
export const WrapperPriceTextProduct = styled.div`
    font-size:35px;
    line-weight:40px;
    margin-right:8px;
    font-weight:500;
    padding:10px;
`
export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`