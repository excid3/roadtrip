class Trip < ApplicationRecord
  belongs_to :user
  has_many :stops

  validates :name, presence: true
end
