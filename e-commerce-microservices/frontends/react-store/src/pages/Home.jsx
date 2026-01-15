import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Welcome to Our E-Commerce Store
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover amazing products with our microservices-powered platform.
        Fast, scalable, and built with modern technologies.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Fast Performance</h3>
          <p className="text-gray-600">30% improvement in data retrieval speed</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Scalable</h3>
          <p className="text-gray-600">40% increase in daily transactions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Real-time Chat</h3>
          <p className="text-gray-600">20% reduction in response time</p>
        </div>
      </div>
      
      <Link
        to="/products"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block"
      >
        Browse Products
      </Link>
    </div>
  );
}
