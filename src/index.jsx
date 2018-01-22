import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

const PRODUCTS = [
    { name: 'Sledgehammer', price: 125.75 },
    { name: 'Axe', price: 190.50 },
    { name: 'Bandsaw', price: 562.13 },
    { name: 'Chisel', price: 12.90 },
    { name: 'Hacksaw', price: 18.45 },
];

class ShoppingCartApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: {},
        };
        this.addProductToCart = this.addProductToCart.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);
    }

    addProductToCart (product) {
        const items = this.state.cartItems[product.name] || [];
        const update = {};
        update[product.name] = items.concat([product]);
        const updatedItems = Object.assign({}, this.state.cartItems, update);
        this.setState({cartItems: updatedItems});
    }

    removeProductFromCart (productName) {
        const items = Object.assign({}, this.state.cartItems);
        delete items[productName];
        this.setState({cartItems: items});
    }

    render () {
        return (
            <div>
                <ProductList products={PRODUCTS}
                    onAddToCart={this.addProductToCart} />
                <ShoppingCart cartItems={this.state.cartItems}
                    onRemove={this.removeProductFromCart} />
            </div>
        );
    }
}

function ShoppingCart(props) {
    const keys = Object.keys(props.cartItems);
    const items = keys.map((itemName) => {
        const handleOnRemove = () => props.onRemove(itemName);
        const cartItems = props.cartItems[itemName];
        return (
            <li className="shopping-cart__item"
                key={itemName}>
                <ShoppingCartItem product={cartItems[0]}
                    quantity={cartItems.length}
                    onRemove={handleOnRemove} />
            </li>
        );
    });

    const total = keys.reduce((result, itemName) => {
        const cartItems = props.cartItems[itemName];
        return result + cartItems[0].price * cartItems.length;
    }, 0);

    let cartContents;
    if (items.length) {
        cartContents = (
            <div>
                <ul>
                    {items}
                </ul>
                <p className="shopping-cart__total">
                    <span className="total__label">Total</span>
                    ${total.toFixed(2)}
                </p>
            </div>
        );
    } else {
        cartContents = (
            <p className="shopping-cart__empty-message">
                Your shopping cart is empty.
            </p>
        );
    }

    return (
        <div className="shopping-cart">
            <h2>Shopping cart</h2>
            {cartContents}
        </div>
    );
}

function ShoppingCartItem(props) {
    const total = props.quantity * props.product.price;
    return (
        <div>
            <span className="cart-item__name">{props.product.name}</span>
            <span>
                <span>{props.quantity}</span>
                <span className="quantity__label">qty</span>
            </span>
            <span className="cart-item__price">
                <span>
                    ${props.product.price.toFixed(2)}
                </span>
                <span className="price__label">each</span>
            </span>
            <span className="cart-item__total">${total.toFixed(2)}</span>
            <button className="cart-item__remove"
                onClick={props.onRemove}>
                Remove
            </button>
        </div>
    );
}

function ProductList(props) {
    const products = props.products.map((product, index) => {
        const handleOnAddToCart = () => props.onAddToCart(product);
        return (
            <li className="product-list__product"
                key={index}>
                <Product product={product}
                    onAddToCart={handleOnAddToCart} />
            </li>
        );
    });
    return (
        <div className="product-list">
            <h2>Products</h2>
            <ul>
                {products}
            </ul>
        </div>
    );
}

function Product(props) {
    const price2dp = props.product.price.toFixed(2);
    return (
        <div>
            <span className="product__name">{props.product.name}</span>
            <span className="product__price">${price2dp}</span>
            <button className="product__add-to-cart"
                onClick={props.onAddToCart}>
                Add to cart
            </button>
        </div>
    );
}

ReactDOM.render(
    <ShoppingCartApp />,
    document.getElementById('shopping-cart')
);
