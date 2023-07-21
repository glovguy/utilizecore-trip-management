class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.references :assignee, null: false, foreign_key: true, foreign_key: {to_table: :users}
      t.references :owner, null: false, foreign_key: true, foreign_key: {to_table: :users}
      t.string :address
      t.timestamp :eta
      t.timestamp :etc
      t.timestamp :start_time
      t.timestamp :end_time
      t.integer :status

      t.timestamps
    end
  end
end
