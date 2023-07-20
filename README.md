# Shopify Wishlist

A set of files used to implement a simple customer wishlist on a Shopify store.

_Version: 2.3.0_ - Compatible with Online Store 2.0

Previous Versions:
- [v2.1.0 (Online Store 1.0)](https://github.com/dlerm/shopify-wishlist/tree/version/2.1.0)
- [v2.0.0](https://github.com/dlerm/shopify-wishlist/tree/version/2.0.0)
- [v1.0.0](https://github.com/dlerm/shopify-wishlist/tree/version/1.0.0)

## Installation

To begin using **Shopify Wishlist**, you must copy some of the files in this repo into your Shopify theme code.

_Note_: This setup assumes that you have a snippet for displaying a product card.

**Files to copy:**
|Repo File|Shopify Theme Location|
|:--:|:--:|
|[`button-wishlist.liquid`](https://github.com/dlerm/shopify-wishlist/blob/master/snippets/button-wishlist.liquid)|`snippets/`|
|[`icon-heart.liquid`](https://github.com/dlerm/shopify-wishlist/blob/master/snippets/icon-heart.liquid)| `snippets/`|
|[`wishlist-template.liquid`](https://github.com/dlerm/shopify-wishlist/blob/master/sections/wishlist-template.liquid)| `sections/`|
|[`product-card-template.liquid`](https://github.com/dlerm/shopify-wishlist/blob/master/sections/product-card-template.liquid)| `sections/`|
|[`page.wishlist.json`](https://github.com/dlerm/shopify-wishlist/blob/master/templates/page.wishlist.json)|`templates/`|
|[`product.card.json`](https://github.com/dlerm/shopify-wishlist/blob/master/templates/product.card.json)|`templates/`|
|[`Wishlist.js`](https://github.com/dlerm/shopify-wishlist/blob/master/assets/Wishlist.js)|`assets/`|

1. Place the `button-wishlist.liquid` snippet inside your existing product card snippet, or on the `product.liquid` template
   - `{%- render 'button-wishlist', product: product -%}`
   - This will allow customer's to add/remove items to/from their wishlist
2. Replace the snippet in the `product-card-template.liquid` section with your existing product card snippet
   - Same snippet from step 1
   - Your product card snippet may use a different product variable name then the example, double check it :+1:
3. Add your product card element classname to the `selectors` object in `Wishlist.js`
   - Example: If your product card classname is `.product-item`, the `selectors` variable would look like this:
      ```
      const selectors = {
        button: '[button-wishlist]',
        grid: '[grid-wishlist]',
        productCard: '.product-item', // your classname here
      };
      ```
4. Create a new page in the Shopify admin:
   - Admin > Online Store > Pages > Add Page
   - Set the new page's `template` to `page.wishlist`
   - This page will display a customer's saved wishlist items
5. Place the script in `theme.liquid` before the closing `</head>` tag
   - `<script src="{{ 'Wishlist.js' | asset_url }}" defer="defer"></script>`

That's it! When viewing your Shopify store, you should see the wishlist buttons inside your product cards (likely on collections pages) or on the product template. A click on the wishlist button will add/remove the item from the customer's wishlist and trigger active styling on the button. After adding wishlist items, you can view your wishlist by navigating to the page created in step 3.

[Demo Shopify Store](https://lerman-labs.myshopify.com/collections/all)

## Notes

- This wishlist uses Javascript and localStorage to save the customer's wishlist on their browser. The localStorage will not persist if the user clears browser storage or browses in incognito mode.
- As customers browser products and adds them to their wishlist, the script will automatically set any wishlist buttons to active state if the corresponding product is already included in the wishlist.
- These files come with no styling or structure so that you can customize as needed. This is intended to bring you the base functionality of a wishlist with no frills.
- If you are working in an unpublished theme, you will need to create the new templates on the published theme as well. The Shopify admin will only allow you to assign a page to a template if the template exists on the published theme.
- If you are upgrading to the Online Store 2.0 version, you will be required to delete the older `.liquid` wishlist and product card templates.
