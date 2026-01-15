export default function ProductDetail() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Product Name</h1>
          <p className="text-2xl text-blue-600 font-bold mb-6">$99.99</p>
          <p className="text-gray-600 mb-6">
            Product description goes here. This is a detailed view of the product.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
