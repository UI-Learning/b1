$(document).ready(function(){
  $('.js-cart').on("click", function (evt) {
      var cartItems = $('.js-cart').data('cart-items'),
        $productsCartContainer = $(".js-cart-products");
      if(cartItems.length <= 0 ){
        return;
      }
      $(".js-products").addClass("hide");
      $productsCartContainer.removeClass("hide");
      $productsCartContainer.html("");
      cartItems.forEach(function (product, index) {
        $productsCartContainer.append(renderProduct(product, index));
      })

  })


  callAjax("./data/products.json", "JSON").done(function (products) {
      renderProducts(products);
  }).error(function () {
      console.log("Failed to load products");
  });

  function renderProducts(products) {
    var $productsContainer = $(".js-products");
    products.forEach(function (product, index) {

      $productsContainer.append(renderProduct(product, index));
    })
  }


  function renderProduct(product, index) {
      var $productTemplate = $($('.product-template').html());
      $productTemplate.find('.js_product_image').attr('src', product.image);
      $productTemplate.find('.js_product_name').text(product.product_name);
      $productTemplate.find('.js_short_desc').text(product.short_description);
      $productTemplate.find('.js_product_price').text(product.original_price);
      $productTemplate.find('.js_product_discount_price').text(product.discount_price);
      $productTemplate.find('.js_product_add_to_cart').data('product_id', index);
      $productTemplate.find('.js_product_add_to_cart').on('click', function (event) {
        var existingCartItems = $('.js-cart').data('cart-items'),
          cartItems,
          thisCartItem = product;
        cartItems = existingCartItems ? existingCartItems : [];
        cartItems.push(thisCartItem);
        console.log(cartItems);
        $('.js-cart').data('cart-items',cartItems);
        $('.js-cart').find('.js-cart-count').text("("+cartItems.length+")")
      });
      return $productTemplate;
  }

  function _renderProduct(product){
    var $productsContainer = $(".js-products");
    callAjax("partials/_product.html", 'HTML').done(function (html) {

    }).error(function () {
      console.log("Failed to load product template");
    })
  }

  function _getProductTemplate(product){
    return [
      '<div class="col-sm-6 col-md-4">',
        '<div class="thumbnail">',
          '<img src="'+product.image+'" alt="product 1" width="300">',
          '<div class="caption">',
            '<h3>'+product.product_name+'</h3>',
            '<p>'+product.short_description+'</p>',
            '<p><a href="#/?id='+product.id+'" class="btn btn-primary" role="button">Add To Cart</a> </p>',
          '</div>',
        '</div>',
      '</div>'
    ].join("");
  }

  function callAjax(url, type) {
    return $.ajax({
        method: "GET",
        url: url,
        dataType: type
      });
  }
})
