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
  validates_uniqueness_of :latitude, :scope => [:longitude]
  validates :sale, inclusion: { in: [ true, false ] }
  validates :rent, inclusion: { in: [ true, false ] }

  has_many_attached :photos

  def self.in_bounds(bounds)
    self.where("latitude < ?", bounds[:northEast][:lat])
      .where("latitude > ?", bounds[:southWest][:lat])
      .where("longitude > ?", bounds[:southWest][:lng])
      .where("longitude < ?", bounds[:northEast][:lng])
  end
  
  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: :User
end
