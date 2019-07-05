class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|

      t.timestamps
    end
  end
end
