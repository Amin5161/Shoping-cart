import { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useCartStore } from "./store";

function App() {
  const [products, setProducts] = useState([]);

  const {
    cart,
    showCount,
    isModalOpen,
    closeModal,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    showModal,
  } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <section className="flex">
      <div className="w-full sm:flex mx-auto my-10 border sm:p-12 bg-slate-100">
        <div className="p-4 sm:w-2/3 h-auto">
          <h1 className=" text-xl mb-4 font-bold">Product List</h1>
          <ul className="flex flex-wrap gap-4 p-2">
            {products.length > 0 ? (
              products.map((item, index) => (
                <li
                  className="xl:w-[calc(33%-1rem)] flex-grow bg-transparent  rounded-md  relative"
                  key={index}
                >
                  <img
                    className="w-full h-40 object-cover rounded-md"
                    src={item.image.desktop}
                    alt={item.name}
                  />
                  {showCount[item.name] ? (
                    <div className="flex items-center bg-red-600 justify-around w-2/3  gap-x-2 border rounded-full py-1 absolute top-[9rem] left-[18%] border-gray-400">
                      <button
                        className="bg-transparent p-0 m-0 outline-none text-white border px-2 rounded-full text-xs "
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                      <p>{cart.find((p) => p.name === item.name)?.quantity}</p>
                      <button
                        className="bg-transparent p-0 m-0 outline-none text-white border px-2 rounded-full text-xs "
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => addProductToCart(item)}
                      className="flex items-center bg-white justify-center w-2/3 cursor-pointer gap-x-2 border rounded-full py-1 absolute top-[9.5rem] left-[18%] border-gray-400"
                    >
                      <MdOutlineAddShoppingCart className="text-orange-400" />
                      <p className="text-xs">Add To Cart</p>
                    </div>
                  )}
                  <div className="pt-4">
                    <p className="text-sm text-gray-700 ">{item.category}</p>
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-green-600 font-bold">${item.price}</p>
                  </div>
                </li>
              ))
            ) : (
              <div>No products available</div>
            )}
          </ul>
        </div>
        <div className="mx-6 rounded-md mb-4 sm:w-1/3 lg:w-1/4 h-auto bg-white p-4">
          <h3 className="text-red-600 font-bold text-lg pb-4">
            Your Cart({cart.length})
          </h3>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                fill="none"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#260F08"
                  d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z"
                  opacity=".15"
                />
                <path
                  fill="#87635A"
                  d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"
                />
                <path
                  fill="#AD8A85"
                  d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"
                />
                <path
                  fill="#CAAFA7"
                  d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"
                />
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth=".974"
                  d="m81.076 28.966 34.187-4.16"
                />
                <path
                  fill="#87635A"
                  d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"
                />
                <path
                  fill="#AD8A85"
                  d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"
                />
                <path
                  fill="#CAAFA7"
                  d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"
                />
                <path
                  fill="#87635A"
                  d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"
                />
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth=".974"
                  d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"
                />
              </svg>
              <p className=" text-gray-500 text-xs">
                your added items will appear hear
              </p>
            </div>
          ) : (
            cart.map((product, index) => {
              return (
                <div className="border-b py-2 flex items-center justify-between" key={index}>
                  <div>
                    <p className="text-xs pb-2">{product.name}</p>
                    <div className="flex gap-x-4">
                      <p className="text-red-600 text-xs">
                        {product.quantity}x
                      </p>
                      <p className="text-xs opacity-60">${product.price}</p>
                      <p className="text-xs opacity-60">
                        ${product.price * product.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {cart.length > 0 ? (
            <>
              <div className="flex justify-between items-center pt-4">
                <p className="opacity-60 text-xs">Order Total</p>
                <p className="text-lg font-bold">${calculateTotal(cart)}</p>
              </div>
              <div className="bg-red-600 text-sm text-white rounded-full flex items-center justify-center py-2 mt-4">
                <button onClick={showModal}>Confirm Order</button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg sm:w-1/3">
              <svg
                width="38"
                height="38"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
                  fill="#1EA575"
                />
                <path
                  d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
                  fill="#1EA575"
                />
              </svg>

              <h2 className="text-2xl font-bold py-2">Order Confirmed</h2>
              <p className="text-xs opacity-60 pb-4">
                we hope you enjoy your food!
              </p>
              <div className="p-4 bg-red-50 rounded-md">
                {cart.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div>
                        <p className="text-xs pb-2">{product.name}</p>
                        <div className="flex gap-x-4">
                          <p className="text-red-600 text-xs">
                            {product.quantity}x
                          </p>
                          <p className=" text-xs opacity-60">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs ">
                        ${product.price * product.quantity}
                      </p>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center pt-4">
                  <p className=" text-xs">Order Total</p>
                  <p className="text-lg font-bold">${calculateTotal(cart)}</p>
                </div>
              </div>
              <div className="bg-red-600 text-sm text-white rounded-full flex items-center justify-center py-2 mt-4">
                <button onClick={closeModal}>Start New Order</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
