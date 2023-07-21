class Trip < ApplicationRecord
  belongs_to :assignee, foreign_key: 'assignee_id', class_name: 'User'
  belongs_to :owner, foreign_key: 'owner_id', class_name: 'User'
  enum status: [:not_started, :in_progress, :completed]

  def overdue?
    status == :in_progress && Time.now > eta
  end
end
