import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';


describe('test suite: renderPaymentSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '54e0eccd-8f36-462b-b68a-8182611d9add';
  const productId4 = 'dd82ca78-a18b-4e2a-9250-31e67412f98d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-return-to-home-link"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"><div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2, 
        deliveryOptionId: '1'
      },
      
      {
        productId: productId2,
        quantity: 1, 
        deliveryOptionId: '2'
      }, 

      {
        productId: productId3,
        quantity: 3, 
        deliveryOptionId: '3'
      },

      {
        productId: productId4,
        quantity: 4, 
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
    renderPaymentSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
  });


  it('displays the payment summary', () => {
    expect(
      document.querySelector('.js-payment-summary').innerHTML
    ).toContain('Order Summary');

    expect(
      document.querySelector('.js-items').innerText
    ).toContain('Items (10):');

    expect(
      document.querySelector('.js-payment-summary-items').innerText
    ).toEqual('$195.72');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');

    expect(
      document.querySelector('.js-payment-summary-total-before-tax').innerText
    ).toEqual('$210.70');

    expect(
      document.querySelector('.js-payment-summary-tax').innerText
    ).toEqual('$21.07');

    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$231.77');
  });
});