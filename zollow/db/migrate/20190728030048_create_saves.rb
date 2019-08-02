class CreateSaves < ActiveRecord::Migration[5.2]
  def change
    create_table :saves do |t|
      t.integer :user_id, null: false
      t.integer :property_id, null: false
      t.timestamps
    end
    
    add_index :saves, [:user_id, :property_id], unique: true
    add_index :saves, :property_id
  end
end
