import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  // beforeEach hook runs before each spec in this test suite. It is used to set up the environment for each test.
  beforeEach(() => {
    // Mock 'setItem' so our specs do not affect the actual 'cart'.
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    // Mock localStorage to already have an existing product.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 1, 
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    // Check if setItem has receieved correct values.
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
      quantity: 2, 
      deliveryOptionId: '1'
    }]));
  });

  it('adds a new product to the cart', () => {
    // Mocks = lets you replace method with a fake version. Use spyOn.

    // Create fake version of 'getItem' we can customize with an empty cart. This will override the real getItem method.
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    // Check if setItem received correct values.
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
      quantity: 1, 
      deliveryOptionId: '1'
    }]));
  }); 
});