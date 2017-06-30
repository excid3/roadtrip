class CreateStops < ActiveRecord::Migration[5.1]
  def change
    create_table :stops do |t|
      t.references :trip, foreign_key: true
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
