class AddNameAndTimeToStops < ActiveRecord::Migration[5.1]
  def change
    add_column :stops, :name, :string
    add_column :stops, :visited_at, :datetime
  end
end
