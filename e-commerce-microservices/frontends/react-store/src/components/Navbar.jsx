import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            E-Commerce
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/products" className="hover:text-blue-200">Products</Link>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/cart" className="hover:text-blue-200">
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>
            <Link to="/login" className="hover:text-blue-200">
              <UserIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
