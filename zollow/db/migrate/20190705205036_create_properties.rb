class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.string :address, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.integer :beds, null: false
      t.integer :baths, null: false
      t.integer :price, null: false
      t.boolean :sale, null: false
      t.boolean :rent, null: false
      t.integer :owner_id, null: false
      t.timestamps
    end
    add_index :properties, :owner_id
    add_index :properties, [:latitude, :longitude], unique: true
  end
end
