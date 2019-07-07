# == Schema Information
#
# Table name: properties
#
#  id         :bigint           not null, primary key
#  address    :string           not null
#  latitude   :float            not null
#  longitude  :float            not null
#  beds       :integer          not null
#  baths      :integer          not null
#  price      :integer          not null
#  sale       :boolean          not null
#  rent       :boolean          not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Property < ApplicationRecord
  
  validates :price, :address, :longitude, :latitude, :beds, :baths, :owner_id, presence: true
  validates :sale, inclusion: { in: [ true, false ] }
  validates :rent, inclusion: { in: [ true, false ] }

  has_one_attached :photo
  
  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: :User
end
