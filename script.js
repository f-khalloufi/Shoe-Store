// Waits for HTML to load
$(document).ready(function () {
    // Loads cart from local storage or starts empty
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Product list with real images
    var products = [
        // Men's Shoes
        { name: "Men's Running Shoes", price: 59.99, category: "men", image: "https://i.pinimg.com/474x/bd/50/cc/bd50cc18c0a018bf889ed9787aeaa6c7.jpg", sizes: ["8", "9", "10", "11"], colors: ["Black", "Blue", "Red"] },
        { name: "Men's Sneakers", price: 69.99, category: "men", image: "https://i.pinimg.com/474x/64/7c/ad/647cad16ede10f3ac32e84c8f14831e9.jpg", sizes: ["9", "10", "11", "12"], colors: ["White", "Gray"] },
        { name: "Men's Casual Loafers", price: 79.99, category: "men", image: "https://i.pinimg.com/474x/ab/18/4b/ab184b9b78ae923cd03b0986d2f30339.jpg", sizes: ["8", "9", "10"], colors: ["Brown", "Black"] },
        { name: "Men's Hiking Boots", price: 89.99, category: "men", image: "https://i.pinimg.com/474x/3f/5a/48/3f5a488a6281d8393e5ea8b717ea666d.jpg", sizes: ["9", "10", "11", "12"], colors: ["Green", "Brown"] },

        // Women's Shoes
        { name: "Women's Running Shoes", price: 49.99, category: "women", image: "https://i.pinimg.com/474x/3d/db/a6/3ddba6b2f79a0f894b7d465498f3102b.jpg", sizes: ["6", "7", "8", "9"], colors: ["Pink", "Blue"] },
        { name: "Women's Sneakers", price: 55.99, category: "women", image: "https://i.pinimg.com/474x/37/ee/1f/37ee1feda98f7a3b7db7277bb89b4477.jpg", sizes: ["6", "7", "8"], colors: ["White", "Purple"] },
        { name: "Women's High Heels", price: 65.99, category: "women", image: "https://i.pinimg.com/474x/ba/c1/dc/bac1dc5b0fef663944a1253ef8734c15.jpg", sizes: ["5", "6", "7", "8"], colors: ["Black", "Red"] },
        { name: "Women's Sandals", price: 39.99, category: "women", image: "https://i.pinimg.com/474x/e3/5b/7b/e35b7bea7491856b8093d57bc5a2df12.jpg", sizes: ["6", "7", "8", "9"], colors: ["Beige", "White"] },

        // Children's Shoes
        { name: "Children's Sport Shoes", price: 39.99, category: "child", image: "https://i.pinimg.com/474x/d3/75/01/d375014d3792ae65e806d41ecff04996.jpg", sizes: ["1", "2", "3"], colors: ["Blue", "Yellow"] },
        { name: "Children's Sneakers", price: 45.99, category: "child", image: "https://i.pinimg.com/474x/74/96/df/7496dfe27c41b49e7ebe51784c908b11.jpg", sizes: ["2", "3", "4"], colors: ["Red", "Green"] },
        { name: "Children's Light-up Shoes", price: 49.99, category: "child", image: "https://i.pinimg.com/474x/30/73/fa/3073fa373f7d38b41d0357687c4839df.jpg", sizes: ["1", "2", "3", "4"], colors: ["Pink", "Blue"] },

        // Baby Shoes
        { name: "Baby Soft Shoes", price: 29.99, category: "baby", image: "https://i.pinimg.com/474x/a4/f2/e1/a4f2e117028e8913ce96d367a4af9a81.jpg", sizes: ["0-6M", "6-12M"], colors: ["White", "Pink"] },
        { name: "Baby Sneakers", price: 35.99, category: "baby", image: "https://i.pinimg.com/474x/bb/aa/6e/bbaa6e0df0165073e3393babad12745d.jpg", sizes: ["0-6M", "6-12M"], colors: ["Blue", "Gray"] },
        { name: "Baby Booties", price: 25.99, category: "baby", image: "https://i.pinimg.com/474x/f8/a5/9f/f8a59f318e118229055f38909034d2d6.jpg", sizes: ["0-6M", "6-12M"], colors: ["Yellow", "Green"] }
    ];

    // Displays products by category
    function displayProducts(category) {
        var productsHtml = "";
        for (var i = 0; i < products.length; i++) {
            if (category === "all" || products[i].category === category) {
                productsHtml += 
                    '<div class="product" data-category="' + products[i].category + '">' +
                        '<div class="flip-card-inner">' +
                            '<div class="flip-card-front">' +
                                '<img src="' + products[i].image + '" alt="' + products[i].name + '">' +
                                '<h2>' + products[i].name + '</h2>' +
                                '<p class="price">$' + products[i].price + '</p>' +
                                '<button class="add-to-cart" data-name="' + products[i].name + '" data-price="' + products[i].price + '" data-image="' + products[i].image + '">Add to Cart</button>' +
                            '</div>' +
                            '<div class="flip-card-back">' +
                                '<h3>' + products[i].name + '</h3>' +
                                '<p>Sizes: ' + products[i].sizes.join(", ") + '</p>' +
                                '<p>Colors: ' + products[i].colors.join(", ") + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
        }
        $("#products").html(productsHtml);
    }

    // Updates cart count
    function updateCartCount() {
        $("#cart-count").text(cart.length);
    }

    // Updates cart display
    function updateCartDisplay() {
        var total = 0;
        $("#cart-items").html("");
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            total += parseFloat(item.price);
            $("#cart-items").append(
                '<li>' +
                    '<img src="' + item.image + '" class="cart-img">' +
                    item.name + ' - $' + item.price +
                    ' <button class="remove-item" data-index="' + i + '">❌</button>' +
                '</li>'
            );
        }
        $("#cart-total").text(total.toFixed(2));
    }

    // Add to cart
    $(document).on("click", ".add-to-cart", function () {
        var item = {
            name: $(this).data("name"),
            price: $(this).data("price"),
            image: $(this).data("image")
        };
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay(); // Update display immediately
        alert("Added " + item.name + " to cart!"); // Feedback
    });

    // Remove from cart
    $("#cart-items").on("click", ".remove-item", function () {
        var index = $(this).data("index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    });

    // Clear cart
    $("#clear-cart").click(function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    });

    // Filter products
    $(".filter-btn").click(function () {
        var category = $(this).data("category");
        displayProducts(category);
    });

    // Toggle cart visibility
    $("#cart-btn").click(function () {
        $("#cart").toggle();
    });

    // Checkout (placeholder)
    $("#checkout-btn").click(function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for shopping at Shoe Store! Your total is $" + $("#cart-total").text());
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
            $("#cart").hide();
        }
    });

    // Initial setup
    displayProducts("all");
    updateCartCount();
    updateCartDisplay();
});