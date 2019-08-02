# == Schema Information
#
# Table name: saves
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  property_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Save < ApplicationRecord
  class Save < ApplicationRecord
  validates :user_id, :property_id, presence: true
  validates_uniqueness_of :user_id, :scope => [:property_id]

  belongs_to :user
  belongs_to :property
end
end
