import React, { useRef } from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function PaymentInputs() {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  const number_card = useRef();
  const date_card = useRef();
  const cvv_card = useRef();

  return (
    <React.Fragment>
        <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} ref={number_card}
            />
            <input {...getExpiryDateProps()} ref={date_card}/>
            <input {...getCVCProps()} ref={cvv_card}/>
        </PaymentInputsWrapper>
        <button>Отправить данные</button>
    </React.Fragment>
    
    
  );
}