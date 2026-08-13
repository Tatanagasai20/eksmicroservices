import { useEffect, useState } from "react";

function App() {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const loadData = async () => {

        try {

            const usersResponse = await fetch("/api/users");
            const productsResponse = await fetch("/api/products");
            const ordersResponse = await fetch("/api/orders");

            setUsers(await usersResponse.json());
            setProducts(await productsResponse.json());
            setOrders(await ordersResponse.json());

        } catch (error) {

            console.error("API error:", error);

        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container">

            <h1>EKS Microservices Application</h1>

            <button onClick={loadData}>
                Refresh Data
            </button>

            <section>
                <h2>Users</h2>

                {users.map(user => (
                    <div className="card" key={user.id}>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                    </div>
                ))}

            </section>

            <section>
                <h2>Products</h2>

                {products.map(product => (
                    <div className="card" key={product.id}>
                        <strong>{product.name}</strong>
                        <p>₹{product.price}</p>
                    </div>
                ))}

            </section>

            <section>
                <h2>Orders</h2>

                {orders.map(order => (
                    <div className="card" key={order.id}>
                        <p>
                            User ID: {order.userId}
                        </p>

                        <p>
                            Product ID: {order.productId}
                        </p>

                        <p>
                            Quantity: {order.quantity}
                        </p>
                    </div>
                ))}

            </section>

        </div>
    );
}

export default App;
