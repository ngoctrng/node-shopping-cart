export type ProductLine = {
    id: string;
    qty: number;
}

function makeProductLine(prodId: string): ProductLine {
    return { id: prodId, qty: 0 }
}

export type CartItems = {
    [key: string]: ProductLine
}

export class Cart {
    // a map with key is productId
    items: CartItems;

    constructor(items: CartItems) {
        this.items = items;
    }

    addItem(productId: string) {
        let line = this.items[productId];
        if (!line) {
            line = makeProductLine(productId);
        }
        line.qty += 1;
        this.items[productId] = line;
    }

    removeItem(productId: string) {
        let line = this.items[productId];
        if (!line) {
            line = makeProductLine(productId);
        }
        line.qty -= 1;

        if (line.qty <= 0) {
            delete this.items[productId];
        }
    }
}

export type ProductLineDetail = {
    product: {
        id: string;
        name: string;
        price: number;
    }
    qty: number;
}

export type ShoppingCartView = ProductLineDetail[];