class CreatePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :payments do |t|
      t.integer :order_id, null: false
      t.integer :user_id, null: false
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.string :currency, default: 'USD'
      t.string :payment_method, null: false
      t.string :status, default: 'pending'
      t.string :transaction_id
      t.text :metadata
      t.timestamps
    end

    add_index :payments, :order_id
    add_index :payments, :user_id
    add_index :payments, :status
    add_index :payments, :transaction_id, unique: true
  end
end
