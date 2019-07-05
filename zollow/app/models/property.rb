class Property < ApplicationRecord
  
  has_one_attached :photo
  
  has_many :owners,
  foreign_key: "owner_id",
  class_name: "User"
end
